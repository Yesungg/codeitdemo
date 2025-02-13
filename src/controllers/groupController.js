const prisma = require('../../prisma/prismaClient');
const bcrypt = require('bcrypt');
const prisma = require('../../prisma/prismaClient');


const createGroup = async (req, res) => {
    try {
        const { name, password, imageUrl, isPublic, introduction } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: "그룹명과 비밀번호는 필수 입력값입니다." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newGroup = await prisma.group.create({
            data: {
                name,
                password: hashedPassword,
                imageUrl,
                isPublic,
                introduction
            }
        });

        res.status(201).json({
            id: newGroup.id,
            name: newGroup.name,
            imageUrl: newGroup.imageUrl,
            isPublic: newGroup.isPublic,
            likeCount: newGroup.likeCount,
            postCount: newGroup.postCount,
            badges: newGroup.badges,
            createdAt: newGroup.createdAt,
            introduction: newGroup.introduction
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};

const getGroups = async (req, res) => {
    try {
        let { page = 1, pageSize = 10, sortBy = 'latest', keyword, isPublic } = req.query;
        page = parseInt(page);
        pageSize = parseInt(pageSize);

        let orderBy = { createdAt: 'desc' };
        if (sortBy === 'mostPosted') orderBy = { postCount: 'desc' };
        if (sortBy === 'mostLiked') orderBy = { likeCount: 'desc' };
        if (sortBy === 'mostBadge') orderBy = { badgeCount: 'desc' };

        const filters = {};
        if (keyword) filters.name = { contains: keyword };
        if (isPublic !== undefined) filters.isPublic = isPublic === 'true';

        const totalItemCount = await prisma.group.count({ where: filters });

        const groups = await prisma.group.findMany({
            where: filters,
            orderBy,
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: {
                id: true,
                name: true,
                imageUrl: true,
                isPublic: true,
                likeCount: true,
                badgeCount: true,
                postCount: true,
                createdAt: true,
                introduction: true
            }
        });

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalItemCount / pageSize),
            totalItemCount,
            data: groups
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};

const getGroupById = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { password } = req.query;

      
        const group = await prisma.group.findUnique({
            where: { id: parseInt(groupId) },
            include: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        nickname: true,
                        likeCount: true,
                        createdAt: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                badges: {
                    select: {
                        id: true,
                        badge_type: true,
                        createdAt: true
                    }
                }
            }
        });

        if (!group) {
            return res.status(404).json({ message: "그룹을 찾을 수 없습니다." });
        }


        if (!group.isPublic && group.password) {
            if (!password || password !== group.password) {
                return res.status(403).json({ message: "비밀번호가 올바르지 않습니다." });
            }
        }


        const { password: _, ...groupData } = group;

        res.status(200).json(groupData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};

const updateGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { password, name, imageUrl, isPublic, introduction } = req.body;


        const group = await prisma.group.findUnique({
            where: { id: Number(groupId) },
        });


        if (!group) {
            return res.status(404).json({ message: "그룹이 존재하지 않습니다." });
        }


        const passwordMatches = await bcrypt.compare(password, group.password);
        if (!passwordMatches) {
            return res.status(403).json({ message: "비밀번호가 틀렸습니다." });
        }


        const updatedGroup = await prisma.group.update({
            where: { id: Number(groupId) },
            data: {
                name: name || group.name,
                imageUrl: imageUrl || group.imageUrl,
                isPublic: isPublic !== undefined ? isPublic : group.isPublic,
                introduction: introduction || group.introduction,
            },
        });

        res.json(updatedGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};


const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { password } = req.body;


        const group = await prisma.group.findUnique({
            where: { id: Number(groupId) },
        });

        if (!group) {
            return res.status(404).json({ message: "그룹이 존재하지 않습니다." });
        }


        const passwordMatches = await bcrypt.compare(password, group.password);
        if (!passwordMatches) {
            return res.status(403).json({ message: "비밀번호가 틀렸습니다." });
        }


        await prisma.group.delete({
            where: { id: Number(groupId) },
        });

        res.json({ message: "그룹 삭제 성공" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};

const verifyGroupPassword = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { password } = req.body;

        const group = await prisma.group.findUnique({
            where: { id: Number(groupId) }
        });

        if (!group) {
            return res.status(404).json({ message: "그룹을 찾을 수 없습니다." });
        }

        const passwordMatches = await bcrypt.compare(password, group.password);
        if (!passwordMatches) {
            return res.status(401).json({ message: "비밀번호가 틀렸습니다" });
        }

        res.status(200).json({ message: "비밀번호가 확인되었습니다" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};

const likeGroup = async (req, res) => {
    try {
        const { groupId } = req.params;

        const group = await prisma.group.findUnique({
            where: { id: Number(groupId) }
        });

        if (!group) {
            return res.status(404).json({ message: "존재하지 않습니다" });
        }

        const updatedGroup = await prisma.group.update({
            where: { id: Number(groupId) },
            data: {
                likeCount: group.likeCount + 1
            }
        });

        res.status(200).json({ message: "그룹 공감하기 성공" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};

const checkGroupIsPublic = async (req, res) => {
    try {
        const { groupId } = req.params;

        const group = await prisma.group.findUnique({
            where: { id: Number(groupId) }
        });

        if (!group) {
            return res.status(404).json({ message: "존재하지 않습니다" });
        }

        res.status(200).json({
            id: group.id,
            isPublic: group.isPublic
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
};

