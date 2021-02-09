export interface ComplainTwitter{
  id: String;
  text: string;
  user: string
  image: string;
  createdAt: Date;
}

export const twitDummy: ComplainTwitter[] = [
	{
    id: "1358302897449017346",
    text: "@bootcampbni saya tidak bisa login ke internet banking pada tanggal 6 februari 2021 -2",
    user: "TestingUserrrr",
    image: "https://pbs.twimg.com/profile_images/1358301772553490432/6Q4IiZHa_400x400.jpg",
    createdAt: new Date("2021-02-07T06:33:41.000+0000")
  },
  {
    id: "1358302897449017333",
    text: "@bootcampbni Minta curhat boleh?",
    user: "TestingUserrrr",
    image: "https://pbs.twimg.com/profile_images/1358301772553490432/6Q4IiZHa_400x400.jpg",
    createdAt: new Date("2021-02-07T06:33:41.000+0000")
  }
];
