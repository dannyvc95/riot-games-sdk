export type QueueType =
  | 'RANKED_SOLO_5x5'
  | 'RANKED_TFT'
  | 'RANKED_FLEX_SR'
  | 'RANKED_FLEX_TT';

export type Tier =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER';

export type Division = 'I' | 'II' | 'III' | 'IV';

export type Platforms = 'WINDOWS' | 'MACOS' | 'ANDROID' | 'IOS' | 'PS4' | 'XBONE' | 'SWITCH';

export type PublishLocations = 'RIOTCLIENT' | 'RIOTSTATUS' | 'GAME';

export type IncidentSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export type MaintenanceStatus = 'SCHEDULED' | 'INPROGRESS' | 'COMPLETE';
