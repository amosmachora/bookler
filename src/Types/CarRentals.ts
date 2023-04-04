export interface PickUpOrDropOffLocations {
  itemName: string;
  type: string;
  id: string;
  cityID: string;
  cityName: string;
  airportName?: string;
  stateCode: string;
  provinceName: string;
  countryCode: string;
  isoCountryCode: string;
  countryName: string;
  country: string;
  lat: number;
  lon: number;
  gmtOffset?: number;
  timeZoneId: number;
  javaTimeZoneName?: string;
  poiCategoryTypeId: number;
  entered: string;
  displayName: string;
  highlightedName: string;
  rentalLocationsCount: number;
  opaqueParticipantFlag?: string;
  rccAirportFlag: string;
  debitCardFlag?: string;
  aliases?: string[];
  majorAirportFlag?: string;
  score: string;
  lang: string;
  rank: number;
  poiCategoryName?: string;
  addressLine1?: string;
  addressLine2?: string;
  phoneNumber?: string;
  partnerCode?: string;
  partnerName?: string;
  partnerShortName?: string;
  partnerLocationCode?: string;
  postalCode?: string;
}

export interface CarRentalData {
  pickupDateTime: string;
  returnDateTime: string;
  discountCodesFailed: boolean;
  expressDealsAvailable: boolean;
  changeReservation: boolean;
  posCurrencyCode: string;
  vehicleCategoryLists: {
    categoriesBySize: string[];
    categoriesByTotalPrice: string[];
  };
  rateLists: {
    allVehicleRatesByAirportCounter: string[];
    allVehicleRatesByCategorySize: string[];
    allVehicleRatesByPartner: string[];
    allVehicleRatesByTotalPrice: string[];
  };
  partnerLists: {
    allPartnersByName: string[];
    primaryPartnersByTotalPrice: string[];
  };
  vehicleRates: VehicleRates;
  vehicleCategories: { [key: string]: VehicleCategory };
  vehicles: vehicles;
  partners: { [key: string]: Partners };
  partnerLocations: { [key: string]: PartnerLocation };
  airports: { [key: string]: Airport };
  airportCounterTypes: {
    OnAirport?: {
      id: string;
      displayName: string;
    };
    SHUTTLE: {
      id: string;
      displayName: string;
    };
    UNKNOWN: {
      id: string;
      displayName: string;
    };
  };
  tags: string[];
  vehicleCategoryGroups: VehicleCategoryGroups;
  vehicleCategoryGroupsByType: VehicleCategoryGroupsByType;
}

export interface Airport {
  airportCode: string;
  displayName: string;
  fullDisplayName: string;
  city: string;
  isoCountryCode: string;
  countryName: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  distances: {
    PICKUP: {
      miles: number;
    };
    RETURN: {
      miles: number;
    };
  };
}

export interface PartnerLocation {
  id: string;
  partnerCode: string;
  partnerLocationCode: string;
  airportCode: string;
  airportCounterType: string;
  latitude?: number;
  longitude?: number;
  address: {
    addressLine1: string;
    addressLine2?: string;
    cityName: string;
    associatedCityName: string;
    postalCode?: string;
    isoCountryCode: string;
    countryName: string;
  };
  distances?: {
    PICKUP: {
      miles: number;
    };
    RETURN: {
      miles: number;
    };
  };
  timeZone: string;
  rentalLocationId: number;
  bookingAirportCounterType?: string;
}

export interface Partners {
  partnerName: string;
  partnerCode: string;
  partnerNameShort: string;
  phoneNumber: string;
  isRccOnlyParticipant: boolean;
  isPrimary?: boolean;
  partnerPrograms?: PartnerPrograms;
  images: PartnerImages;
  highlights: Highlights;
}

export interface Highlights {}

export interface PartnerImages {
  SIZE176X88: string;
  HEIGHT18: string;
  HEIGHT27: string;
  SIZE88X44: string;
  HEIGHT36: string;
  SIZE48X24: string;
  SIZE384X192: string;
  SIZE96X48: string;
  HEIGHT72: string;
  SIZE44X22: string;
  SIZE192X96: string;
}

