import { IDropdown } from './icommon';

export interface iBasicFilter {
    FiscalYear?: string,
    ForecastCycle?: string,
    BackupBuyer?: string,
    SpendPoolHighID?: string,
    SpendPoolHighValue?: string,
    PurchasingGroupID?: string,
    PurchasingGroupValue?: string,
    ProjectType?: string,
    ForecastCyleProjectType?: string,
    TNumber?: string,
    ForecastType?: string,
    FlagName?: string,
    SpendPoolMediumID?: string,
    SpendPoolMediumValue?: string,
    SpendPoolLowID?: string,
    SpendPoolLowValue?: string,
    StartDate?: Date,
    ProjectClassificationID?: string,
    ProjectClassificationValue?: string,
    SubRegionID?: string,
    SubRegionValue?: string,
    BusinessUnitID?: string;
    BusinessUnitValue?: string
    ProjectID?: string,
    ProjectName?: IDropdown,
    ProjectStartDateInStringFormat?: string
}