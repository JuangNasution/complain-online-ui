export interface ComplainTwitter{
  noComplain:String,
  id: String;
  text: string;
  user: string
  image: string;
  createdAt: Date;
  isProcessed:boolean;
}

export const twitDummy: ComplainTwitter[] = [
	{
    noComplain: "BNI-K39WC-20210206215248",
    id: "1358302897449017346",
    text: "@bootcampbni saya tidak bisa login ke internet banking pada tanggal 6 februari 2021 -2",
    user: "TestingUserrrr",
    image: "https://pbs.twimg.com/profile_images/1358301772553490432/6Q4IiZHa_400x400.jpg",
    createdAt: new Date("2021-02-07T06:33:41.000+0000"),
    isProcessed:true,
  },
  {
    noComplain:"",
    id: "1358302897449017333",
    text: "@bootcampbni Minta curhat boleh?",
    user: "TestingUserrrr",
    image: "https://pbs.twimg.com/profile_images/1358301772553490432/6Q4IiZHa_400x400.jpg",
    createdAt: new Date("2021-02-07T06:33:41.000+0000"),
    isProcessed:false
  },
  {
    noComplain:"",
    id: "1358302897449017333",
    text: "@bootcampbni ini ke 3",
    user: "TestingUserrrr",
    image: "https://pbs.twimg.com/profile_images/1358301772553490432/6Q4IiZHa_400x400.jpg",
    createdAt: new Date("2021-02-07T06:33:41.000+0000"),
    isProcessed:true
  }
];
