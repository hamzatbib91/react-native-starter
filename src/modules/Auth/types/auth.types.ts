

export interface LoginProps {
  email: string
  password: string
}

export interface AuthResponse {
  token_type: string // Token type, for example 'Bearer'
  access_token: string // Access token (JWT or similar)
  user: Auth
}

export interface Auth {
  id:                       number;
  last_name:                string;
  first_name:               string;
  email:                    string;
  email_personnel:          null;
  date_entree:              null;
  date_sortie:              null;
  cine:                     null;
  telephone:                null;
  cnss:                     null;
  niveau_etude:             null;
  profil:                   null;
  type_sortie:              null;
  adresse:                  null;
  entite_id:                number;
  email_verified_at:        Date;
  current_team_id:          null;
  profile_photo_path:       null;
  rib:                      null;
  numCompte:                null;
  deleted_at:               null;
  updated_at:               Date;
  current_entite_id:        null;
  current_cabinet_id:       number;
  current_group_cabinet_id: number;
  profile_photo_url:        string;
  roles:                    Role[];
  permissions:              Permission[];
}

export interface Permission {
  id:         number;
  name:       string;
  guard_name: string;
  created_at: Date;
  updated_at: Date;
  pivot:      PermissionPivot;
}

export interface PermissionPivot {
  model_id:      number;
  permission_id: number;
  model_type:    string;
}

export interface Role {
  id:         number;
  name:       string;
  guard_name: string;
  created_at: null;
  updated_at: null;
  pivot:      RolePivot;
}

export interface RolePivot {
  model_id:   number;
  role_id:    number;
  model_type: string;
}
