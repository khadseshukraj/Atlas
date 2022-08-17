import { iBasicFilter } from './ifilter';

export interface IDropdown {
    ID?: string,
    Value?: string,
    selected?: boolean,
    OrderByColumn1?: string,
    OrderByColumn2?: string
}

export interface IUserDetails {
    CommonName?: string,
    LoginName?: string,
    EmailId?: string,
    TNumber?: string,
    Roles?: string[]
}

export interface iADJToREGNotificationViewModel {
    NotificationID?: number,
    ADJProjectID?: string,
    ADJProjectName?: string,
    REGProjectID?: string,
    REGProjectName?: string,
    ADJDescription?: string,
    CurrentValue?: number,
    AdjustedValue?: number,
    NewValue?: number,
    IsRead?: boolean,
    ReceivedOn?: Date,
    BasicFilter?: iBasicFilter,
    CreatedBy?: string,
    Status?: string,
    Comment?: string
}

export interface IBusinessUnit {
  ID: string
  Name: string
};

export interface ICategory {
  BUID: string
  ID: string
  Name: string
}

export interface IGCAS {
  ID: string
  Name: string
};

export interface IProbability {
  Value: number
  Name: string
};

export interface IProcurementHandling {
  ID: string
  Name: string
};

export interface IProjectClassification {
  ID: string
  Name: string
};

export interface ISpendPoolHigh {
  ID: string
  Name: string
};

export interface ISpendPoolMedium {
  SPHID: string
  ID: string
  Name: string
};

export interface ISpendPoolLow {
  SPMID: string
  ID: string
  Name: string
};

export interface ISubRegion {
  id: string;
  name: string;
  ID: string
  Name: string
};