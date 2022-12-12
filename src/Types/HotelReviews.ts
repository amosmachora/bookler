export interface HotelReviews {
  result: Review[];
  sort_options: any[];
  count: number;
}

export interface Review {
  is_incentivised: number;
  languagecode: string;
  hotel_id: number;
  user_new_badges: any[];
  review_id: number;
  stayed_room_info: StayedRoomInfo;
  hotelier_name: string;
  helpful_vote_count: number;
  countrycode: string;
  is_moderated: number;
  reviewng: number;
  author: Author;
  cons: string;
  cons_translated: string;
  date: string;
  hotelier_response: string;
  reviewer_photos: any[];
  title_translated: string;
  tags: any[];
  title: string;
  anonymous: string;
  hotelier_response_date?: number;
  average_score: number;
  travel_purpose: string;
  pros_translated: string;
  pros: string;
  review_hash: string;
  is_trivial: number;
}

export interface Author {
  type_string: string;
  user_id: number;
  nr_reviews: number;
  age_group: string;
  helpful_vote_count: number;
  countrycode: string;
  city: string;
  name: string;
  avatar?: string;
  type: string;
}

export interface StayedRoomInfo {
  room_name: string;
  room_id: number;
  checkin: string;
  photo: Photo;
  checkout: string;
}

export interface Photo {
  url_640x200: string;
  url_max300: string;
  url_original: string;
  photo_id: number;
  url_square60: string;
  ratio: number;
}
