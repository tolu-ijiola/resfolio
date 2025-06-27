import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database schema
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          template: string
          content: Json
          created_at: string
          updated_at: string
          is_public: boolean
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          template: string
          content: Json
          created_at?: string
          updated_at?: string
          is_public?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          template?: string
          content?: Json
          created_at?: string
          updated_at?: string
          is_public?: boolean
        }
      }
      websites: {
        Row: {
          id: string
          user_id: string
          title: string
          content: Json
          created_at: string
          updated_at: string
          is_public: boolean
          domain: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: Json
          created_at?: string
          updated_at?: string
          is_public?: boolean
          domain?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: Json
          created_at?: string
          updated_at?: string
          is_public?: boolean
          domain?: string | null
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string
          preview_url: string
          type: 'resume' | 'website'
          created_at: string
          updated_at: string
          is_premium: boolean
        }
        Insert: {
          id?: string
          name: string
          description: string
          preview_url: string
          type: 'resume' | 'website'
          created_at?: string
          updated_at?: string
          is_premium?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string
          preview_url?: string
          type?: 'resume' | 'website'
          created_at?: string
          updated_at?: string
          is_premium?: boolean
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