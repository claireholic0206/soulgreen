export interface Category {
  id: string;
  name_cn: string;
  name_en?: string | null;
  slug?: string | null;
}

export interface Product {
  id: string;
  category_id: string;
  name_cn: string | null;
  name_en?: string | null;
  latin_name?: string | null;
  description?: string | null;
  price: number | null;
  volume?: string | null;
  image_url?: string | null;
  origin?: string | null;
  method?: string | null;
  is_organic?: boolean | null;
  ingredients?: string | null;
  usage?: string | null;
  dosha_type?: string | null;
  Is_Sale?: boolean | null;
  categories?: Category | null;
}
