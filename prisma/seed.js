const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Render Shell에서 'npm run seed'를 실행해야 함!
async function main() {
    console.log("🔄 Resetting database...");

    // ⚠️ 테이블 삭제 순서 중요 (참조 무결성 문제 방지)
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.badge.deleteMany({});
    await prisma.group.deleteMany({});

    console.log("✅ Database reset completed.");

    console.log("🌱 Seeding new data...");

    // 1️⃣ 그룹 생성
    const group1 = await prisma.group.create({
        data: {
            name: "첫 번째 그룹",
            imageUrl: "https://example.com/group1.jpg",
            badgeCount: 0,
            postCount: 0,
            likeCount: 0,
            isPublic: true,
            introduction: "이 그룹은 샘플 그룹입니다.",
        },
    });

    // 2️⃣ 게시글 생성
    const post1 = await prisma.post.create({
        data: {
            groupId: group1.id, // 위에서 생성한 그룹의 ID 사용
            nickname: "John Doe",
            title: "첫 번째 게시글",
            content: "이것은 샘플 게시글입니다.",
            imageUrl: "https://example.com/post1.jpg",
            location: "서울",
            moment: new Date(),
            isPublic: true,
            likeCount: 5,
            commentCount: 1,
            tags: "추억, 여행",
        },
    });

    // 3️⃣ 댓글 생성
    await prisma.comment.create({
        data: {
            postId: post1.id, // 위에서 생성한 게시글의 ID 사용
            nickname: "Jane Doe",
            content: "이것은 샘플 댓글입니다.",
            password: "hashedpassword", // 실제 사용 시 해시 적용 필요
        },
    });

    // 4️⃣ 배지 생성
    await prisma.badge.create({
        data: {
            groupId: group1.id,
            badge_type: "7일 연속 추억 등록",
        },
    });

    console.log("✅ Seeding completed!");
}

// 실행
main()
    .catch((error) => {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
