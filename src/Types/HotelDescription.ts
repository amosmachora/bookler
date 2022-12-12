export interface HotelDescription {
  description: string;
  descriptiontype_id: number;
  languagecode: string;
  extra_lines?: ExtraLines;
}

export interface ExtraLines {
  imp_info: string;
}
