import { Injectable } from '@angular/core';

@Injectable()
export class DictionaryService {
    // Misc
    buildVersion:                                   string = "1.0 Beta";
    wdg:                                            string = "Angular 7 ";
    website:                                        string = "localhost";
    websiteUrl:                                     string = "http://192.168.0.15:8000/";
    serviceUrl:                                     string = "http://192.168.0.15:8085";


    //Defined Site Constant
    gridDataLimit:                                  number = 2;
    //Text Constant

    //Media Constant

    //Error Constant
    loginError:                                     string = "Login Error";

    // Colors
    public insertIconColor                          = '#43a047';
    public editIconColor                            = 'orange';
    public deleteIconColor                          = '#f44336';
    public logoColor                                = '#FDC811';
    public primaryColor                             = '#0072c6';
    public secondaryColor                           = '#5aa0f9';
    public darkSecondaryColor                       = '#004795';

    public defaultColor                             = 'black';
    public infoColor                                = '#1976d2';
    public warningColor                             = '#ffff00';
    public disabledColor                            = 'lightgrey';

    public accentColor                              = 'white';
    public borderColor                              = 'darkgray';
    public backgroundColor                          = 'rgb(245,245,245)';
    public gridRowHighlightColor                    = 'lightgrey';
    public contentBackgroundColor                   = 'whitesmoke';
    public activeIntegrationColor                   = '#dcf5fd';

