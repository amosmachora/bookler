export type TravellerHotelInfo = {
  Rooms: number;
  adults: number;
  kids: number;
};

export type HotelInfo = {
  [x: string]: any;
  accommodation_type: number;
  accommodation_type_name: string;
  address: string;
  address_trans: string;
  badges: never[] | { id: string; text: string; badge_variant: string }[];
  block_ids: string[];
  bwallet: {
    hotel_eligibility: number;
  };
  cant_book: number;
  cc1: string;
  cc_required: number;
  checkin: {
    from: string;
    until: string;
  };
  checkout: {
    from: string;
    until: string;
  };
  children_not_allowed: number;
  city: string;
  city_in_trans: string;
  city_name_en: string;
  city_trans: string;
  class: number;
  class_is_estimated: number;
  country_trans: string;
  countrycode: string;
  currency_code: string;
  currencycode: string;
  deals: {
    deal_attributes: object;
    deal_events_killswitch: number;
    deals_available: object;
  };
  default_language: string;
  default_wishlist_name: string;
  distance: string;
  distance_to_cc: string;
  district: string;
  district_id: number;
  districts: string;
  extended: number;
  genius_discount_percentage: number;
  has_free_parking?: number;
  has_swimming_pool?: number;
  hotel_facilities: string;
  hotel_has_vb_boost: number;
  hotel_id: number;
  hotel_include_breakfast: number;
  hotel_name: string;
  hotel_name_trans: string;
  id: string;
  in_best_district: number;
  is_city_center: number;
  is_free_cancellable: number;
  is_genius_deal: number;
  is_geo_rate: string;
  is_mobile_deal: number;
  is_no_prepayment_block: number;
  is_smart_deal: number;
  is_wholesaler_candidate?: number | undefined;
  latitude: number;
  longitude: number;
  main_photo_id: number;
  main_photo_url: string;
  matching_units_configuration: {
    matching_units_common_config: {
      localized_area: null;
      unit_type_id: number;
    };
  };
  min_total_price: number;
  mobile_discount_percentage: number;
  native_ad_id: string;
  native_ads_cpc: number;
  native_ads_tracking: string;
  preferred: number;
  preferred_plus: number;
  price_breakdown: {
    all_inclusive_price: number;
    currency: string;
    gross_price: string | number;
    has_fine_print_charges: number;
    has_incalculable_charges: number;
    has_tax_exceptions: number;
    sum_excluded_raw: number | string;
  };
  price_is_final: number;
  review_nr: number;
  review_recommendation: string;
  review_score: number;
  review_score_word: string;
  selected_review_topic: null;
  soldout: number;
  timezone: string;
  type: string;
  ufi: number;
  updated_checkin: null;
  updated_checkout: null;
  urgency_room_msg: string;
  url: string;
  wishlist_count: number;
  zip: string;
};

export interface DirtyHotelImages {
  categories: any[];
  data: Data;
  url_prefix: string;
}

interface Data {
  [key: string]: Array<Array<tags[] | number | string>>;
}

export interface tags {
  tag_type?: string;
  tag_name?: null | string;
  confidence?: number;
  tag_id?: number;
  photo_id?: number;
  id?: number;
  tag?: string;
}

export interface Facility {
  hotelfacilitytype_id: number;
  facilitytype_id: number;
  is_common_room_facility: number;
  facilitytype_name: string;
  roomfacilitytype_id: string;
  facility_name: string;
  hotel_id: number;
  value: number;
  kind: string;
  free?: number;
  paid?: number;
}

export type GoogleMapsCenter = {
  lat: number;
  lng: number;
};

export type HotelImage = {
  tag_name: string | undefined | null;
  img_url_large: string;
  img_url_small: string;
  img_url_medium: string;
  img_url_tiny: string;
};
