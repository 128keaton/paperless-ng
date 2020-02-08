export interface Document {
  id: number;
  title: string;
  content: string;
  file_type: string;
  tags: string[];
  checksum: string;
  created: Date;
  modified: Date;
  added: Date;
  file_name: string;
  download_url: string;
  thumbnail_url: string;
}
