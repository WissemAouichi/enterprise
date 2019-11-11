// Get Latest from http://www.unicode.org/Public/cldr/25/
Soho.Locale.addCulture('th-TH', {
  // layout/language
  language: 'th',
  englishName: 'Thai (Thailand)',
  nativeName: 'ไทย (ไทย)',
  // layout/orientation/@characters
  direction: 'left-to-right',
  // ca-gregorian
  calendars: [{
    name: 'gregorian',
    // ca-gregorian/main/dates/calendars/gregorian/dateFormats/
    dateFormat: {
      separator: '/', // Infered
      timeSeparator: ':',
      short: 'd/M/yyyy', // use four digit year
      medium: 'd MMM yyyy',
      long: 'd MMMM yyyy',
      full: 'EEEEที่ d MMMM G yyyy',
      month: 'd MMMM',
      year: 'MMMM yyyy',
      timestamp: 'HH:mm:ss',
      hour: 'HH:mm',
      datetime: 'd/M/yyyy HH:mm',
      timezone: 'd/M/yyyy HH:mmm zz',
      timezoneLong: 'd/M/yyyy HH:mm zzzz'
    }, // Infered short + short gregorian/dateTimeFormats
    // ca-gregorian/main/dates/calendars/gregorian/days/format/short or abbreviated (2 digit)
    days: {
      wide: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
      abbreviated: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
      narrow: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    },
    // ca-gregorian/main/dates/calendars/gregorian/months/format/wide
    months: {
      wide: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      abbreviated: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    },
    // ca-gregorian/main/dates/calendars/gregorian/timeFormats/short
    timeFormat: 'HH:mm',
    // ca-gregorian/main/dates/calendars/gregorian/dayPeriods/wide
    dayPeriods: ['ก่อนเที่ยง', 'หลังเที่ยง']
  }],
  // numbers/currencyFormats-numberSystem-latn/standard
  currencySign: 'kr',
  currencyFormat: '¤###',
  // numbers/symbols-numberSystem-latn
  numbers: {
    percentSign: '%',
    percentFormat: '### %',
    percentSuffix: ' %',
    percentPrefix: '',
    minusSign: '-',
    decimal: '.',
    group: ',',
    groupSizes: [3, 3]
  },
  // Resx - Provided By Translation Team
  messages: {
    AboutText: { id: 'AboutText', value: 'ลิขสิทธิ์ &copy; {0} Infor. ขอสงวนลิขสิทธิ์ คำและเครื่องหมายการออกแบบที่ระบุในที่นี้เป็นเครื่องหมายการค้า และ/หรือเครื่องหมายการค้าจดทะเบียนของ Infor และ/หรือบริษัทในเครือและบริษัทสาขา ขอสงวนลิขสิทธิ์ สำหรับเครื่องหมายการค้าอื่นที่ระบุไว้ที่นี้ทั้งหมดถือเป็นทรัพย์สินของเจ้าของที่เกี่ยวข้อง' },
    Actions: { id: 'Actions', value: 'การดำเนินการ', comment: 'Tooltip text for the action button with additional in context actions' },
    AdditionalItems: { id: 'AdditionalItems', value: 'รายการเพิ่มเติม', comment: 'Button tooltip used in a list of movable items' },
    Add: { id: 'Add', value: 'เพิ่ม', comment: 'Add' },
    AddComments: { id: 'AddComments', value: 'เพิ่มความคิดเห็น', comment: 'Add comments to a form of data' },
    AddNewTab: { id: 'AddNewTab', value: 'เพิ่มแท็บใหม่', comment: 'Attached to a button that adds new tabs' },
    AdministrativeLeave: { id: 'AdministrativeLeave', value: 'ออกจากผู้ดูแลระบบ', comment: 'As in vacation time from work' },
    AdvancedFilter: { id: 'AdvancedFilter', value: 'สร้างตัวกรองขั้นสูง', comment: 'In a data grid active an advanced filtering feature' },
    Alert: { id: 'Alert', value: 'การแจ้งเตือน', comment: 'Alert' },
    AlertOnPage: { id: 'AlertOnPage', value: 'ข้อความแจ้งเตือนในหน้า', comment: 'Alert message(s) on page n' },
    All: { id: 'All', value: 'ทั้งหมด', comment: 'All items in the context of a filter' },
    AllResults: { id: 'AllResults', value: 'ผลลัพธ์ทั้งหมดสำหรับ', comment: 'Search Results Text' },
    AligntoBottom: { id: 'AligntoBottom', value: 'จัดชิดด้านล่าง', comment: 'Align to Bottom tooltip' },
    AlignCenterHorizontally: { id: 'AlignCenterHorizontally', value: 'จัดแนวตรงกลางแนวนอน', comment: 'Align Center Horizontally tooltip' },
    Amber: { id: 'Amber', value: 'สีเหลืองอำพัน', comment: 'Color in our color pallette' },
    Amethyst: { id: 'Amethyst', value: 'สีม่วง', comment: 'Color in our color pallette' },
    Apply: { id: 'Apply', value: 'ใช้', comment: 'Text in a button to apply an action' },
    AppMenuTriggerText: { id: 'AppMenuTriggerText', value: 'เมนู', comment: 'Text in a special Module Tab used to trigger an Application Menu open or closed' },
    Attach: { id: 'Attach', value: 'แนบ', comment: 'Attach' },
    Available: { id: 'Available', value: 'มี', comment: 'Button tooltip used in a list of movable items' },
    Azure: { id: 'Azure', value: 'สีขาวอมฟ้า', comment: 'Color in our color pallette' },
    BackgroundColor: { id: 'BackgroundColor', value: 'สีพื้นหลัง', comment: 'add or edit text background color in the editor' },
    Between: { id: 'Between', value: 'ระหว่าง', comment: 'Between in icons for filtering' },
    Blockquote: { id: 'Blockquote', value: 'บล็อกการเสนอราคา', comment: 'insert a block quote in the editor' },
    Bold: { id: 'Bold', value: 'ตัวหนา', comment: 'Make text Bold' },
    Bookmarked: { id: 'Bookmarked', value: 'บุ๊กมาร์กแล้ว', comment: 'Bookmark filled - Element is already bookmarked' },
    BookmarkThis: { id: 'BookmarkThis', value: 'บุ๊กมาร์กหน้านี้', comment: 'Bookmark an element' },
    Breadcrumb: { id: 'Breadcrumb', value: 'แสดงเส้นทาง', comment: 'Text describing the Breadcrumb' },
    Browser: { id: 'Browser', value: 'เบราว์เซอร์', comment: 'As in a Web Browser' },
    BulletedList: { id: 'BulletedList', value: 'รายการสัญลักษณ์หัวข้อย่อย', comment: 'Bulleted List tooltip' },
    Calendar: { id: 'Calendar', value: 'ปฏิทิน', comment: 'Inline Text for the title of the Calendar control' },
    Camera: { id: 'Camera', value: 'กล้อง', comment: 'Camera tooltip' },
    Cancel: { id: 'Cancel', value: 'ยกเลิก', comment: 'Cancel tooltip' },
    CapsLockOn: { id: 'CapsLockOn', value: 'เปิด Caps Lock', comment: 'Caps Lock On message' },
    Cart: { id: 'Cart', value: 'รถเข็น', comment: 'Cart tooltip' },
    CenterText: { id: 'CenterText', value: 'ตรงกลาง', comment: 'An Icon Tooltip' },
    CharactersLeft: { id: 'CharactersLeft', value: 'ตัวอักษรที่เหลือ {0}', comment: 'indicator showing how many more characters you can type.' },
    CharactersMax: { id: 'CharactersMax', value: 'จำนวนตัวอักษรสูงสุดของ ', comment: 'indicator showing how many max characters you can type.' },
    ChangeSelection: { id: 'ChangeSelection', value: '. เปลี่ยนการเลือกโดยการใช้ปุ่มลูกศร', comment: 'Audible Text for drop down list help' },
    ChangeView: { id: 'ChangeView', value: 'เปลี่ยนมุมมอง', comment: 'Change the current page from a list of options' },
    Checkbox: { id: 'Checkbox', value: 'กล่องกาเครื่องหมาย', comment: 'Checkbox tooltip' },
    Checked: { id: 'Checked', value: 'ตรวจสอบแล้ว', comment: 'Checked tooltip' },
    ChooseA: { id: 'ChooseA', value: 'เลือก ', comment: 'Audible tooltip for choosing a thing in a list.' },
    ChooseAn: { id: 'ChooseAn', value: 'เลือก ', comment: 'Audible tooltip for choosing an item in a list.' },
    Clear: { id: 'Clear', value: 'ล้าง', comment: 'Tooltip for a Clear Action' },
    ClearFilter: { id: 'ClearFilter', value: 'ล้างตัวกรอง', comment: 'Clear the current filter criteria' },
    ClearFormatting: { id: 'ClearFormatting', value: 'ล้างรูปแบบ', comment: 'Clear the formatting in editor' },
    ClearSelection: { id: 'ClearSelection', value: '(ล้างการเลือก)', comment: 'clear dropdown selection' },
    Clock: { id: 'Clock', value: 'นาฬิกา', comment: 'Clock tooltip' },
    Close: { id: 'Close', value: 'ปิด', comment: 'Tooltip for a Close Button Action' },
    Clickable: { id: 'Clickable', value: 'สามารถคลิกได้ในตัวแก้ไข', comment: 'Clickable in editor' },
    Copy: { id: 'Copy', value: 'คัดลอก', comment: 'Copy tooltip' },
    Collapse: { id: 'Collapse', value: 'ยุบ', comment: 'Collapse / close a tree/submenu' },
    CollapseAppTray: { id: 'CollapseAppTray', value: 'ยุบถาดแอป', comment: 'Collapse App Tray tooltip' },
    Columns: { id: 'Columns', value: 'คอลัมน์', comment: 'Columns tooltip' },
    Comments: { id: 'Comments', value: 'ความคิดเห็น', comment: 'Comments on an form' },
    CompanyHoliday: { id: 'CompanyHoliday', value: 'วันหยุดบริษัท', comment: 'A holiday provided by work.' },
    Component: { id: 'Component', value: 'องค์ประกอบ', comment: 'As in a UI component - building block.' },
    Compose: { id: 'Compose', value: 'สร้าง', comment: 'Compose tooltip' },
    Completed: { id: 'Completed', value: 'เสร็จสิ้นแล้ว', comment: 'Text For a Completed Status' },
    Confirm: { id: 'Confirm', value: 'ยืนยัน', comment: 'Confirm tooltip' },
    ConfirmOnPage: { id: 'ConfirmOnPage', value: 'ข้อความยืนยันในหน้า', comment: 'Confirm message(s) on page n' },
    CookiesEnabled: { id: 'CookiesEnabled', value: 'เปิดใช้งานคุกกี้', comment: 'Returns if browser cookies are enabled or not.' },
    Contains: { id: 'Contains', value: 'ประกอบด้วย', comment: 'Contains in icons for filtering' },
    CssClass: { id: 'CssClass', value: 'ระดับ Css', comment: 'Label for entering a Css Class name' },
    Cut: { id: 'Cut', value: 'ตัด', comment: 'Cut tooltip' },
    Dark: { id: 'Dark', value: 'มืด', comment: 'The name of one of the application theme variants.' },
    Date: { id: 'Date', value: 'วันที่', comment: 'Describes filtering by a date data type' },
    Day: { id: 'Day', value: 'วัน', comment: 'Shows view with day events' },
    Days: { id: 'Days', value: 'วัน ', comment: 'Show how many days until an event' },
    DaysOverdue: { id: 'DaysOverdue', value: 'เกินกำหนด {0} วัน', comment: 'For a task /date UI' },
    DaysRemaining: { id: 'DaysRemaining', value: 'เหลือ {0} วัน', comment: 'For a task /date UI' },
    Default: { id: 'Default', value: 'ค่าเริ่มต้น', comment: 'Refers to a default object of a generic type' },
    Delete: { id: 'Delete', value: 'ลบ', comment: 'Delete Toolbar Action Tooltip' },
    DeleteEvent: { id: 'DeleteEvent', value: 'ลบกิจกรรม', comment: 'Delete an Event (from a calendar)' },
    DeviceName: { id: 'Device', value: 'อุปกรณ์', comment: 'Name of the Device' },
    DistributeHoriz: { id: 'DistributeHoriz', value: 'กระจายแนวนอน', comment: 'Icon button tooltip for action that distributes elements across Horizontally' },
    Document: { id: 'Document', value: 'เอกสาร', comment: 'Document tooltip' },
    DiscretionaryTimeOff: { id: 'DiscretionaryTimeOff', value: 'การตัดสินใจหยุดงาน', comment: 'As in work time off' },
    Dirty: { id: 'Dirty', value: 'เปลี่ยนแถวแล้ว', comment: 'Record is dirty / modified' },
    Drilldown: { id: 'Drilldown', value: 'ดูรายละเอียดแนวลึก', comment: 'Drill by moving page flow into a record' },
    Drillup: { id: 'Drillup', value: 'ดูข้อมูลสรุป', comment: 'Opposite of Drilldown, move back up to a larger set of records' },
    Dropdown: { id: 'Dropdown', value: 'ดรอปดาวน์', comment: 'Dropdown' },
    DoesNotContain: { id: 'DoesNotContain', value: 'ไม่ได้ประกอบด้วย', comment: 'Does Not Contain in icons for filtering' },
    DoesNotEndWith: { id: 'DoesNotEndWith', value: 'ไม่ได้ลงท้ายด้วย', comment: 'For condition filtering' },
    DoesNotEqual: { id: 'DoesNotEqual', value: 'ไม่เท่ากับ', comment: 'Does Not Equal in icons for filtering' },
    DoesNotStartWith: { id: 'DoesNotStartWith', value: 'ไม่ได้เริ่มต้นด้วย', comment: 'For condition filtering' },
    Down: { id: 'Down', value: 'ลง', comment: 'Down tooltip' },
    Download: { id: 'Download', value: 'ดาวน์โหลด', comment: 'Download tooltip' },
    Duplicate: { id: 'Duplicate', value: 'ทำซ้ำ', comment: 'Duplicate tooltip' },
    EitherSelectedOrNotSelected: { id: 'EitherSelectedOrNotSelected', value: 'ไม่ว่าจะเลือกหรือไม่เลือก', comment: 'Either Selected Or NotSelected in icons for filtering' },
    EndsWith: { id: 'EndsWith', value: 'จบด้วย', comment: 'for condition filtering' },
    EnterComments: { id: 'EnterComments', value: 'ป้อนความเห็นที่นี่...', comment: 'Placeholder text for a text input (comments)' },
    Error: { id: 'Error', value: 'ข้อผิดพลาด', comment: 'Title, Spoken Text describing fact an error has occured' },
    ErrorAllowedTypes: { id: 'ErrorAllowedTypes', value: 'ไม่อนุญาตให้ใช้ประเภทไฟล์นี้', comment: 'Error string for file-upload' },
    ErrorMaxFileSize: { id: 'ErrorMaxFileSize', value: 'เกินขนาดไฟล์ที่จำกัด', comment: 'Error string for file-upload' },
    ErrorMaxFilesInProcess: { id: 'ErrorMaxFilesInProcess', value: 'เกินจำนวนไฟล์สูงสุดที่อนุญาต', comment: 'Error string for file-upload' },
    ErrorOnPage: { id: 'ErrorOnPage', value: 'ข้อความข้อผิดพลาดในหน้า', comment: 'Error message(s) on page n' },
    EmailValidation: { id: 'EmailValidation', value: 'ที่อยู่อีเมลไม่ถูกต้อง', comment: 'This the rule for email validation' },
    Emerald: { id: 'Emerald', value: 'สีเขียวมรกต', comment: 'Color in our color pallette' },
    Expand: { id: 'Expand', value: 'ขยาย', comment: 'Expand open a tree/submenu' },
    ExpandAppTray: { id: 'ExpandAppTray', value: 'ขยายถาดแอป', comment: 'ExpandAppTray tooltip' },
    ExpandCollapse: { id: 'ExpandCollapse', value: 'ขยาย / ยุบ', comment: 'Text to toggle a button in a container.' },
    ExportAsSpreadsheet: { id: 'ExportAsSpreadsheet', value: 'ส่งออกเป็นสเปรดชีต', comment: 'Export as Spreadsheet tooltip' },
    Edit: { id: 'Edit', value: 'แก้ไข', comment: 'Edit tooltip' },
    Equals: { id: 'Equals', value: 'เท่ากับ', comment: 'Equals in icons for filtering' },
    Event: { id: 'Event', value: 'กิจกรรม', comment: 'As in an event that would be in a calendar' },
    ExitFullView: { id: 'ExitFullView', value: 'ออกจากหน้าจอเต็ม', comment: 'Exit Full View tooltip' },
    Export: { id: 'Export', value: 'ส่งออก', comment: 'Export tooltip' },
    ExportToExcel: { id: 'ExportToExcel', value: 'ส่งออกไปยัง Excel', comment: 'Export To Excel menu option in datagrid' },
    Favorite: { id: 'Favorite', value: 'รายการโปรด', comment: 'A favorite item' },
    FileUpload: { id: 'FileUpload', value: 'ไฟล์อัปโหลด กด Enter เพื่อเรียกดูไฟล์', comment: 'Screen Reader instructions' },
    FieldFilter: { id: 'FieldFilter', value: 'ตัวกรองฟิลด์', comment: 'Used for Field Filter' },
    Filter: { id: 'Filter', value: 'ตัวกรอง', comment: 'Filter tooltip' },
    FirstPage: { id: 'FirstPage', value: 'หน้าแรก', comment: 'First Page tooltip' },
    Folder: { id: 'Folder', value: 'โฟลเดอร์', comment: 'Folder tooltip' },
    From: { id: 'From', value: 'จาก', comment: 'Start of a range (of dates)' },
    FullView: { id: 'FullView', value: 'หน้าจอเต็ม', comment: 'Full View tooltip' },
    GoForward: { id: 'GoForward', value: 'ไปข้างหน้า', comment: 'Move Page / object this direction' },
    GoBack: { id: 'GoBack', value: 'ย้อนกลับ', comment: 'Move Page / object this directionp' },
    GoDown: { id: 'GoDown', value: 'ไปด้านล่าง', comment: 'Move Page / object this directionp' },
    GoUp: { id: 'GoUp', value: 'ไปด้านบน', comment: 'Move Page / object this direction' },
    Go: { id: 'Go', value: 'ไป', comment: 'Go, perform a movement, start a search, move to the next "thing" in a workflow.' },
    Graphite: { id: 'Graphite', value: 'แกรไฟต์', comment: 'Color in our color pallette' },
    GreaterOrEquals: { id: 'GreaterOrEquals', value: 'มากกว่าหรือเท่ากับ', comment: 'Greater Than Or Equals in icons for filtering' },
    GreaterThan: { id: 'GreaterThan', value: 'มากกว่า', comment: 'Greater Than in icons for filtering' },
    Grid: { id: 'Grid', value: 'เส้นตาราง', comment: 'Grid tooltip' },
    Group: { id: 'Group', value: 'กลุ่ม', comment: 'Group of data in a datagrid with grouped rows' },
    Groups: { id: 'Groups', value: 'กลุ่ม', comment: 'Plural for group' },
    GroupsPerPage: { id: 'GroupsPerPage', value: '{0} กลุ่มต่อหน้า', comment: 'Dropdown allows the user to select how many visible Groups the {} placeholder shows value.' },
    Hour: { id: 'Hour', value: 'ชั่วโมง', comment: 'the hour portion of a time' },
    Hours: { id: 'Hours', value: 'ชั่วโมง', comment: 'the hour portion of a time (plural)' },
    HeadingThree: { id: 'HeadingThree', value: 'หัวเรื่องสาม', comment: 'Heading Three tooltip' },
    HeadingFour: { id: 'HeadingFour', value: 'หัวเรื่องสี่', comment: 'Heading Four tooltip' },
    HighContrast: { id: 'HighContrast', value: 'คอนทราสต์สูง', comment: 'The name of a theme variant' },
    Highest: { id: 'Highest', value: 'สูงสุด', comment: 'Highest Four tooltip' },
    Home: { id: 'Home', value: 'หน้าหลัก', comment: 'Home tooltip' },
    HtmlView: { id: 'HtmlView', value: 'มุมมอง Html', comment: 'Html View tooltip' },
    Image: { id: 'Image', value: 'รูปภาพ', comment: 'Image of something' },
    Import: { id: 'Import', value: 'นำเข้า', comment: 'Import tooltip' },
    Info: { id: 'Info', value: 'ข้อมูล', comment: 'Info tooltip' },
    InfoOnPage: { id: 'InfoOnPage', value: 'ข้อความข้อมูลในหน้า', comment: 'Information message(s) on page n' },
    InProgress: { id: 'In Progress', value: 'กำลังดำเนินการ', comment: 'Info tooltip that an action is in progress' },
    Insert: { id: 'Insert', value: 'แทรก', comment: 'Insert Modal Dialog Button' },
    InsertAnchor: { id: 'InsertAnchor', value: 'แทรกจุดยึด', comment: 'Insert Acnhor (link) in an editor' },
    InsertImage: { id: 'InsertImage', value: 'แทรกรูปภาพ', comment: 'Insert Image in an editor' },
    InsertLink: { id: 'InsertLink', value: 'แทรกลิงก์', comment: 'Insert Link in an editor' },
    InsertUrl: { id: 'InsertUrl', value: 'แทรก Url', comment: 'Insert a Url in an editor' },
    Italic: { id: 'Italic', value: 'ตัวเอียง', comment: 'Make Text Italic' },
    InvalidDate: { id: 'InvalidDate', value: 'วันที่ไม่ถูกต้อง', comment: 'validation message for wrong date format (short)' },
    InvalidTime: { id: 'InvalidTime', value: 'เวลาไม่ถูกต้อง', comment: 'validation message for wrong time format' },
    Inventory: { id: 'Inventory', value: 'สินค้าคงคลัง', comment: 'Icon button tooltop for Inventory Action' },
    InRange: { id: 'InRange', value: 'ในขอบเขต', comment: 'In Range in icons for filtering' },
    IsEmpty: { id: 'IsEmpty', value: 'ที่ว่าง', comment: 'Is Empty in icons for filtering' },
    IsNotEmpty: { id: 'IsNotEmpty', value: 'ที่ไม่ว่าง', comment: 'Is Not Empty in icons for filtering' },
    ItemsSelected: { id: 'ItemsSelected', value: 'เลือกรายการแล้ว', comment: 'Num of Items selected for swaplist' },
    JustifyCenter: { id: 'JustifyCenter', value: 'ตรงกลาง', comment: 'justify text to center in the editor' },
    JustifyLeft: { id: 'JustifyLeft', value: 'จัดชิดซ้าย', comment: 'justify text to left in the editor' },
    JustifyRight: { id: 'JustifyRight', value: 'จัดชิดขวา', comment: 'justify text to right in the editor' },
    Keyword: { id: 'Keyword', value: 'คำสำคัญ', comment: 'Describes filtering by a keyword search' },
    Launch: { id: 'Launch', value: 'เปิดใช้', comment: 'Launch' },
    LastPage: { id: 'LastPage', value: 'หน้าสุดท้าย', comment: 'Last Page tooltip' },
    Left: { id: 'Left', value: 'ซ้าย', comment: 'Left tooltip' },
    Legend: { id: 'Legend', value: 'คำอธิบาย', comment: 'As in a chart legend' },
    LessOrEquals: { id: 'LessOrEquals', value: 'น้อยกว่าหรือเท่ากับ', comment: 'Less Than Or Equals in icons for filtering' },
    LessThan: { id: 'LessThan', value: 'น้อยกว่า', comment: 'Less Than in icons for filtering' },
    Light: { id: 'Light', value: 'สว่าง', comment: 'The name of one of the application theme variants.' },
    Link: { id: 'Link', value: 'ลิงก์', comment: 'Link - as in hyperlink - icon tooltop' },
    Load: { id: 'Load', value: 'โหลด', comment: 'Load icon tooltip' },
    Loading: { id: 'Loading', value: 'กำลังโหลด', comment: 'Text below spinning indicator to indicate loading' },
    Locale: { id: 'Locale', value: 'Locale', comment: 'The users locale string for example en-US, it-It' },
    Locked: { id: 'Locked', value: 'ล็อกแล้ว', comment: 'Locked tooltip' },
    Logout: { id: 'Logout', value: 'ออกจากระบบ', comment: 'Log out of the application' },
    Lookup: { id: 'Lookup', value: 'ค้นหา', comment: 'Lookup - As in looking up a record or value' },
    Lowest: { id: 'Lowest', value: 'ต่ำที่สุด', comment: 'Lowest - As in Lowest value' },
    Mail: { id: 'Mail', value: 'จดหมาย', comment: 'Mail tooltip' },
    MapPin: { id: 'MapPin', value: 'ปักหมุด', comment: 'Map Pin tooltip' },
    Maximize: { id: 'Maximize', value: 'ขยายใหญ่สุด', comment: 'Maximize a screen or dialog in the UI' },
    Median: { id: 'Median', value: 'มัธยฐาน', comment: 'Median in Mathematics' },
    Medium: { id: 'Medium', value: 'ขนาดกลาง', comment: 'Describes a Medium sized Row Height in a grid/list' },
    Menu: { id: 'Menu', value: 'เมนู', comment: 'Menu tooltip' },
    MingleShare: { id: 'MingleShare', value: 'แบ่งปันกับ Ming.le', comment: 'Share the contextual object/action in the mingle system' },
    Minutes: { id: 'Minutes', value: 'นาที', comment: 'the minutes portion of a time' },
    Minimize: { id: 'Minimize', value: 'ย่อเล็กสุด', comment: 'Minimize tooltip' },
    Minus: { id: 'Minus', value: 'ลบ', comment: 'Minus tooltip' },
    Mobile: { id: 'Mobile', value: 'อุปกรณ์เคลื่อนที่', comment: 'Indicates a mobile device (phone tablet ect)' },
    Month: { id: 'Month', value: 'เดือน', comment: 'As in a date month' },
    More: { id: 'More', value: 'เพิ่มเติม', comment: 'Text Indicating More Buttons or form content' },
    MoreActions: { id: 'MoreActions', value: 'การดำเนินการเพิ่มเติม', comment: 'Text on the More Actions button indictating hidden functions' },
    MoveToLeft: { id: 'MoveToLeft', value: 'เลื่อนไปทางซ้าย', comment: 'Button tooltip used in a list of movable items' },
    MoveToRight: { id: 'MoveToRight', value: 'เลื่อนไปทางขวา', comment: 'Button tooltip used in a list of movable items' },
    MsgDirty: { id: 'MsgDirty', value: ', แก้ไขแล้ว', comment: 'for modified form fields' },
    New: { id: 'New', value: 'ใหม่', comment: 'Add new rowstatus in datagrid' },
    NewEvent: { id: 'NewEvent', value: 'กิจกรรมใหม่', comment: 'Menu item for adding a new calendar event.' },
    NewEventDetails: { id: 'NewEventDetails', value: 'รายละเอียดกิจกรรมใหม่', comment: 'Placholder text for adding a new calendar event.' },
    NewDocument: { id: 'NewDocument', value: 'เอกสารใหม่', comment: 'New Document tooltip' },
    NewItem: { id: 'NewItem', value: 'รายการใหม่', comment: 'New item in listbuilder' },
    NewWindow: { id: 'NewWindow', value: 'หน้าต่างใหม่', comment: 'Contents open in a new browser window.' },
    Next: { id: 'Next', value: 'ถัดไป', comment: 'Next in icons tooltip' },
    NextPage: { id: 'NextPage', value: 'หน้าถัดไป', comment: 'Next on Pager' },
    NextMonth: { id: 'NextMonth', value: 'เดือนถัดไป', comment: 'the label for the button that moves calendar to next/prev' },
    No: { id: 'No', value: 'ไม่', comment: 'On a dialog button' },
    NoCommentsEntered: { id: 'NoCommentsEntered', value: 'ไม่มีการป้อนความเห็น', comment: 'Placeholder for where no comments are added.' },
    NoData: { id: 'NoData', value: 'ไม่มีข้อมูล', comment: 'Shown when there is no rows shown in a list' },
    NoDataFilter: { id: 'NoDataFilter', value: 'ไม่มีข้อมูล สร้างตัวกรองการเลือกใหม่เพื่อดูผลลัพธ์เพิ่มเติม', comment: 'Shown when there is no rows shown in a list' },
    NoDataList: { id: 'NoDataList', value: 'ไม่มีข้อมูล สร้างตัวกรองการเลือกใหม่ในรายการด้านบนเพื่อดูผลลัพธ์เพิ่มเติม', comment: 'Shown when there is no rows shown in a list' },
    None: { id: 'None', value: 'ไม่มี', comment: 'None to pick clear color' },
    NoResults: { id: 'NoResults', value: 'ไม่พบผลลัพธ์', comment: 'Search Results Text' },
    NoTitle: { id: 'NoTitle', value: '(ไม่มีหัวเรื่อง)', comment: 'Placeholder text for when you add an event to the calendar with no title typed.' },
    Normal: { id: 'Normal', value: 'ปกติ', comment: 'Normal row height' },
    Notes: { id: 'Notes', value: 'บันทึก', comment: 'Notes icon tooltip' },
    NotSelected: { id: 'NotSelected', value: 'ไม่ได้เลือก', comment: 'Not Selected in icons for filtering' },
    NumberList: { id: 'NumberList', value: 'รายการตัวเลข', comment: 'Number List tooltip' },
    Ok: { id: 'Ok', value: 'โอเค', comment: 'Ok button on a dialog' },
    OpenBackClose: { id: 'OpenBackClose', value: 'เปิด / ย้อนกลับ / ปิด', comment: 'Open / Back / Close tooltip' },
    OpenClose: { id: 'OpenClose', value: 'เปิด / ปิด', comment: 'Open / Close tooltip' },
    OperatingSystem: { id: 'OperatingSystem', value: 'ระบบปฏิบัติการ', comment: 'Device Operating System' },
    OrderedList: { id: 'OrderedList', value: 'แทรก/ลบรายการตัวเลข', comment: 'Insert an Ordered list in the editor' },
    Page: { id: 'Page', value: 'หน้า ', comment: 'Text on the pager links' },
    PageOf: { id: 'PageOf', value: 'หน้า {0} จาก {1}', comment: 'Pager Text Showing current and number of pages' },
    PageOn: { id: 'PageOn', value: 'ขณะนี้คุณอยู่ในหน้า ', comment: 'Text on the pager links' },
    PaidTimeOff: { id: 'PaidTimeOff', value: 'การหยุดงานแบบได้รับค่าจ้าง', comment: 'As in vacation from work' },
    Paste: { id: 'Paste', value: 'วาง', comment: 'Paste icon tooltip' },
    PasswordValidation: { id: 'PasswordValidation', value: '<strong>รหัสผ่านต้อง</strong><br>มีความยาวอักขระอย่างน้อย 10 ตัวอักษร<br>มีอักขระตัวพิมพ์ใหญ่อย่างน้อยหนึ่งตัว<br>มีอักขระตัวพิมพ์เล็กอย่างน้อยหนึ่งตัว<br>มีอักขระพิเศษหนึ่งตัว<br>ไม่ประกอบด้วยชื่อผู้ใช้ของคุณ<br>ต้องไม่ใช่รหัสผ่านที่ใช้แล้ว<br>', comment: 'Password validation requirements' },
    PasswordConfirmValidation: { id: 'PasswordConfirmValidation', value: 'รหัสผ่านต้องตรงกัน', comment: 'Password Confirm validation' },
    Peak: { id: 'Peak', value: 'สูงสุด', comment: 'the max or peak value in a chart' },
    Pending: { id: 'Pending', value: 'ค้างอยู่', comment: 'An event or task is pending' },
    PersonalizeColumns: { id: 'PersonalizeColumns', value: 'ปรับแต่งคอลัมน์', comment: 'Customize Columns in a Grid' },
    Plan: { id: 'Plan', value: 'แผน', comment: 'As in type of vacation plan' },
    Platform: { id: 'Platform', value: 'แพลตฟอร์ม', comment: 'The users operating system i.e. mac, windows' },
    Period: { id: 'Period', value: 'รอบระยะเวลา', comment: 'the am/pm portion of a time' },
    PressDown: { id: 'PressDown', value: 'กดลูกศร Down เพื่อเลือกวันที่', comment: 'the audible label for Tooltip about how to operate the date picker' },
    PressShiftF10: { id: 'PressShiftF10', value: 'กด Shift+F10 เพื่อเปิดเมนูเนื้อหา', comment: 'the audible infor for screen readers on how to use a field with a popup menu' },
    Previous: { id: 'Previous', value: 'ก่อนหน้า', comment: 'Previous icon tooltip - moved to previous record' },
    PreviousMonth: { id: 'PreviousMonth', value: 'เดือนก่อนหน้า', comment: 'the label for the button that moves calendar to next/prev' },
    PreviousPage: { id: 'PreviousPage', value: 'หน้าก่อนหน้า', comment: 'Previous Page tooltip' },
    Print: { id: 'Print', value: 'พิมพ์', comment: 'Print tooltip' },
    Range: { id: 'Range', value: 'ขอบเขต', comment: 'Range for tooltip' },
    RecordsPerPage: { id: 'RecordsPerPage', value: '{0} บันทึกต่อหน้า', comment: 'Dropdown allows the user to select how many visible records {} shows select value.' },
    Redo: { id: 'Redo', value: 'ทำซ้ำ', comment: 'Redo tooltip' },
    ReorderRows: { id: 'ReorderRows', value: 'เรียงแถวใหม่', comment: 'Drag and Reorder Grid Rows' },
    Refresh: { id: 'Refresh', value: 'รีเฟรช', comment: 'Refresh tooltip' },
    RequestTimeOff: { id: 'RequestTimeOff', value: 'คำขอหยุดงาน', comment: 'Making a request for time off work.' },
    Required: { id: 'Required', value: 'ต้องระบุ', comment: 'indicates a form field is manditory' },
    Reset: { id: 'Reset', value: 'รีเซ็ต', comment: 'Reset tooltip' },
    ResetDefault: { id: 'ResetDefault', value: 'รีเซ็ตเป็นค่าเริ่มต้น', comment: 'Reset Datagrid Columns, Filter and other Layout' },
    Result: { id: 'Result', value: 'ผลลัพธ์', comment: 'Showing a single result in a List' },
    Results: { id: 'Results', value: 'ผลลัพธ์', comment: 'As in showing N Results (plural) in a List' },
    ResultOf: { id: 'ResultOf', value: '{0} จาก {1} ผลลัพธ์', comment: 'Text Showing current and total number of Result' },
    ResultsOf: { id: 'ResultsOf', value: '{0} จาก {1} ผลลัพธ์', comment: 'Text Showing current and total number of Results' },
    RightAlign: { id: 'RightAlign', value: 'จัดชิดขวา', comment: 'Right Align tooltip' },
    RightAlignText: { id: 'RightAlignText', value: 'จัดชิดขวา', comment: 'Right Align Text tooltip' },
    Right: { id: 'Right', value: 'ขวา', comment: 'Right' },
    Roles: { id: 'Roles', value: 'บทบาท', comment: 'Roles tooltip' },
    RowHeight: { id: 'RowHeight', value: 'ความสูงแถว', comment: 'Describes the Height for Rows in a Data Grid' },
    Ruby: { id: 'Ruby', value: 'ทับทิม', comment: 'Color in our color pallette' },
    RunFilter: { id: 'RunFilter', value: 'เรียกใช้ตัวกรอง', comment: 'Execute the current filter criteria' },
    SameWindow: { id: 'SameWindow', value: 'หน้าต่างเดียวกัน', comment: 'Contents open in the same browser window.' },
    Save: { id: 'Save', value: 'บันทึก', comment: 'Save tooltip' },
    SaveCurrentView: { id: 'SaveCurrentView', value: 'บันทึกมุมมองปัจจุบัน', comment: 'Datagrids contain view sets. This menu option saves them' },
    SavedViews: { id: 'SavedViews', value: 'มุมมองที่บันทึกไว้', comment: 'Label for a list of Views' },
    Schedule: { id: 'Schedule', value: 'ตาราง', comment: 'Shows a schedule view' },
    Seconds: { id: 'Seconds', value: 'วินาที', comment: 'the seconds portion of a time' },
    Search: { id: 'Search', value: 'ค้นหา', comment: 'Search tooltip' },
    SearchColumnName: { id: 'SearchColumnName', value: 'ค้นหาชื่อคอลัมน์', comment: 'Search for a datagrid column by name' },
    SearchFolder: { id: 'SearchFolder', value: 'ค้นหาในโฟลเดอร์', comment: 'Search Folder tooltip' },
    SearchList: { id: 'SearchList', value: 'ค้นหารายการ', comment: 'Search List tooltip' },
    Select: { id: 'Select', value: 'เลือก', comment: 'text describing a select action' },
    SelectDay: { id: 'SelectDay', value: 'เลือกวันที่', comment: 'Select a day in the calendar picker' },
    Selected: { id: 'Selected', value: 'เลือกแล้ว', comment: 'text describing a selected object' },
    SelectAll: { id: 'SelectAll', value: 'เลือกทั้งหมด', comment: 'describes the action of selecting all items available in a list' },
    Send: { id: 'Send', value: 'ส่ง', comment: 'Send tooltip' },
    SetTime: { id: 'SetTime', value: 'ตั้งเวลา', comment: 'button text that inserts time when clicked' },
    Settings: { id: 'Settings', value: 'การตั้งค่า', comment: 'Settings tooltip' },
    Short: { id: 'Short', value: 'สั้น', comment: 'Describes a Shorted Row Height in a grid/list' },
    ShowEvent: { id: 'ShowEvent', value: 'แสดงกิจกรรม', comment: 'Show an event (in a calendar)' },
    ShowFilterRow: { id: 'ShowFilterRow', value: 'แสดงแถวตัวกรอง', comment: 'Toggle a row with filer info above a list' },
    ShowLess: { id: 'ShowLess', value: 'แสดงน้อยลง', comment: 'Show less form content' },
    ShowMore: { id: 'ShowMore', value: 'แสดงมากขึ้น', comment: 'Show more form content' },
    SohoDarkTheme: { id: 'SohoDarkTheme', value: 'Soho มืด', comment: 'The name of an application Theme' },
    SohoLightTheme: { id: 'SohoLightTheme', value: 'Soho สว่าง', comment: 'The name of an application Theme' },
    SohoHighContrastTheme: { id: 'SohoHighContrastTheme', value: 'Soho คอนทราสต์สูง', comment: 'The name of an application Theme' },
    SickTime: { id: 'SickTime', value: 'ระยะเวลาป่วย', comment: 'Time off sick from work' },
    Slate: { id: 'Slate', value: 'กระดานชนวน', comment: 'Color in our color pallette' },
    SlideOf: { id: 'SlideOf', value: 'สไลด์ {0} จาก {1}', comment: 'Slide Text Showing current and total number of slides' },
    SlidesOf: { id: 'SlidesOf', value: 'สไลด์ {0} และ {1} จาก {2}', comment: 'Slides Text Showing current slides and total number of slides' },
    SliderHandle: { id: 'SliderHandle', value: 'จัดการสำหรับ', comment: 'Description of the portion of a Slider control that is focusable and changes its value, followed in code by the name of the control' },
    SliderMaximumHandle: { id: 'SliderMaximumHandle', value: 'ช่วงสูงสุดในการจัดการสำหรับ', comment: 'Describes a maximum value handle in a Range (double slider), followed in code by the name of the control' },
    SliderMinimumHandle: { id: 'SliderMinimumHandle', value: 'ช่วงต่ำสุดในการจัดการสำหรับ', comment: 'Describes a minimum value handle in a Range (double slider), followed in code by the name of the control' },
    SkipToMain: { id: 'SkipToMain', value: 'ข้ามไปยังเนื้อหาหลัก', comment: 'Skip link in header, jumps when clicked on to main area' },
    Status: { id: 'Status', value: 'สถานะ', comment: 'Status of someting thats submitted fx in progress, approved' },
    StartsWith: { id: 'StartsWith', value: 'เริ่มต้นด้วย', comment: 'for condition filtering' },
    StepsCompleted: { id: 'StepsCompleted', value: '{0} จาก {1} ขั้นตอนเสร็จสิ้น', comment: 'steps of a wizard/chart' },
    StrikeThrough: { id: 'StrikeThrough', value: 'ขีดทับ', comment: 'turn on and off strike through text in text editor (like word)' },
    SortAtoZ: { id: 'SortAtoZ', value: 'เรียงลำดับจากน้อยไปมาก', comment: 'Sort A to Z in icons for filtering' },
    SortZtoA: { id: 'SortZtoA', value: 'เรียงลำดับจากมากไปน้อย', comment: 'Sort Z to A in icons for filtering' },
    SortDown: { id: 'SortDown', value: 'เรียงลง', comment: 'Sort Down tooltip' },
    SortUp: { id: 'SortUp', value: 'เรียงขึ้น', comment: 'Sort Up tooltip' },
    Subscript: { id: 'Subscript', value: 'ตัวห้อย', comment: 'Turn on and off Subscript text in text editor (like word)' },
    Subtle: { id: 'Subtle', value: 'อ่อนโยน', comment: 'The title of one of the application themes.' },
    Superscript: { id: 'Superscript', value: 'ตัวยก', comment: 'Turn on and off Superscript text in text editor (like word)' },
    Tabs: { id: 'Tabs', value: 'แท็บ...', comment: 'Used in the Tabs Control\'s more menu, preceeded by a number that describes how many tabs are in the spillover menu' },
    Tack: { id: 'Tack', value: 'ปักหมุด', comment: 'Pin an object' },
    Tall: { id: 'Tall', value: 'สูง', comment: 'Describes a Taller Row Height in a grid/list' },
    Target: { id: 'Target', value: 'เป้าหมาย', comment: 'Label for an input to enter a Target (Url Attribute)' },
    TeamEvent: { id: 'TeamEvent', value: 'กิจกรรมทีม', comment: 'Having an event with a work team' },
    TestLocaleDefaults: { id: 'TestLocaleDefaults', value: 'การทดสอบค่าเริ่มต้นของ Locale', comment: 'Do not translate' },
    TextColor: { id: 'TextColor', value: 'สีข้อความ', comment: 'add or edit text color in the editor' },
    TextDropArea: { id: 'DropArea', value: 'ลากและวางไฟล์เพื่ออัปโหลด', comment: 'text for drop area for advanced fileupload' },
    TextDropAreaWithBrowse: { id: 'TextDropAreaWithBrowse', value: 'ลากแล้ววางหรือ<span class="hyperlink">เลือกไฟล์</span> เพื่ออัปโหลด', comment: 'text for drop area with browse for advanced fileupload' },
    TextBtnCancel: { id: 'TextBtnCancel', value: 'ยกเลิกการอัปโหลดไฟล์นี้', comment: 'text for cancel button for advanced fileupload' },
    TextBtnCloseError: { id: 'TextBtnCloseError', value: 'ปิดข้อผิดพลาดนี้', comment: 'text for error close button for advanced fileupload' },
    TextBtnRemove: { id: 'TextBtnRemove', value: 'ปิดข้อผิดพลาดนี้', comment: 'text for remove button for advanced fileupload' },
    Timer: { id: 'Timer', value: 'ตัวจับเวลา', comment: 'Timer tooltip' },
    To: { id: 'To', value: 'ถึง', comment: 'End of a range (of dates)' },
    Today: { id: 'Today', value: 'วันนี้', comment: 'refering to today on a calendar' },
    ToggleBold: { id: 'ToggleBold', value: 'สลับตัวหนา', comment: 'turn on and off bold in text editor (like word)' },
    ToggleH3: { id: 'ToggleH3', value: 'สลับหัวเรื่อง 3', comment: 'turn on and off heading 3 text' },
    ToggleH4: { id: 'ToggleH4', value: 'สลับหัวเรื่อง 4', comment: 'turn on and off heading 4 text' },
    ToggleItalic: { id: 'ToggleItalic', value: 'สลับอักษรตัวเอียง', comment: 'turn on and off Italic in text editor (like word)' },
    ToggleUnderline: { id: 'ToggleUnderline', value: 'สลับอักษรที่ขีดเส้นใต้', comment: 'turn on and off Underline in text editor (like word)' },
    Toolbar: { id: 'Toolbar', value: 'แถบเครื่องมือ', comment: 'describing the toolbar component' },
    TopAlign: { id: 'TopAlign', value: 'จัดชิดด้านบน', comment: 'Top Align tooltip' },
    Total: { id: 'Total', value: 'รวม', comment: 'Mathematic total of a calculation' },
    Totals: { id: 'Totals', value: 'รวม', comment: 'Mathematic total of a calculation (plural)' },
    TreeCollapse: { id: 'TreeCollapse', value: 'ยุบทรี', comment: 'Tree Collapse tooltip' },
    TreeExpand: { id: 'TreeExpand', value: 'ขยายทรี', comment: 'Tree Expand tooltip' },
    Turquoise: { id: 'Turquoise', value: 'เทอร์ควอยส์', comment: 'Color in our color pallette' },
    TypeToFilter: { id: 'TypeToFilter', value: 'พิมพ์เพื่อกรอง', comment: 'Screen reader hit for screen reader users.' },
    Up: { id: 'Up', value: 'ขึ้น', comment: 'Up tooltip' },
    UpComing: { id: 'UpComing', value: 'ที่กำลังจะถึง', comment: 'List of upcoming things (general)' },
    UpComingEvents: { id: 'UpComingEvents', value: 'กิจกรรมที่กำลังจะถึง', comment: 'List of upcoming calendar events' },
    UpComingTimeOff: { id: 'UpComingTimeOff', value: 'การหยุดงานที่กำลังจะถึง', comment: 'As in time off work' },
    UpliftDarkTheme: { id: 'UpliftDarkTheme', value: 'Uplift มืด', comment: 'The name of an application Theme' },
    UpliftHighContrastTheme: { id: 'UpliftHighContrastTheme', value: 'Uplift คอนทราสต์สูง', comment: 'The name of an application Theme' },
    UpliftLightTheme: { id: 'UpliftLightTheme', value: 'Uplift สว่าง', comment: 'The name of an application Theme' },
    Upload: { id: 'Upload', value: 'อัปโหลด', comment: 'Upload tooltip' },
    UnavailableDate: { id: 'UnavailableDate', value: 'วันที่ไม่พร้อมใช้งาน', comment: 'Unavailable Date Text' },
    Underline: { id: 'Underline', value: 'ขีดเส้นใต้', comment: 'Make text Underlined' },
    Undo: { id: 'Undo', value: 'เลิกทำ', comment: 'Undo tooltip' },
    Unlocked: { id: 'Unlocked', value: 'ปลดล็อกแล้ว', comment: 'Unlocked tooltip' },
    UnorderedList: { id: 'UnorderedList', value: 'แทรก/ลบรายการสัญลักษณ์หัวข้อย่อย', comment: 'Insert an Unordered list in the editor' },
    Unsupported: { id: 'Unsupported', value: 'เนื้อหานี้ไม่พร้อมใช้งาน เนื่องจากเนื้อหาใช้คุณลักษณะที่ไม่ได้รับการรับรองในเวอร์ชันเบราว์เซอร์ปัจจุบันของคุณ', comment: 'Suggesting browser upgrade for missing features.' },
    Url: { id: 'Url', value: 'Url', comment: 'Url tooltip' },
    UseArrow: { id: 'UseArrow', value: '. ใช้ปุ่มลูกศรเพื่อเลือก', comment: 'Instructional comments for screen readers' },
    UseEnter: { id: 'UseEnter', value: '. ใช้ enter หรือลูกศรลงเพื่อค้นหา', comment: 'Instructional comments for screen readers' },
    User: { id: 'User', value: 'ผู้ใช้', comment: 'User tooltip' },
    UserProfile: { id: 'UserProfile', value: 'โปรไฟล์ผู้ใช้', comment: 'User Profile tooltip' },
    Version: { id: 'Version', value: 'เวอร์ชั่น IDS', comment: 'Version of IDS' },
    VerticalMiddleAlign: { id: 'VerticalMiddleAlign', value: 'จัดแนวตรงกลางแนวตั้ง', comment: 'Vertical Align tooltip' },
    Vibrant: { id: 'Vibrant', value: 'มีชีวิตชีวา', comment: 'The title of one of the application themes.' },
    ViewSource: { id: 'ViewSource', value: 'ดูทรัพยากร', comment: 'Toggle the source view in the editor' },
    ViewVisual: { id: 'ViewVisual', value: 'ดูภาพ', comment: 'Toggle the visual view in the editor' },
    Week: { id: 'Week', value: 'สัปดาห์', comment: 'Shows a view of the current weeks events' },
    Year: { id: 'Year', value: 'ปี', comment: 'As in a date year' },
    Yes: { id: 'Yes', value: 'ใช่', comment: 'On a dialog button' }
  }
});
