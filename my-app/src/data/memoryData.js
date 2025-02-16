const memoryData = [
    {
      id: 1,
      groupId: "group1", // 그룹 ID 추가
      username: "달봉이아들",
      isPublic: true,
      title: "에델바이스 꽃말이 소중한 추억이래요",
      imageUrl: "/img/edelweiss.png",
      tags: ["인천", "낚시"],
      location: "인천 앞바다",
      date: "24.01.19 18:00",
      likes: 120,
      comments: 8,
    },
    {
      id: 2,
      groupId: "group1",
      username: "달봉이아들",
      isPublic: true,
      title: "인천 앞바다에서 무려 60cm 월척을 낚다!",
      imageUrl: "/img/fishing.png",
      tags: ["인천", "낚시"],
      location: "인천 앞바다",
      date: "24.01.15 18:00",
      likes: 140,
      comments: 10,
    },
    {
      id: 3,
      groupId: "group1",
      username: "달봉이딸",
      isPublic: true,
      title: "서울숲 소풍",
      imageUrl: "/img/picnic.png",
      tags: ["서울", "봄나들이"],
      location: "서울숲",
      date: "23.05.07 18:00",
      likes: 10,
      comments: 21,
    },
    {
      id: 4,
      groupId: "group2", // 그룹 ID 추가
      username: "달봉이아님",
      isPublic: true,
      title: "에델바이스 꽃말이 소중한 추억이래요 아님",
      imageUrl: "/img/edelweiss.png",
      tags: ["인천", "낚시"],
      location: "인천 앞바다",
      date: "24.07.19 19:00",
      likes: 115,
      comments: 0,
    },
  ];
  
  // 특정 그룹 ID에 해당하는 추억 목록을 가져오는 함수
  export const getMemoriesByGroupId = (groupId) => {
    return memoryData.filter((memory) => memory.groupId === groupId);
  };
  
  export default memoryData;
  