    // Icons
    ordersIcon:                                     string = "fas fa-box fa-fw";
    warehouseIcon:                                  string = "fas fa-warehouse fa-fw";
    dashboardIcon:                                  string = "fas fa-tachometer-alt fa-fw";
    businessPartnersIcon:                           string = "fas fa-users fa-fw";
    userIcon:                                       string = "fas fa-user fa-fw";
    reportsIcon:                                    string = "fas fa-chart-bar fa-fw";
    accountingIcon:                                 string = "fas fa-dollar-sign fa-fw";
    settingsIcon:                                   string = "fas fa-cog fa-fw";
    transportationIcon:                             string = "fas fa-shipping-fast fa-fw";
    channelsIcon:                                   string = "fas fa-share-alt fa-fw";
    yardIcon:                                       string = "fas fa-truck-loading fa-fw";
    securityIcon:                                   string = "fas fa-lock fa-fw";
    menuIcon:                                       string = "fas fa-bars fa-fw";
    printIcon:                                      string = "fas fa-print fa-fw";
    emailIcon:                                      string = "far fa-envelope fa-fw";
    ediIcon:                                        string = "fas fa-globe fa-fw";
    chatIcon:                                       string = "far fa-comments fa-fw";
    logoutIcon:                                     string = "fas fa-sign-out-alt fa-fw";
    saveIcon:                                       string = "far fa-save fa-fw";
    doneIcon:                                       string = "fas fa-check fa-fw";
    addIcon:                                        string = "fas fa-plus fa-fw";
    addAlternativeIcon:                             string = "fas fa-plus-circle fa-fw";
    minusIcon:                                      string = "fas fa-minus fa-fw";
    editIcon:                                       string = "fas fa-edit fa-fw";
    infoIcon:                                       string = "fas fa-info-circle fa-fw";
    altInfoIcon:                                    string = "fas fa-info fa-fw";
    closeIcon:                                      string = "fas fa-times fa-fw";
    listIcon:                                       string = "fas fa-list fa-fw";
    gridIcon:                                       string = "fas fa-th fa-fw";
    attentionIcon:                                  string = "fas fa-exclamation fa-fw";
    listItemIcon:                                   string = "fas fa-asterisk fa-fw";
    copyrightIcon:                                  string = "far fa-copyright fa-fw";
    exportToExcelIcon:                              string = "far fa-file-excel fa-fw";
    exportToPdfIcon:                                string = "far fa-file-pdf fa-fw";
    refreshIcon:                                    string = "fas fa-sync-alt fa-fw";
    cutIcon:                                        string = "fas fa-cut fa-fw";
    copyIcon:                                       string = "far fa-clone fa-fw";
    pasteIcon:                                      string = "fas fa-clipboard fa-fw";
    viewIcon:                                       string = "fas fa-eye fa-fw";
    insertIcon:                                     string = "fas fa-plus fa-fw";
    deleteIcon:                                     string = "fas fa-minus fa-fw";
    expandIcon:                                     string = "fas fa-expand-arrows-alt fa-fw";
    moreIcon:                                       string = "fas fa-ellipsis-v fa-fw";
    alternateMoreIcon:                              string = "fas fa-ellipsis-h fa-fw";
    searchIcon:                                     string = "fas fa-search fa-fw";
    filterIcon:                                     string = "fas fa-filter fa-fw";
    loadingIcon:                                    string = "k-icon k-i-loading fa-fw";
    profileIcon:                                    string = "fas fa-user-circle fa-fw";
    disableIcon:                                    string = "fas fa-ban fa-fw";
    homeIcon:                                       string = "fas fa-home fa-fw";
    backIcon:                                       string = "fas fa-arrow-left fa-fw";
    forwardIcon:                                    string = "fas fa-arrow-right fa-fw";
    collapseIcon:                                   string = "fas fa-chevron-up fa-fw";
    cancelIcon:                                     string = "fas fa-ban fa-fw";
    nextIcon:                                       string = "fas fa-angle-right fa-fw";
    previousIcon:                                   string = "fas fa-angle-left fa-fw";
    firstIcon:                                      string = "fas fa-angle-double-left fa-fw";
    lastIcon:                                       string = "fas fa-angle-double-right fa-fw";
    supportTicketIcon:                              string = "fas fa-ticket-alt fa-fw";
    sendIcon:                                       string = "fas fa-play fa-fw";
    uploadIcon:                                     string = "fas fa-upload fa-fw";
    stopIcon:                                       string = "fas fa-stop fa-fw";
    alternateMenuIcon:                              string = "fas fa-align-justify fa-fw";
    relocateIcon:                                   string = "fas fa-dolly fa-fw";
    convertIcon:                                    string = "fas fa-retweet fa-fw";
    transferIcon:                                   string = "fas fa-truck-loading fa-fw";
    lpnIcon:                                        string = "fas fa-pallet fa-fw";
    inventoryAdjustIcon:                            string = "fas fa-cubes fa-fw";
    wizardIcon:                                     string = "fas fa-magic fa-fw";
    documentsIcon:                                  string = "far fa-file-alt fa-fw";
    moneyIcon:                                      string = "fas fa-dollar-sign fa-fw";
    appointmentIcon:                                string = "far fa-calendar-check fa-fw";
    checkListIcon:                                  string = "fas fa-clipboard-list fa-fw";
    generalIcon:                                    string = "far fa-newspaper fa-fw";
    boxIcon:                                        string = "fas fa-box-open fa-fw";
    routingIcon:                                    string = "fas fas fa-route fa-fw";
    smallParcelIcon:                                string = "fas fa-cube fa-fw";
    downloadIcon:                                   string = "fas fa-download fa-fw";
    historyIcon:                                    string = "fas fa-history fa-fw";
    vendorIcon:                                     string = "fas fa-user fa-fw";
    ediInsertIcon:                                  string = "fas fa-tasks fa-fw";
    numberedListIcon:                               string = "fas fa-list-ol fa-fw";
    changeStatusIcon:                               string = "fas fa-exchange-alt fa-fw";
    internationalIcon:                              string = "fas fa-plane fa-fw";
    scaleIcon:                                      string = "fas fa-balance-scale fa-fw";
    moveIcon:                                       string = "fas fa-caret-right fa-fw";
    changePasswordIcon:                             string = "fas fa-key fa-fw";
    kitIcon:                                        string = "far fa-object-group fa-fw";
    exportIcon:                                     string = "fas fa-file-export fa-fw";
    warningIcon:                                    string = "fas fa-exclamation-triangle fa-fw";
    helpIcon:                                       string = "fas fa-question-circle fa-fw";
    fillIcon:                                       string = "fas fa-check-double fa-fw";
    createIcon:                                     string = "fas fa-hammer fa-fw";
    upArrowIcon:                                    string = "fas fa-arrow-alt-circle-up fa-fw";
    importIcon:                                     string = "fas fa-file-import fa-fw";
    timeIcon:                                       string = "far fa-clock fa-fw";

}