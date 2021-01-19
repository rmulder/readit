export interface IPost {
  id: string;
  title: string;
  slug: string;
  body?: string;
  createdAt: Date;
  voteCount: number;

  //virtual fields
  url: string;
  userVote: 1 | -1 | 0;
  commentCount: number;

  //foreign keys
  subName: string;
  username: string;
}

export interface IUser {
  short_id: string;
  username: string;
  email: string;
}

export interface ISub {
  id: string;
  name: string;
  title: string;
  description?: string;
  imgUrn?: string;
  bannerUrn?: string;

  //virtual fields
  bannerUrl: string | undefined;
  imageUrl: string;

  //foreign keys
  username: string;

  posts: IPost[];
}
