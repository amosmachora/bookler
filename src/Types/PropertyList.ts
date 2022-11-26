import { HotelInfo } from "./Hotel";

export interface PropertyListType {
  total_count_with_filters: number;
  copyright: any[];
  result: HotelInfo[];
  search_metadata: string;
  unfiltered_count: number;
  has_low_availability: number;
  sorting: Sorting;
  map_bounding_box: MapBoundingBox;
  is_beach_ufi: number;
  base_filters: BaseFilter[];
  b_max_los_data: BMaxLosData;
  recommended_filters: RecommendedFilter[];
  applied_filters: any[];
  search_id: string;
  extended_count: number;
  primary_count: number;
  page_loading_threshold: number;
  sort: Sort[];
  search_radius: number;
  count: number;
  unfiltered_primary_count: number;
  room_distribution: RoomDistribution[];
  ranking_version: number;
}

export interface BMaxLosData {
  default_los: number;
  experiment: string;
  max_allowed_los: number;
  extended_los: number;
  is_fullon: number;
  has_extended_los: number;
}

export interface BaseFilter {
  id: string;
  is_group: number;
  any_text: null | string;
  title: string;
  categories: Category[];
  irene_resp_id: string;
  type: string;
  iconfont: null | string;
  layout: Layout;
  experiment_tracking_data?: BaseFilterExperimentTrackingData;
}

export interface Category {
  selected: number;
  to?: number;
  name: string;
  display_format?: string;
  from?: number;
  id: string;
  style_for_count: number;
  count: number;
  popular_rank?: number;
  popular?: number;
  experiment_tracking_data?: CategoryExperimentTrackingData;
}

export interface CategoryExperimentTrackingData {
  track_on_select: TrackOn[];
}

export interface TrackOn {
  type: number;
  experiment_tag: string;
  value: number;
}

export interface BaseFilterExperimentTrackingData {
  track_on_view: TrackOn[];
}

export interface Layout {
  collapsed_count: number;
  is_collapsable: number;
  is_collapsed: number;
}

export interface MapBoundingBox {
  sw_lat: number;
  ne_long: number;
  ne_lat: number;
  sw_long: number;
}

export interface RecommendedFilter {
  name: string;
  generic_id: string;
}

export enum AccommodationTypeName {
  Hotels = "Hotels",
  Inns = "Inns",
  Motels = "Motels",
}

export interface Badge {
  id: string;
  text: string;
  badge_variant: string;
}

export interface Bwallet {
  hotel_eligibility: number;
}

export enum Cc1 {
  Us = "us",
}

export interface Check {
  until: Until;
  from: From;
}

export enum From {
  Empty = "",
  The1400 = "14:00",
  The1500 = "15:00",
  The1600 = "16:00",
}

export enum Until {
  Empty = "",
  The0000 = "00:00",
  The1100 = "11:00",
  The1200 = "12:00",
  The2300 = "23:00",
}

export enum CountryTrans {
  UnitedStatesOfAmerica = "United States of America",
}

export enum Currency {
  Usd = "USD",
}

export interface Deals {
  deals_available: DealsAvailable;
  deal_events_killswitch: number;
  deal_attributes: DealAttributes;
  deal_events?: DealEvent[];
}

export interface DealAttributes {}

export interface DealEvent {
  text_color: string;
  localized_name: string;
  preset_id: null;
  disabled: number;
  icon_url: string;
  localized_description: string;
  icon_name: string;
  discount_percentage: number;
  description_translation_tag: string;
  name_translation_tag: string;
  bg_color: string;
  code: number;
}

export interface DealsAvailable {
  has_preset?: number;
}

export enum DefaultLanguage {
  En = "en",
  Xu = "xu",
}

export interface MatchingUnitsConfiguration {
  matching_units_common_config: MatchingUnitsCommonConfig;
}

export interface MatchingUnitsCommonConfig {
  localized_area: null;
  unit_type_id: number;
}

export interface PriceBreakdown {
  has_tax_exceptions: number;
  has_fine_print_charges: number;
  all_inclusive_price: number;
  currency: Currency;
  has_incalculable_charges: number;
  gross_price: number | string;
  sum_excluded_raw: number | string;
}

export enum ReviewScoreWord {
  Good = "Good",
  Pleasant = "Pleasant",
  Poor = "Poor",
  VeryGood = "Very Good",
}

export enum Timezone {
  AmericaChicago = "America/Chicago",
  AmericaMenominee = "America/Menominee",
}

export enum Type {
  PropertyCard = "property_card",
}

export interface RoomDistribution {
  adults: string;
  children: number[];
}

export interface Sort {
  id: string;
  name: string;
}

export interface Sorting {
  options: Option[];
  selected_identifier: string;
}

export interface Option {
  identifier: string;
  name: string;
  loading_message: null;
}