export interface PartnerPrograms {
  partnerCorpDiscountCode: string;
  partnerPromotionCode?: string;
  partnerLoyaltyMembershipId?: string;
}

export interface VehicleCategory {
  display: Display;
  rateLists: {
    allVehicleRatesByTotalPrice: string[];
    partnerRates: {
      [key: string]: {
        partnerCode: string;
        rateLists: {
          allVehicleRatesByTotalPrice: string[];
        };
      };
    };
  };
}

export interface Display {
  id: string;
  key: string;
  name: string;
  displayOrder: number;
  vehicleCodePatterns: string[];
  vehicleCategoryGroupIds: string[];
}

export interface VehicleCategoryGroups {
  'medium-size': CarType;
  'suv-size': CarType;
  'van-size': CarType;
  'van-type': CarType;
  'large-size': CarType;
  'small-size': CarType;
  'car-type': CarType;
  'luxury-size': CarType;
  'suv-type': CarType;
}

export interface CarType {
  id: string;
  key: string;
  name: string;
  displayOrder: number;
  vehicleCategoryIds: string[];
  type: string;
  images?: CarTypeImages;
}

export interface CarTypeImages {
  SIZE134X72: string;
}

export interface VehicleCategoryGroupsByType {
  vehicle_size: string[];
  vehicle_type: string[];
}

export interface vehicles {
  [key: string]: {
    vehicleCode: string;
    description: string;
    vehicleClassCode: string;
    vehicleTypeCode: string;
    transmissionTypeCode: string;
    vehicleClassRank: number;
    driveType: string;
    airConditioning: boolean;
    fuelTypeCode: string;
    fuelTypeDescription: string;
    manual: boolean;
    automatic: boolean;
    numberOfDoors?: string;
    partnerChoiceVehicle?: boolean;
    vehicleExample?: string;
    vehicleExampleExact?: boolean;
    peopleCapacity?: string;
    bagCapacity?: string;
    images?: Images;
  };
}

export interface VehicleRates {
  [key: string]: VehicleInformation;
}

export interface VehicleInformation {
  cancellationAllowed: boolean;
  changeReservationAllowed: boolean;
  couponSupported: boolean;
  creditCardRequired: boolean;
  deliveryType: string;
  detailsKey: string;
  driverAgeRequired: boolean;
  fareType: string;
  freeCancellation: boolean;
  id: string;
  inclusions?: string[];
  itemKey: string;
  merchantOfRecord: string;
  numRentalDays: number;
  packageSupported: boolean;
  partnerCode: string;
  partnerInfo: {
    bagCapacity?: number;
    gdsName: string;
    images: Images;
    partnerCode: string;
    peopleCapacity?: number;
    pickupLocationId: string;
    ratePlanName: string;
    referenceCode: string;
    returnLocationId: string;
    vehicleExample?: string;
    vehicleExampleExact: boolean;
  };
  payAtBooking: boolean;
  posCurrencyCode: string;
  preRegistrationSupported: boolean;
  rateDistance: {
    unlimited: boolean;
  };
  ratePlan: string;
  rates: {
    [key: string]: Rate;
  };
  skipCounterSupported: boolean;
  transactionCurrencyCode: string;
  vehicleCategoryIds: string[];
  vehicleCode: string;
  vehicleInfo: {
    airConditioning: boolean;
    automatic: boolean;
    bagCapacity?: string;
    description: string;
    driveType: string;
    fuelTypeCode: string;
    fuelTypeDescription: string;
    images: Images;
    manual: boolean;
    numberOfDoors?: string;
    partnerChoiceVehicle: boolean;
    peopleCapacity?: string;
    transmissionTypeCode: string;
    vehicleClassCode: string;
    vehicleClassRank: number;
    vehicleCode: string;
    vehicleExample?: string;
    vehicleExampleExact: boolean;
    vehicleTypeCode: string;
  };
}

export type Images = {
  SIZE67X36: string;
  SIZE134X72: string;
  SIZE335X180?: string;
  SIZE268X144: string;
  SIZE536X288?: string;
};

export type Rate = {
  basePrices: {
    DAILY: string;
    TOTAL?: string;
  };
  currencyCode: string;
  rateDistance: {
    unlimited: boolean;
  };
  totalAllInclusivePrice: string;
};
