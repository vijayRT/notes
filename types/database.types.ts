export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          created_at: string | null
          slug: string
          title: string | null
          content: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          slug: string
          title?: string | null
          content?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          slug?: string
          title?: string | null
          content?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
