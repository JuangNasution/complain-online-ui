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
    text: "Kepala Puskesmas Gending Kabupaten Probolinggo, Provinsi Jawa Timur dr Syaiful Bahri meninggal dunia di RS Lavalette Malang, Rabu (20/2), setelah terinfeksi COVID-19. Jenazah dr Syaiful Bahri yang dibawa dengan mobil ambulans berhenti sesaat di Pendopo Prasaja @bootcampbni",
    user: "TestingUserrrr",
    image: "https://pbs.twimg.com/profile_images/1358301772553490432/6Q4IiZHa_400x400.jpg",
    createdAt: new Date("2021-02-07T06:33:41.000+0000"),
    isProcessed:false
  },


];
