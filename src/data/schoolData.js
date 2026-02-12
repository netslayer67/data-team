const ROLE_GROUP_ORDER = ['Director', 'Head Unit', 'Staff', 'Teacher', 'SE Teacher', 'Support Staff'];
const STATUS_ORDER = ['Active', 'Probation', 'On Leave'];
const EMPLOYMENT_ORDER = ['Permanent', 'Contract', 'Probation', 'Unknown'];
const UNIT_DISTRIBUTION_ORDER = ['Elementary', 'Junior High', 'Kindergarten', 'RISE', 'SHIELD', 'SAFE', 'COMPASS', 'BRIDGE', 'Directorate'];

const employees = [
    {
        "_id": "emp-001",
        "fullName": "Abdullah",
        "username": "Abdul",
        "roleTitle": "Staff Resources",
        "roleGroup": "Support Staff",
        "employeeId": "10.05.174",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2005-01-31",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779979/DSC04354_rtxlcu.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779979/DSC04354_rtxlcu.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779979/DSC04356_yuir9o.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779979/DSC04358_cyvp5t.jpg"
        ],
        "status": "Active",
        "email": "abdullah@millennia21.id",
        "birthDate": "02-Mar-1982",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "highlights": []
    },
    {
        "_id": "emp-002",
        "fullName": "Abu Bakar Ali",
        "username": "Abu",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "12.02.062",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 7 Helix",
        "building": "Junior High",
        "joinDate": "2002-06-03",
        "status": "Active",
        "email": "abu@millennia21.id",
        "birthDate": "24-Jul-1973",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04452_kod0we.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04452_kod0we.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04453_mgwwze.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04454_gg8fda.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-003",
        "fullName": "Adibah Hana Widjaya",
        "username": "Adibah",
        "roleTitle": "Librarian",
        "roleGroup": "Staff",
        "employeeId": "15.25.821",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Elementary",
        "joinDate": "2025-02-07",
        "status": "Active",
        "email": "adibah.hana@millennia21.id",
        "birthDate": "01-Mar-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780227/DSC09105_qi2rxi.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780227/DSC09105_qi2rxi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780254/DSC09106_idozcy.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780268/DSC09108_cyu2qb.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-004",
        "fullName": "Adiya Herisa",
        "username": "Adiya",
        "roleTitle": "School's Nurse",
        "roleGroup": "Support Staff",
        "employeeId": "15.23.737",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2023-09-04",
        "status": "Active",
        "email": "adiya.herisa@millennia21.id",
        "birthDate": "27-Aug-2005",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779977/DSC04325_hlmmmx.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779977/DSC04325_hlmmmx.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04326_rkwdto.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04327_qrsyzt.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-005",
        "fullName": "Afiyanti Hardiansari",
        "username": "Afi",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.827",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "Kindy Milky Way",
        "building": "Kindergarten",
        "joinDate": "2025-04-08",
        "status": "Active",
        "email": "afiyanti.hardiansari@millennia21.id",
        "birthDate": "25-Apr-1999",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779814/DSC02225_vbjy1k.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779814/DSC02225_vbjy1k.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779814/DSC02227_fadlbc.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779814/DSC02228_fdtyao.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779814/DSC02229_autx78.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-006",
        "fullName": "Ahmad Haikal",
        "username": "Dody",
        "roleTitle": "Head of Operational",
        "roleGroup": "Head Unit",
        "employeeId": "10.17.581",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2017-11-14",
        "status": "Active",
        "email": "dodi@millennia21.id",
        "birthDate": "08-Jan-1984",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04300_nfwvnc.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04300_nfwvnc.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04301_ii5gtg.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04303_khetfs.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-007",
        "fullName": "Alifananda Dhaffa Hanif Musyafa",
        "username": "Dhaffa",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.746",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 9 Messier 87",
        "building": "Junior High",
        "joinDate": "2023-12-23",
        "status": "Active",
        "email": "dhaffa@millennia21.id",
        "birthDate": "04-Aug-1999",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780070/DSC04545_u7rgkg.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780070/DSC04545_u7rgkg.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780070/DSC04546_ocbeye.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780071/DSC04550_1_cv7cgj.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-008",
        "fullName": "Almia Ester Kristiyany Sinabang",
        "username": "Almia",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.21.652",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 1 Centaurus",
        "building": "Elementary",
        "joinDate": "2021-06-28",
        "status": "Active",
        "email": "almia@millennia21.id",
        "birthDate": "29-Apr-1996",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780126/DSC05082_cfqdq2.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780126/DSC05082_cfqdq2.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780126/DSC05083_ovzwmb.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780129/DSC05084_jwymll.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-009",
        "fullName": "Andrean Hadinata",
        "username": "Andre",
        "roleTitle": "Secretary",
        "roleGroup": "Staff",
        "employeeId": "15.25.864",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-10-01",
        "status": "Probation",
        "email": "andre@millennia21.id",
        "birthDate": "10-Mar-1999",
        "religion": "Catholic",
        "gender": "M",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780179/DSC07019_qabwgm.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780179/DSC07019_qabwgm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780181/DSC07020_cjpzxa.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780181/DSC07022_j1x3nl.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-010",
        "fullName": "Anggie Ayu Setya Pradini",
        "username": "Anggie",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.23.712",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 8 Cartwheel",
        "building": "Junior High",
        "joinDate": "2023-07-17",
        "status": "Active",
        "email": "anggie@millennia21.id",
        "birthDate": "31-May-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04472_c3pxen.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04472_c3pxen.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04473_jhqosq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780024/DSC04474_zrnmil.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-011",
        "fullName": "Annisa Fitri Tanjung",
        "username": "Annisa",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.843",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Pinwheel",
        "building": "Elementary",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "annisa@millennia21.id",
        "birthDate": "16-Jan-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1708_zwsh4m.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1708_zwsh4m.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1711_vyqq5y.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1713_zcveif.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-012",
        "fullName": "Ardiansyah",
        "username": "Ardi",
        "roleTitle": "PLH",
        "roleGroup": "Support Staff",
        "employeeId": "10.18.589",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2018-03-01",
        "status": "Active",
        "email": "ardiansyah@millennia21.id",
        "birthDate": "10-Nov-1995",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779980/DSC04367_bxopfi.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779980/DSC04367_bxopfi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779988/DSC04369_lwdpmh.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779988/DSC04370_d2xexs.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779988/DSC04371_fue41n.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-013",
        "fullName": "Ari Wibowo",
        "username": "Ari",
        "roleTitle": "Junior Full Stack Web Developer",
        "roleGroup": "Staff",
        "employeeId": "15.25.869",
        "department": "MAD Lab",
        "unit": "MAD Lab",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2025-09-25",
        "status": "Probation",
        "email": "ari.wibowo@millennia21.id",
        "birthDate": "17-Mar-2001",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780168/DSC07001_d6gl1r.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780168/DSC07001_d6gl1r.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780158/DSC07003_kdnqd6.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780158/DSC07004_b9wjwu.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-014",
        "fullName": "Aria Wisnuwardana",
        "username": "Aria",
        "roleTitle": "Principal of Junior High",
        "roleGroup": "Head Unit",
        "employeeId": "12.06.235",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "",
        "building": "Junior High",
        "joinDate": "2006-03-27",
        "status": "Active",
        "email": "aria@millennia21.id",
        "birthDate": "15-Jun-1983",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04399_u8q5ww.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04399_u8q5ww.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779990/DSC04400_blykg1.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779990/DSC04402_g8rxb0.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779990/DSC04404_ihfeyq.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-015",
        "fullName": "Auliya Hasanatin Suwisto",
        "username": "Alin",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.22.689",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Fireworks",
        "building": "Elementary",
        "joinDate": "2022-10-24",
        "status": "Active",
        "email": "alinsuwisto@millennia21.id",
        "birthDate": "16-Jan-1995",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04604_pyoznl.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04604_pyoznl.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780106/DSC04605_vl6m3b.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780106/DSC04606_mtg4n2.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780106/DSC04607_d8w0oi.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-016",
        "fullName": "Ayunda Primaputri",
        "username": "Ayunda",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.778",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "Kindy Bear Paw",
        "building": "Kindergarten",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "aprimaputri@millennia21.id",
        "birthDate": "29-Oct-1982",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780002/DSC04431_xxwelb.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780002/DSC04431_xxwelb.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780003/DSC04432_kfmwta.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780003/DSC04433_lemgcv.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780003/DSC04434_bjhzvu.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-017",
        "fullName": "Azalia Magdalena Septianti Tambunan",
        "username": "Wina",
        "roleTitle": "School's Psychologist",
        "roleGroup": "Staff",
        "employeeId": "15.25.820",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2025-02-03",
        "status": "Active",
        "email": "wina@millennia21.id",
        "birthDate": "27-Sep-2001",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780198/DSC09099_gocmka.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780198/DSC09099_gocmka.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780198/DSC09101_p4jnol.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780198/DSC09102_vpauyy.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-018",
        "fullName": "Bela Kartika Sari",
        "username": "Bela",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.765",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Fireworks",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "belakartika@millennia21.id",
        "birthDate": "29-Nov-1998",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780090/DSC04595_nu1dkd.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780090/DSC04595_nu1dkd.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780090/DSC04596_h2vzxs.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780092/DSC04597_alqnqm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04598_ec5r83.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04599_xumni5.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-019",
        "fullName": "Berliana Gustina Siregar",
        "username": "Nana",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.828",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Andromeda",
        "building": "Elementary",
        "joinDate": "2025-04-08",
        "status": "Active",
        "email": "nana@millennia21.id",
        "birthDate": "26-Apr-1999",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779813/DSC02215_fqazta.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779813/DSC02215_fqazta.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779813/DSC02216_etruxo.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779814/DSC02217_l21por.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-020",
        "fullName": "Chantika Nur Febryanti",
        "username": "Chaca",
        "roleTitle": "Integral & Math Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.865",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Andromeda",
        "building": "Elementary",
        "joinDate": "2025-09-29",
        "status": "Probation",
        "email": "chaca@millennia21.id",
        "birthDate": "15-Feb-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779855/DSC03805_m5vjq1.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779855/DSC03805_m5vjq1.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-021",
        "fullName": "Danu Irwansyah",
        "username": "Danu",
        "roleTitle": "Driver",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.868",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-09-22",
        "status": "Probation",
        "email": "danu@millennia21.id",
        "birthDate": "15-Dec-1998",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780161/DSC07006_a07vxd.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780161/DSC07006_a07vxd.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780158/DSC07007_ev2znz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780158/DSC07009_jn2bss.jpg"
        ],
        "highlights": [],
        "endDate": "2025-12-22"
    },
    {
        "_id": "emp-022",
        "fullName": "Denis Septian",
        "username": "Denis",
        "roleTitle": "Office Boy",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.874",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2025-10-24",
        "status": "Probation",
        "email": "denis@millennia21.id",
        "birthDate": "24-Sep-2002",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779818/DSC03759_eljdqp.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779818/DSC03759_eljdqp.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779851/DSC03761_aea7bj.jpg"
        ],
        "highlights": [],
        "endDate": "2026-03-22"
    },
    {
        "_id": "emp-023",
        "fullName": "Derry Parmanto",
        "username": "Derry",
        "roleTitle": "Staff Admin",
        "roleGroup": "Staff",
        "employeeId": "12.18.604",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Junior High",
        "joinDate": "2018-11-15",
        "status": "Active",
        "email": "derry@millennia21.id",
        "birthDate": "28-Dec-1989",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04382_bu0xll.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04382_bu0xll.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04390_rfhon7.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04391_jelxws.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-024",
        "fullName": "Devi Agriani",
        "username": "Devi",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.773",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 6 Perseus",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "devi.agriani@millennia21.id",
        "birthDate": "19-Jul-1995",
        "religion": "Catholic",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780054/DSC04520_crulxi.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780054/DSC04520_crulxi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780054/DSC04521_rq4int.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780054/DSC04522_pefvqd.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780054/DSC04524_ezokyk.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780055/DSC04525_pia0p8.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-025",
        "fullName": "Devi Larasati",
        "username": "Laras",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.771",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Fireworks",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "devilarasati@millennia21.id",
        "birthDate": "16-Dec-1997",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04600_wluujm.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04600_wluujm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04601_vkd42b.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780105/DSC04602_konvlz.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-026",
        "fullName": "Dien Islamy",
        "username": "Dien",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.839",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Andromeda",
        "building": "Elementary",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "dien@millennia21.id",
        "birthDate": "11-Jan-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1749_qaujwy.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1749_qaujwy.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1750_efjtc1.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1751_srjcfz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1752_zb0uxg.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-027",
        "fullName": "Dina",
        "username": "Dina",
        "roleTitle": "Office Girl",
        "roleGroup": "Support Staff",
        "employeeId": "10.22.666",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2022-05-25",
        "status": "Active",
        "email": "dina@millennia21.id",
        "birthDate": "14-May-1993",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779886/DSC04310_kd2oai.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779886/DSC04310_kd2oai.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779886/DSC04311_upevtt.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779886/DSC04312_w2mowe.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779886/DSC04313_dfiek4.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-028",
        "fullName": "Dini Meilani Pramesti",
        "username": "Dini",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.767",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Skyrocket",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "dinimeilani@millennia21.id",
        "birthDate": "28-May-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04569_zz3rkt.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04569_zz3rkt.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04570_bu2hxn.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04571_vbt6yr.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-029",
        "fullName": "Diya Pratiwi",
        "username": "Diya",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.21.651",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "Kindy Milky Way",
        "building": "Kindergarten",
        "joinDate": "2021-04-01",
        "status": "Active",
        "email": "diya@millennia21.id",
        "birthDate": "05-Jun-1996",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779999/DSC04418_xff8xc.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779999/DSC04418_xff8xc.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780001/DSC04419_xtiksd.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780000/DSC04420_zg0ku7.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-030",
        "fullName": "Dona",
        "username": "Dona",
        "roleTitle": "Office Girl",
        "roleGroup": "Support Staff",
        "employeeId": "15.24.797",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2024-07-26",
        "status": "Active",
        "email": "dona@millennia21.id",
        "birthDate": "14-May-1993",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779937/DSC04320_kpkhix.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779937/DSC04320_kpkhix.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779977/DSC04321_omlbzu.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779977/DSC04322_vme5by.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-031",
        "fullName": "Fadholi Akbar",
        "username": "Fadholi",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.764",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 5 Spindle",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "akbarfadholi98@millennia21.id",
        "birthDate": "20-Dec-1999",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780027/DSC04485_amt1zm.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780027/DSC04485_amt1zm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780026/DSC04486_wpp27s.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780027/DSC04488_lufrqe.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-032",
        "fullName": "Faisal Nur Hidayat",
        "username": "Faisal",
        "roleTitle": "Head of IT",
        "roleGroup": "Head Unit",
        "employeeId": "15.24.776",
        "department": "MAD Lab",
        "unit": "MAD Lab",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2024-07-15",
        "status": "Active",
        "email": "faisal@millennia21.id",
        "birthDate": "24-Sep-1993",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04617_nadkex.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04617_nadkex.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04618_bt67sc.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04620_qwpnjk.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-033",
        "fullName": "Faqiha Salma Achmada",
        "username": "Fasa",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.831",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 1 Barnard",
        "building": "Elementary",
        "joinDate": "2025-04-24",
        "status": "Active",
        "email": "fasa@millennia21.id",
        "birthDate": "29-Apr-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780071/DSC04547_oywcua.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780071/DSC04547_oywcua.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780071/DSC04550_gsk5nq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780072/DSC04551_n6y1fe.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-034",
        "fullName": "Farhah Alya Nabilah",
        "username": "Aya",
        "roleTitle": "Secretary",
        "roleGroup": "Staff",
        "employeeId": "15.25.841",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2025-07-18",
        "status": "Probation",
        "email": "aya@millennia21.id",
        "birthDate": "02-Nov-2001",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779801/_DSC1775_kwppyd.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779801/_DSC1775_kwppyd.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779801/_DSC1778_ioqdrg.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779801/_DSC1779_zg165n.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-035",
        "fullName": "Fayza Julia Pramesti Hapsari Prayoga",
        "username": "Jo",
        "roleTitle": "Admin Pelangi / Secretary",
        "roleGroup": "Staff",
        "employeeId": "15.25.856",
        "department": "Pelangi",
        "unit": "Pelangi",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2025-08-15",
        "status": "Probation",
        "email": "jo@millennia21.id",
        "birthDate": "31-Jul-2002",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779856/DSC03912_tuzdpm.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779856/DSC03912_tuzdpm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779857/DSC03918_ikajbw.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-036",
        "fullName": "Ferlyna Balqis",
        "username": "Balqis",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.829",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "Kindy Starlight",
        "building": "Kindergarten",
        "joinDate": "2025-04-08",
        "status": "Active",
        "email": "ferlyna.balqis@millennia21.id",
        "birthDate": "27-Apr-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779813/DSC02219_eunt7d.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779813/DSC02219_eunt7d.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779813/DSC02220_le4k5d.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779814/DSC02221_p8y3oi.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-037",
        "fullName": "Fransiska Evasari",
        "username": "Eva",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.21.654",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Topsy Turvy",
        "building": "Elementary",
        "joinDate": "2021-06-28",
        "status": "Active",
        "email": "fransiskaeva@millennia21.id",
        "birthDate": "01-Aug-1997",
        "religion": "Catholic",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780042/DSC04516_pd566m.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780042/DSC04516_pd566m.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780054/DSC04517_wl34ns.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780053/DSC04518_wjq9us.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780054/DSC04519_kt3hcz.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-038",
        "fullName": "Galen Rasendriya",
        "username": "Galen",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.849",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Sombrero",
        "building": "Elementary",
        "joinDate": "2025-07-28",
        "status": "Probation",
        "email": "galen@millennia21.id",
        "birthDate": "12-Jun-2000",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779812/DSC02176_phbqh4.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779812/DSC02176_phbqh4.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779812/DSC02178_kahsck.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779813/DSC02179_lm3yao.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-039",
        "fullName": "Gebby Rika Amdani",
        "username": "Gebby",
        "roleTitle": "Office Girl",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.877",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2025-11-14",
        "status": "Active",
        "email": "gebby@millennia21.id",
        "birthDate": "02-Sep-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779854/DSC03786_znzn46.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779854/DSC03786_znzn46.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779854/DSC03788_mmjuld.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779858/DSC03790_u9fxuy.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-040",
        "fullName": "Gundah Basiswi",
        "username": "Gundah",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.719",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 1 Barnard",
        "building": "Elementary",
        "joinDate": "2023-07-17",
        "status": "Active",
        "email": "gundah@millennia21.id",
        "birthDate": "13-Jul-1988",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780055/DSC04532_vhn7rb.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780055/DSC04532_vhn7rb.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780056/DSC04533_gwomix.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780056/DSC04534_einmea.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-041",
        "fullName": "Hadi",
        "username": "Hadi",
        "roleTitle": "Performing Art Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.837",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "",
        "building": "Elementary",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "hadi@millennia21.id",
        "birthDate": "19-Dec-1995",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779794/_DSC1715_nxh79d.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779794/_DSC1715_nxh79d.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779794/_DSC1718_en9xng.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779797/_DSC1719_swfwht.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779795/_DSC1720_eqknd4.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-042",
        "fullName": "Hana Nuzula Fajria",
        "username": "Hana",
        "roleTitle": "Head of Pelangi",
        "roleGroup": "Head Unit",
        "employeeId": "14.19.626",
        "department": "Pelangi",
        "unit": "Pelangi",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2019-09-02",
        "status": "Active",
        "email": "hana.fajria@millennia21.id",
        "birthDate": "19-Aug-1996",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780072/DSC04551_1_l0frjv.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780072/DSC04551_1_l0frjv.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780072/DSC04552_w4vh6u.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780072/DSC04553_ltgyuz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780073/DSC04554_xbhpnc.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-043",
        "fullName": "Himawan Rizky Syaputra",
        "username": "Himawan",
        "roleTitle": "Coding Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.840",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "himawan@millennia21.id",
        "birthDate": "31-Mar-1999",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779795/_DSC1722_bzpwv8.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779795/_DSC1722_bzpwv8.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779795/_DSC1723_btothk.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779796/_DSC1725_ygszgt.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-044",
        "fullName": "Ian Ahmad Fauzi",
        "username": "Ian",
        "roleTitle": "Staff Finance",
        "roleGroup": "Staff",
        "employeeId": "15.25.863",
        "department": "Finance",
        "unit": "Finance",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-10-08",
        "status": "Probation",
        "email": "ian.ahmad@millennia21.id",
        "birthDate": "24-Jun-1989",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779853/DSC03777_bqa98v.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779853/DSC03777_bqa98v.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779853/DSC03778_sxo0wk.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779854/DSC03782_jf4sef.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-045",
        "fullName": "Iis Asifah",
        "username": "Iis",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.842",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Pinwheel",
        "building": "Elementary",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "iis@millennia21.id",
        "birthDate": "03-Sep-2001",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1762_kaodgm.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1762_kaodgm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1763_f7ngeg.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1764_rjilff.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1766_ampjkk.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-046",
        "fullName": "Ika Rahayu",
        "username": "Ika",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.836",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Andromeda",
        "building": "Elementary",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "ikarahayu@millennia21.id",
        "birthDate": "17-Mar-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779797/_DSC1742_hymbiz.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779797/_DSC1742_hymbiz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779797/_DSC1743_onlk6a.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779797/_DSC1744_nrixoh.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779797/_DSC1747_apibej.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-047",
        "fullName": "Irawan",
        "username": "Iwan",
        "roleTitle": "Driver",
        "roleGroup": "Support Staff",
        "employeeId": "10.17.557",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2017-03-02",
        "status": "Active",
        "email": "irawan@millennia21.id",
        "birthDate": "10-Mar-1977",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779876/DSC04289_i7efag.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779876/DSC04289_i7efag.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779877/DSC04290_qqayzy.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779876/DSC04291_csfufc.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-048",
        "fullName": "Khairul Anwar",
        "username": "Irul",
        "roleTitle": "Office Boy",
        "roleGroup": "Support Staff",
        "employeeId": "10.19.616",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2019-06-17",
        "status": "Active",
        "email": "khairul@millennia21.id",
        "birthDate": "01-May-1986",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779886/DSC04314_ls1omf.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779886/DSC04314_ls1omf.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779887/DSC04315_u0qzrq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779887/DSC04316_ljltxu.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-049",
        "fullName": "Kholida Widyawati",
        "username": "Kholi",
        "roleTitle": "Principal of Elementary",
        "roleGroup": "Head Unit",
        "employeeId": "14.19.612",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "",
        "building": "Elementary",
        "joinDate": "2019-02-25",
        "status": "Active",
        "email": "kholida@millennia21.id",
        "birthDate": "27-Mar-1991",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779988/DSC04373_fsyo9a.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779988/DSC04373_fsyo9a.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779988/DSC04376_twy30a.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779988/DSC04377_q18fcq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04379_akdpjw.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779989/DSC04380_nadqmu.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-050",
        "fullName": "Krisalyssa Esna Rehulina Tarigan",
        "username": "Alys",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.713",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 1 Barnard",
        "building": "Elementary",
        "joinDate": "2023-07-17",
        "status": "Active",
        "email": "alys@millennia21.id",
        "birthDate": "18-Jul-2000",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04577_y1fyax.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04577_y1fyax.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04578_xvtl0m.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04579_t5vhee.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-051",
        "fullName": "Kurnia Sandi",
        "username": "Sandi",
        "roleTitle": "Office Boy",
        "roleGroup": "Support Staff",
        "employeeId": "10.18.600",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2018-09-24",
        "status": "Active",
        "email": "sandi@millennia21.id",
        "birthDate": "07-Dec-1996",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779877/DSC04295_gv8qvi.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779877/DSC04295_gv8qvi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779878/DSC04296_ht5kgh.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779884/DSC04298_hmttjg.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-052",
        "fullName": "Latifah Nur Restiningtyas",
        "username": "Latifah",
        "roleTitle": "Principal of Kindergarten",
        "roleGroup": "Head Unit",
        "employeeId": "14.22.674",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2022-07-18",
        "status": "Active",
        "email": "latifah@millennia21.id",
        "birthDate": "07-Oct-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780012/DSC04441_dga4ok.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780012/DSC04441_dga4ok.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780012/DSC04442_ewuijm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780012/DSC04445_gxflvy.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04447_dwxayv.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-053",
        "fullName": "Mahrukh Bashir",
        "username": "Mahrukh",
        "roleTitle": "Academic Director",
        "roleGroup": "Director",
        "employeeId": "12.10.374",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Junior High",
        "joinDate": "2009-10-01",
        "status": "Active",
        "email": "mahrukh@millennia21.id",
        "birthDate": "16-Apr-1974",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#7c3aed",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780125/DSC05063_gndyal.jpg",
        "photos": [
            // "https://res.cloudinary.com/deldcwiji/image/upload/v1770780125/DSC05063_gndyal.jpg",
            // "https://res.cloudinary.com/deldcwiji/image/upload/v1770780125/DSC05064_awyira.jpg",
            // "https://res.cloudinary.com/deldcwiji/image/upload/v1770780125/DSC05065_fzburv.jpg",
            // "https://res.cloudinary.com/deldcwiji/image/upload/v1770780125/DSC05066_b3i8zm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770796935/pass_photo_720_phosje.png"
        ],
        "highlights": []
    },
    {
        "_id": "emp-054",
        "fullName": "Maria Rosa Apriliana Jaftoran",
        "username": "Maria",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.22.671",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Skyrocket",
        "building": "Elementary",
        "joinDate": "2022-07-18",
        "status": "Active",
        "email": "maria@millennia21.id",
        "birthDate": "24-Apr-1997",
        "religion": "Catholic",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780073/DSC04556_azvojl.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780073/DSC04556_azvojl.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780073/DSC04557_c2v8cd.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780073/DSC04558_wpiarl.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-055",
        "fullName": "Maulida Yunita",
        "username": "Nita",
        "roleTitle": "Librarian",
        "roleGroup": "Staff",
        "employeeId": "15.25.859",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-08-25",
        "status": "Probation",
        "email": "maulida.yunita@millennia21.id",
        "birthDate": "24-Jun-1998",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779856/DSC04167_ng2ph1.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779856/DSC04167_ng2ph1.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779862/DSC04168_lpgsfn.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779858/DSC04169_rkuzrs.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-056",
        "fullName": "Muhammad Farhan Sholeh Ramadhika",
        "username": "Farhan",
        "roleTitle": "Design & Social Media",
        "roleGroup": "Staff",
        "employeeId": "15.25.860",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Elementary",
        "joinDate": "2025-08-25",
        "status": "Probation",
        "email": "muhammad.farhan@millennia21.id",
        "birthDate": "12-Nov-2001",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779859/DSC04177_vidlyi.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779859/DSC04177_vidlyi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779859/DSC04178_msxl0n.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779860/DSC04181_dyyttr.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-057",
        "fullName": "Muhammad Fathan Qorib",
        "username": "Fathan",
        "roleTitle": "Office Boy",
        "roleGroup": "Support Staff",
        "employeeId": "15.24.756",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2024-02-23",
        "status": "Active",
        "email": "fathan.qalbi@millennia21.id",
        "birthDate": "17-Feb-2001",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04328_lacbfz.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04328_lacbfz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04330_bpj9eg.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04331_iedz2x.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-058",
        "fullName": "Muhammad Gibran Al Wali",
        "username": "Awal / Gibran",
        "roleTitle": "PLH",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.845",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-07-18",
        "status": "Probation",
        "email": "awal@millennia21.id",
        "birthDate": "29-Jan-2006",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779802/_DSC1788_apkcas.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779802/_DSC1788_apkcas.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779802/_DSC1790_j861sx.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779803/_DSC1791_uezph2.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-059",
        "fullName": "Muhammad Rayhan Ananta",
        "username": "Ananta",
        "roleTitle": "IT Support",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.838",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "ananta@millennia21.id",
        "birthDate": "24-Aug-2002",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779796/_DSC1737_kylmuj.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779796/_DSC1737_kylmuj.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779796/_DSC1741_retcxn.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-060",
        "fullName": "Mukron",
        "username": "Mukron",
        "roleTitle": "PLH",
        "roleGroup": "Support Staff",
        "employeeId": "15.23.734",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2023-08-28",
        "status": "Active",
        "email": "mukron@millennia21.id",
        "birthDate": "08-Sep-1989",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04332_fdu6l4.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779978/DSC04332_fdu6l4.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779979/DSC04333_ptan7m.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779979/DSC04335_pj1roe.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-061",
        "fullName": "Nadia",
        "username": "Nadia",
        "roleTitle": "English Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.816",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 7 Helix",
        "building": "Junior High",
        "joinDate": "2024-11-18",
        "status": "Active",
        "email": "nadiamws@millennia21.id",
        "birthDate": "10-Nov-1991",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780196/DSC09093_plxdyx.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780196/DSC09093_plxdyx.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780197/DSC09094_qwgwr1.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780197/DSC09098_urqzg2.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-062",
        "fullName": "Najmi Silmi Mafaza",
        "username": "Sisil",
        "roleTitle": "Math Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.866",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 8 Cartwheel",
        "building": "Junior High",
        "joinDate": "2025-10-20",
        "status": "Probation",
        "email": "sisil@millennia21.id",
        "birthDate": "27-Jan-2002",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779855/DSC03794_lxhhug.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779855/DSC03794_lxhhug.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779856/DSC03797_tlvxu9.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-063",
        "fullName": "Nanda Citra Ryani",
        "username": "Nanda",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "10.19.610",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "Kindy Starlight",
        "building": "Kindergarten",
        "joinDate": "2019-04-01",
        "status": "Active",
        "email": "nanda@millennia21.id",
        "birthDate": "18-Jan-1996",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780003/DSC04435_softlp.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780003/DSC04435_softlp.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780003/DSC04436_e4ie7w.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780011/DSC04437_n4lnyx.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780011/DSC04438_pxirhi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780012/DSC04439_ymrjgh.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780012/DSC04440_koyq5y.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-064",
        "fullName": "Nathasya Christine Prabowo",
        "username": "Thasya",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.721",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Pinwheel",
        "building": "Elementary",
        "joinDate": "2023-07-17",
        "status": "Active",
        "email": "nathasya@millennia21.id",
        "birthDate": "06-May-1997",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780028/DSC04492_fpanwn.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780028/DSC04492_fpanwn.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780037/DSC04493_yhkmql.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780038/DSC04494_f6ucxf.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780037/DSC04495_uj6khg.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-065",
        "fullName": "Nayandra Hasan Sudra",
        "username": "Hasan",
        "roleTitle": "Makerspace Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.871",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-10-01",
        "status": "Probation",
        "email": "nayandra@millennia21.id",
        "birthDate": "09-Jul-2002",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780126/DSC06992_brcqoz.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780126/DSC06992_brcqoz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780127/DSC06993_udkgo0.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780127/DSC06995_oubfkl.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-066",
        "fullName": "Nazmi Kusumawantari",
        "username": "Mima",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.814",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 5 Spindle",
        "building": "Elementary",
        "joinDate": "2024-11-06",
        "status": "Active",
        "email": "kusumawantari@millennia21.id",
        "birthDate": "15-Dec-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779811/DSC00846_bzjer3.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779811/DSC00846_bzjer3.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779812/DSC00847_sl3n15.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779812/DSC00848_lzrpdu.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-067",
        "fullName": "Ni Made Ayu Juwitasari",
        "username": "Made",
        "roleTitle": "Secretary",
        "roleGroup": "Staff",
        "employeeId": "15.24.794",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "",
        "building": "Elementary",
        "joinDate": "2024-07-29",
        "status": "Active",
        "email": "made@millennia21.id",
        "birthDate": "14-Jun-2000",
        "religion": "Hindu",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780123/DSC05047_nfjhca.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780123/DSC05047_nfjhca.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780124/DSC05048_ktozoa.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780124/DSC05050_ofogu4.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-068",
        "fullName": "Novan Syaiful Rahman",
        "username": "Novan",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.835",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 7 Helix",
        "building": "Junior High",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "novan@millennia21.id",
        "birthDate": "28-Nov-1999",
        "religion": "Islam",
        "gender": "M",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1767_jsjmsw.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779800/_DSC1769_deg6wi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779800/_DSC1770_wyfzlz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779800/_DSC1771_kqgxrc.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779801/_DSC1772_avmwxu.jpg"
        ],
        "avatarColor": "#0d9488",
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-069",
        "fullName": "Novia Syifaputri Ramadhan",
        "username": "Novia",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.850",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 1 Centaurus",
        "building": "Elementary",
        "joinDate": "2025-08-11",
        "status": "Probation",
        "email": "novia@millennia21.id",
        "birthDate": "29-Nov-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779861/DSC04186_gqcuyb.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779861/DSC04186_gqcuyb.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779860/DSC04187_spacp3.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779861/DSC04188_gbxc7r.jpg",

        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-070",
        "fullName": "Nur Muhamad Ismail",
        "username": "Ismail",
        "roleTitle": "Staff C.A.R.E",
        "roleGroup": "Staff",
        "employeeId": "15.25.858",
        "department": "CARE",
        "unit": "CARE",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2025-09-08",
        "status": "Probation",
        "email": "ismail@millennia21.id",
        "birthDate": "03-Nov-2001",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780159/DSC07011_lhcvof.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780159/DSC07011_lhcvof.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780159/DSC07012_ddk0pr.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780192/DSC07013_prcing.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-071",
        "fullName": "Nurul Widyaningtyas Agustin",
        "username": "Widya",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "16.24.806",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "Kindy Bear Paw",
        "building": "Kindergarten",
        "joinDate": "2024-09-03",
        "status": "Active",
        "email": "widya@millennia21.id",
        "birthDate": "17-Aug-1992",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780183/DSC07609_nf3azt.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780183/DSC07609_nf3azt.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780207/DSC07610_mm0yxr.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780198/DSC07611_hfisf6.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780195/DSC07612_dywvae.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-072",
        "fullName": "Pipiet Anggreiny",
        "username": "Pipiet",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.711",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 6 Perseus",
        "building": "Elementary",
        "joinDate": "2023-07-17",
        "status": "Active",
        "email": "pipiet@millennia21.id",
        "birthDate": "21-Jan-1986",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780055/DSC04526_oln5cn.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780055/DSC04526_oln5cn.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780055/DSC04529_tezh7f.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780056/DSC04530_jd1api.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780055/DSC04531_ib8rt7.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-073",
        "fullName": "Pricilla Cecil Leander",
        "username": "Cecil",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.730",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Sombrero",
        "building": "Elementary",
        "joinDate": "2023-08-21",
        "status": "Active",
        "email": "cecil@millennia21.id",
        "birthDate": "05-May-2002",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780057/DSC04535_vzhbge.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780057/DSC04535_vzhbge.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780056/DSC04536_ac7hf7.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-074",
        "fullName": "Prisy Dewanti",
        "username": "Prisy",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.25.834",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Topsy Turvy",
        "building": "Elementary",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "prisy@millennia21.id",
        "birthDate": "29-Apr-2001",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1728_t6s9pf.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1728_t6s9pf.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1729_clvkpv.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779793/_DSC1730_xtdmsw.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779795/_DSC1731_krhc0u.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779796/_DSC1732_d2rfhz.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-075",
        "fullName": "Putri Fitriyani",
        "username": "Putri",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.22.672",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Andromeda",
        "building": "Elementary",
        "joinDate": "2022-07-18",
        "status": "Active",
        "email": "putri.fitriyani@millennia21.id",
        "birthDate": "10-Feb-1997",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780039/DSC04505_oeg1d8.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780039/DSC04505_oeg1d8.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780040/DSC04506_x2lmew.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780041/DSC04507_u8tncs.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780042/DSC04508_qgtdvd.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-076",
        "fullName": "Raditya Saputra",
        "username": "Radit",
        "roleTitle": "Office Boy",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.873",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2025-10-20",
        "status": "Probation",
        "email": "radit@millennia21.id",
        "birthDate": "25-Apr-2006",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779851/DSC03771_iiroao.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779851/DSC03771_iiroao.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779851/DSC03774_t8e7ix.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779852/DSC03775_spmsbo.jpg"
        ],
        "highlights": [],
        "endDate": "2026-01-20"
    },
    {
        "_id": "emp-077",
        "fullName": "Raisa Ramadhani",
        "username": "Raisa",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.844",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Sombrero",
        "building": "Elementary",
        "joinDate": "2025-07-14",
        "status": "Probation",
        "email": "raisa@millennia21.id",
        "birthDate": "08-Mar-1992",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1753_hafyxw.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1753_hafyxw.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779798/_DSC1755_fv6nau.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1757_oyiuhb.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779799/_DSC1760_cktbi1.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-078",
        "fullName": "Ratna Merlangen",
        "username": "Ratna",
        "roleTitle": "Director Secretary",
        "roleGroup": "Staff",
        "employeeId": "10.23.704",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Junior High",
        "joinDate": "2023-03-06",
        "status": "Active",
        "email": "ratna@millennia21.id",
        "birthDate": "05-Nov-1991",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04277_cigljv.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04277_cigljv.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04278_ifpgad.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04280_ywp41r.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-079",
        "fullName": "Restia Widiasari",
        "username": "Echi",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "15.24.804",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Skyrocket",
        "building": "Elementary",
        "joinDate": "2024-09-02",
        "status": "Active",
        "email": "restia.widiasari@millennia21.id",
        "birthDate": "03-Jun-1998",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780196/DSC07613_rbj9l6.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780196/DSC07613_rbj9l6.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780196/DSC07614_vlbkik.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780197/DSC07616_fzefyc.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-080",
        "fullName": "Reza Rizky Prayudha",
        "username": "Reza",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.768",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Fireworks",
        "building": "Elementary",
        "joinDate": "2024-07-15",
        "status": "Active",
        "email": "rezarizky@millennia21.id",
        "birthDate": "19-Nov-1999",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780106/DSC04608_lnlysh.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780106/DSC04608_lnlysh.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780106/DSC04609_npr2ne.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04611_kn3ttk.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-081",
        "fullName": "Rifqi Satria Permana",
        "username": "Rifqi",
        "roleTitle": "Physical Education Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.809",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 8 Cartwheel",
        "building": "Junior High",
        "joinDate": "2024-10-07",
        "status": "Active",
        "email": "rifqi.satria@millennia21.id",
        "birthDate": "19-Apr-1999",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780265/DSC09116_ewoepz.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780265/DSC09116_ewoepz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780267/DSC09117_hk0moh.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-082",
        "fullName": "Rike Rahmawati",
        "username": "Rike",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.754",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Topsy Turvy",
        "building": "Elementary",
        "joinDate": "2024-01-23",
        "status": "Active",
        "email": "rike@millennia21.id",
        "birthDate": "09-May-2001",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04582_xfrcgo.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04582_xfrcgo.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04583_ulzyr2.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780089/DSC04584_z25cbh.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780090/DSC04585_qvak4w.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-083",
        "fullName": "Risma Ayu Angelita",
        "username": "Risma",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.774",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Pinwheel",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "risma.angelita@millennia21.id",
        "birthDate": "21-Sep-1998",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780039/DSC04509_awvx6r.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780039/DSC04509_awvx6r.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780040/DSC04510_sd4pgj.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780041/DSC04511_xu2p5p.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-084",
        "fullName": "Risma Galuh Pitaloka Fahdin",
        "username": "Galuh",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.851",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 4 Topsy Turvy",
        "building": "Elementary",
        "joinDate": "2025-08-11",
        "status": "Probation",
        "email": "risma.galuh@millennia21.id",
        "birthDate": "02-Sep-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779859/DSC04172_ynurls.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779859/DSC04172_ynurls.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779858/DSC04173_dqm111.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779858/DSC04174_q7afu0.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-085",
        "fullName": "Rizki Amalia Fatikhah",
        "username": "Kiki",
        "roleTitle": "Training Development",
        "roleGroup": "Staff",
        "employeeId": "15.25.862",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "",
        "joinDate": "2025-09-08",
        "status": "Probation",
        "email": "kiki@millennia21.id",
        "birthDate": "05-Dec-1994",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-086",
        "fullName": "Rizki Nurul Hayati",
        "username": "Kiki",
        "roleTitle": "Science Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.736",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 8 Cartwheel",
        "building": "Junior High",
        "joinDate": "2023-09-04",
        "status": "Active",
        "email": "rizkinurul@millennia21.id",
        "birthDate": "24-Jul-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04456_dqwq6i.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04456_dqwq6i.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780013/DSC04457_cc9dzj.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780014/DSC04458_lpx75d.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-087",
        "fullName": "Robby Anggara",
        "username": "Robby",
        "roleTitle": "Office Boy",
        "roleGroup": "Support Staff",
        "employeeId": "15.24.762",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Elementary",
        "joinDate": "2024-06-19",
        "status": "Active",
        "email": "robby@millennia21.id",
        "birthDate": "03-Dec-1990",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04307_pjkwiz.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04307_pjkwiz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04308_t8deob.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779885/DSC04309_yzhp8o.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-088",
        "fullName": "Robby Noer Abjuny",
        "username": "Robby",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.25.861",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 5 Spindle",
        "building": "Elementary",
        "joinDate": "2025-09-08",
        "status": "Probation",
        "email": "robby.noer@millennia21.id",
        "birthDate": "12-Jun-1992",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780184/DSC07015_lfmxee.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780184/DSC07015_lfmxee.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780179/DSC07016_jtruh6.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780179/DSC07017_nwvvhx.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-089",
        "fullName": "Robiatul Adawiah",
        "username": "Lia",
        "roleTitle": "Office Girl",
        "roleGroup": "Support Staff",
        "employeeId": "15.23.723",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2023-07-10",
        "status": "Active",
        "email": "robiatul@millennia21.id",
        "birthDate": "10-May-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779887/DSC04317_jikvgr.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779887/DSC04317_jikvgr.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779888/DSC04318_qqip1w.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779908/DSC04319_cshigf.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-090",
        "fullName": "Rohmatulloh",
        "username": "Roy",
        "roleTitle": "Office Boy",
        "roleGroup": "Support Staff",
        "employeeId": "15.23.707",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2023-04-03",
        "status": "Active",
        "email": "rohmatulloh@millennia21.id",
        "birthDate": "30-Jun-1991",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04285_theaq4.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04285_theaq4.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04287_ksvs8v.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779876/DSC04288_wyaxer.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-091",
        "fullName": "Romasta Oryza Sativa Siagian",
        "username": "Tata",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.22.673",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 1 Barnard",
        "building": "Elementary",
        "joinDate": "2022-07-18",
        "status": "Active",
        "email": "roma@millennia21.id",
        "birthDate": "19-Jul-1997",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780037/DSC04500_i5wiyx.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780037/DSC04500_i5wiyx.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780038/DSC04501_wkdodm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780038/DSC04502_qadhqm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780039/DSC04503_sl6lys.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780039/DSC04504_tvc4pm.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-092",
        "fullName": "Salsabila Dhiyaussyifa Laela",
        "username": "Sabil",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.24.770",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 3 Sombrero",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "salsabiladhiyaussyifa@millennia21.id",
        "birthDate": "06-May-1998",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780057/DSC04537_vwzyqu.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780057/DSC04537_vwzyqu.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780070/DSC04538_cmeayl.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780070/DSC04539_kaeyuw.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-093",
        "fullName": "Sarah Yuliana",
        "username": "Sarah",
        "roleTitle": "Head of Finance",
        "roleGroup": "Head Unit",
        "employeeId": "10.20.636",
        "department": "Finance",
        "unit": "Finance",
        "className": "",
        "building": "Junior High",
        "joinDate": "2020-06-24",
        "status": "Active",
        "email": "sarahyuliana@millennia21.id",
        "birthDate": "05-Jul-1994",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779861/DSC04268_yck3cm.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779861/DSC04268_yck3cm.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779874/DSC04270_e7fyfg.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779875/DSC04275_pm0s5n.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-094",
        "fullName": "Sayed Jilliyan",
        "username": "Jilliyan",
        "roleTitle": "Junior Full Stack Web Developer",
        "roleGroup": "Staff",
        "employeeId": "15.25.870",
        "department": "MAD Lab",
        "unit": "MAD Lab",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2025-09-25",
        "status": "Probation",
        "email": "sayed.jilliyan@millennia21.id",
        "birthDate": "03-Jun-2003",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780128/DSC06997_aa5k7e.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780128/DSC06997_aa5k7e.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780127/DSC06998_eoqxix.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780128/DSC06999_r9lowx.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-095",
        "fullName": "Shahrani Fatimah Azzahrah",
        "username": "Rain",
        "roleTitle": "Head of C.A.R.E",
        "roleGroup": "Head Unit",
        "employeeId": "15.24.805",
        "department": "CARE",
        "unit": "CARE",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2024-09-02",
        "status": "Active",
        "email": "rain@millennia21.id",
        "birthDate": "12-Sep-2002",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0284c7",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780181/DSC07560_xbwicn.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780181/DSC07560_xbwicn.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780182/DSC07561_ntmtjc.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780183/DSC07563_dvnbxa.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-096",
        "fullName": "Susantika Nilasari",
        "username": "Nila",
        "roleTitle": "Staff CRM",
        "roleGroup": "Staff",
        "employeeId": "15.24.813",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Junior High",
        "joinDate": "2024-11-01",
        "status": "Active",
        "email": "susantika@millennia21.id",
        "birthDate": "15-Nov-1985",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779803/DSC00283_aizhuj.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779803/DSC00283_aizhuj.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779803/DSC00285_chdubi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779811/DSC00286_y0wvuy.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-097",
        "fullName": "Tiastiningrum Nugrahanti",
        "username": "Tyas",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.23.732",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 9 Messier 87",
        "building": "Junior High",
        "joinDate": "2023-08-21",
        "status": "Active",
        "email": "tiastiningrum@millennia21.id",
        "birthDate": "04-Aug-1998",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04475_jpka4b.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04475_jpka4b.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04476_f3yhaq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04478_wnosgi.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-098",
        "fullName": "Tien Hadiningsih",
        "username": "Hanny",
        "roleTitle": "Staff CRM",
        "roleGroup": "Staff",
        "employeeId": "12.15.512",
        "department": "Directorate",
        "unit": "Directorate",
        "className": "",
        "building": "Junior High",
        "joinDate": "2015-07-27",
        "status": "Active",
        "email": "hanny@millennia21.id",
        "birthDate": "19-May-1979",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0ea5e9",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04624_lqsskv.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04624_lqsskv.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780107/DSC04626_k63vzw.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780123/DSC04627_deqa48.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-099",
        "fullName": "Tri Ayu Lestari",
        "username": "Ayu",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.775",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 5 Spindle",
        "building": "Elementary",
        "joinDate": "2024-07-15",
        "status": "Active",
        "email": "triayulestari@millennia21.id",
        "birthDate": "31-Oct-1992",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780041/DSC04512_xleag9.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780041/DSC04512_xleag9.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780041/DSC04513_ulinwq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780041/DSC04515_se2lvk.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-100",
        "fullName": "Tria Fadilla",
        "username": "Tria",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.769",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 2 Skyrocket",
        "building": "Elementary",
        "joinDate": "2024-06-24",
        "status": "Active",
        "email": "triafadilla@millennia21.id",
        "birthDate": "06-Jun-2000",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780073/DSC04559_p1gvxe.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780073/DSC04559_p1gvxe.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780074/DSC04560_jug7yl.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780074/DSC04561_devwzv.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780087/DSC04562_hbc8ih.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-101",
        "fullName": "Udom Anatapong",
        "username": "Udom",
        "roleTitle": "Driver",
        "roleGroup": "Support Staff",
        "employeeId": "10.17.575",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2017-09-06",
        "status": "Active",
        "email": "udom@millennia21.id",
        "birthDate": "11-Apr-1977",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779876/DSC04292_oyg6dt.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779876/DSC04292_oyg6dt.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779877/DSC04293_c9yft0.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779877/DSC04294_raibvu.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-102",
        "fullName": "Usep Saefurohman",
        "username": "Usep",
        "roleTitle": "Driver",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.848",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-07-17",
        "status": "Probation",
        "email": "usep@millennia21.id",
        "birthDate": "12-Jul-1993",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779802/_DSC1781_ejjknw.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779802/_DSC1781_ejjknw.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779802/_DSC1783_nrh9fy.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779802/_DSC1784_ghpelq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779803/_DSC1787_a8ahgl.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-103",
        "fullName": "Vicki Aprinando",
        "username": "Nando",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.799",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 9 Messier 87",
        "building": "Junior High",
        "joinDate": "2024-08-02",
        "status": "Active",
        "email": "vickiaprinando@millennia21.id",
        "birthDate": "27-Apr-1988",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780125/DSC05044_w9xr61.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780125/DSC05044_w9xr61.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780123/DSC05045_fmulsa.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780123/DSC05046_srb223.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-104",
        "fullName": "Vinka Erawati",
        "username": "Vinka",
        "roleTitle": "Special Education Teacher",
        "roleGroup": "SE Teacher",
        "employeeId": "14.19.621",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2019-07-09",
        "status": "Active",
        "email": "vinka@millennia21.id",
        "birthDate": "08-Sep-1996",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0d9488",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780000/DSC04425_qadflz.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780000/DSC04425_qadflz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780001/DSC04426_y9htiy.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780001/DSC04427_ntwdob.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780001/DSC04428_bxm2qf.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780002/DSC04430_kkvs6j.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-105",
        "fullName": "Wahyu Ramadhan",
        "username": "Wahyu",
        "roleTitle": "PLH",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.872",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Junior High",
        "joinDate": "2025-10-20",
        "status": "Probation",
        "email": "wahyu@millennia21.id",
        "birthDate": "24-Nov-2003",
        "religion": "Islam",
        "gender": "M",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779854/DSC03765_jtven3.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779854/DSC03765_jtven3.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779851/DSC03767_urgxly.jpg"
        ],
        "highlights": [],
        "endDate": "2026-01-20"
    },
    {
        "_id": "emp-106",
        "fullName": "Yeti",
        "username": "Yeti",
        "roleTitle": "Office Girl",
        "roleGroup": "Support Staff",
        "employeeId": "15.25.867",
        "department": "Operational",
        "unit": "Operational",
        "className": "",
        "building": "Kindergarten",
        "joinDate": "2025-09-18",
        "status": "Probation",
        "email": "yeti@millennia21.id",
        "birthDate": "03-Feb-1999",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#64748b",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780180/DSC07032_mnn6ix.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780180/DSC07032_mnn6ix.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780181/DSC07034_hwoil6.jpg"
        ],
        "highlights": [],
        "endDate": "2025-12-22"
    },
    {
        "_id": "emp-107",
        "fullName": "Yohana Setia Risli",
        "username": "Yoh/Yohana",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.702",
        "department": "Kindergarten",
        "unit": "Kindergarten",
        "className": "Kindy Starlight",
        "building": "Kindergarten",
        "joinDate": "2023-02-20",
        "status": "Active",
        "email": "yohana@millennia21.id",
        "birthDate": "22-Jul-1999",
        "religion": "Christian",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770779991/DSC04415_vdstpz.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779991/DSC04415_vdstpz.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779997/DSC04416_pl3c9q.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770779999/DSC04417_lhny9e.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-108",
        "fullName": "Yosafat Imanuel Parlindungan",
        "username": "Yosa",
        "roleTitle": "Music Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.24.753",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 7 Helix",
        "building": "Junior High",
        "joinDate": "2024-01-23",
        "status": "Active",
        "email": "yosafat@millennia21.id",
        "birthDate": "23-May-2000",
        "religion": "Christian",
        "gender": "M",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780026/DSC04479_jt1adi.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780026/DSC04479_jt1adi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780025/DSC04480_cz3sos.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780026/DSC04481_rpnqcw.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780028/DSC04482_gaqgqi.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780027/DSC04483_hzijbq.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780026/DSC04484_bikcrk.jpg"
        ],
        "highlights": [],
        "endDate": "2026-06-22"
    },
    {
        "_id": "emp-109",
        "fullName": "Zavier Cloudya Mashareen",
        "username": "Oudy",
        "roleTitle": "Homeroom Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.22.687",
        "department": "Elementary",
        "unit": "Elementary",
        "className": "Grade 1 Centaurus",
        "building": "Elementary",
        "joinDate": "2022-10-17",
        "status": "Active",
        "email": "oudy@millennia21.id",
        "birthDate": "18-Sep-1994",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04574_hxrkfk.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04574_hxrkfk.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04575_sfjuiy.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780088/DSC04576_hkrvei.jpg"
        ],
        "highlights": []
    },
    {
        "_id": "emp-110",
        "fullName": "Zolla Firmalia Rossa",
        "username": "Zolla",
        "roleTitle": "Art Teacher",
        "roleGroup": "Teacher",
        "employeeId": "14.23.709",
        "department": "Junior High",
        "unit": "Junior High",
        "className": "Grade 9 Messier 87",
        "building": "Junior High",
        "joinDate": "2023-05-02",
        "status": "Active",
        "email": "zolla@millennia21.id",
        "birthDate": "17-Feb-1998",
        "religion": "Islam",
        "gender": "F",
        "avatarColor": "#0891b2",
        "photoUrl": "https://res.cloudinary.com/deldcwiji/image/upload/v1770780014/DSC04468_dkldsj.jpg",
        "photos": [
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780014/DSC04468_dkldsj.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780014/DSC04469_ysipyt.jpg",
            "https://res.cloudinary.com/deldcwiji/image/upload/v1770780015/DSC04470_w5g8a3.jpg"
        ],
        "highlights": []
    }
];

const LEGACY_UNIT_MAP = {
    Operational: 'SHIELD',
    Finance: 'SAFE',
    CARE: 'COMPASS',
    'MAD Lab': 'BRIDGE',
    Pelangi: 'RISE'
};

const getMappedUnit = (employee) => {
    if (!employee) return '';

    if (employee.roleGroup === 'SE Teacher') return 'RISE';
    if (employee.roleGroup === 'Support Staff') return 'SHIELD';

    const roleTitle = String(employee.roleTitle || '').toLowerCase();
    const unit = LEGACY_UNIT_MAP[employee.unit] || employee.unit;
    const department = LEGACY_UNIT_MAP[employee.department] || employee.department;

    if (roleTitle.includes('finance') || unit === 'SAFE' || department === 'SAFE') {
        return 'SAFE';
    }

    if (
        roleTitle.includes('crm')
        || roleTitle.includes('c.a.r.e')
        || roleTitle.includes('care')
        || roleTitle.includes('compass')
        || unit === 'COMPASS'
        || department === 'COMPASS'
    ) {
        return 'COMPASS';
    }

    if (
        roleTitle.includes('research')
        || roleTitle.includes('development')
        || roleTitle.includes('litbang')
        || roleTitle.includes('training')
        || unit === 'BRIDGE'
        || department === 'BRIDGE'
    ) {
        return 'BRIDGE';
    }

    return unit;
};

employees.forEach((employee) => {
    const mappedUnit = getMappedUnit(employee);
    if (mappedUnit) {
        employee.unit = mappedUnit;
        employee.department = mappedUnit;
    }

    if (employee.fullName === 'Faisal Nur Hidayat') {
        employee.roleTitle = 'Head of MAD LAB';
        employee.roleGroup = 'Head Unit';
        employee.unit = 'BRIDGE';
        employee.department = 'BRIDGE';
    }

    if (employee.fullName === 'Tien Hadiningsih') {
        employee.roleGroup = 'Head Unit';
        employee.roleTitle = 'COMPASS Coordinator';
        employee.unit = 'COMPASS';
        employee.department = 'COMPASS';
    }
});

const uniqueSorted = (items, order = []) => {
    const set = new Set(
        items.filter((item) => item !== undefined && item !== null && String(item).trim() !== '')
    );
    const ordered = order.filter((item) => set.has(item));
    const rest = Array.from(set).filter((item) => !ordered.includes(item));
    return [...ordered, ...rest.sort((a, b) => String(a).localeCompare(String(b), 'en-US'))];
};

const groupCounts = (items, key, order = []) => {
    const counts = items.reduce((acc, current) => {
        const value = current[key];
        if (!value) return acc;
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    const keys = order.length ? order : Object.keys(counts).sort((a, b) => a.localeCompare(b, 'en-US'));
    return keys.map((item) => ({ _id: item, count: counts[item] || 0 }));
};

const MONTH_INDEX = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
};

const parseBirthDateParts = (birthDate) => {
    if (!birthDate) return null;
    const normalized = String(birthDate).trim();
    const match = normalized.match(/^(\d{1,2})-([A-Za-z]{3})(?:-(\d{4}))?$/);
    if (!match) return null;

    const day = Number(match[1]);
    const month = MONTH_INDEX[match[2].toLowerCase()];
    if (!Number.isFinite(day) || !Number.isFinite(month)) return null;

    return { day, month };
};

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const daysBetween = (from, to) => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const diff = startOfDay(to).getTime() - startOfDay(from).getTime();
    return Math.floor(diff / msPerDay);
};

const getNextMonthDayDate = (month, day, fromDate) => {
    const year = fromDate.getFullYear();
    const candidate = new Date(year, month, day);
    return candidate < startOfDay(fromDate) ? new Date(year + 1, month, day) : candidate;
};

const getPeopleMoments = () => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    const birthdaysToday = employees
        .filter((employee) => {
            const birth = parseBirthDateParts(employee.birthDate);
            return birth && birth.month === todayMonth && birth.day === todayDay;
        })
        .map((employee) => ({
            _id: employee._id,
            fullName: employee.fullName,
            roleTitle: employee.roleTitle,
            unit: employee.unit
        }));

    const upcomingBirthdays = employees
        .map((employee) => {
            const birth = parseBirthDateParts(employee.birthDate);
            if (!birth) return null;

            const nextDate = getNextMonthDayDate(birth.month, birth.day, today);
            const daysUntil = daysBetween(today, nextDate);
            if (daysUntil < 1 || daysUntil > 7) return null;

            return {
                _id: employee._id,
                fullName: employee.fullName,
                roleTitle: employee.roleTitle,
                unit: employee.unit,
                daysUntil,
                dateLabel: nextDate.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short'
                })
            };
        })
        .filter(Boolean)
        .sort((a, b) => a.daysUntil - b.daysUntil || a.fullName.localeCompare(b.fullName, 'en-US'));

    const workAnniversaryToday = employees
        .filter((employee) => {
            if (!employee.joinDate) return false;
            const joinDate = new Date(employee.joinDate);
            if (Number.isNaN(joinDate.getTime())) return false;
            return joinDate.getMonth() === todayMonth && joinDate.getDate() === todayDay;
        })
        .map((employee) => {
            const joinDate = new Date(employee.joinDate);
            return {
                _id: employee._id,
                fullName: employee.fullName,
                roleTitle: employee.roleTitle,
                unit: employee.unit,
                years: Math.max(0, today.getFullYear() - joinDate.getFullYear())
            };
        });

    return {
        birthdayTodayCount: birthdaysToday.length,
        upcomingBirthdaysCount: upcomingBirthdays.length,
        workAnniversaryTodayCount: workAnniversaryToday.length,
        birthdaysToday,
        upcomingBirthdays,
        workAnniversaryToday
    };
};

const matchesSearch = (employee, query) => {
    if (!query) return true;
    const normalized = query.toLowerCase();
    return [
        employee.fullName,
        employee.username,
        employee.roleTitle,
        employee.employeeId,
        employee.unit,
        employee.department,
        employee.className,
        employee.building,
        employee.email,
        employee.religion,
        employee.birthDate
    ]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(normalized));
};

const applyFilters = (filters = {}) => {
    const { search, unit, status, employmentType } = filters;
    return employees.filter((employee) => {
        if (search && !matchesSearch(employee, search)) return false;
        if (unit && employee.unit !== unit) return false;
        if (status && employee.status !== status) return false;
        if (employmentType && employee.employmentType !== employmentType) return false;
        return true;
    });
};

export const getSchoolOverview = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter((employee) => employee.status === 'Active').length;
    const teacherCount = employees.filter((employee) => ['Teacher', 'SE Teacher'].includes(employee.roleGroup)).length;
    const leadershipCount = employees.filter((employee) => ['Director', 'Head Unit'].includes(employee.roleGroup)).length;
    const unitsCount = new Set(employees.map((employee) => employee.unit)).size;

    const byRole = groupCounts(employees, 'roleGroup', ROLE_GROUP_ORDER);
    const byEmploymentType = groupCounts(employees, 'employmentType', EMPLOYMENT_ORDER);
    const byUnit = groupCounts(employees, 'unit', UNIT_DISTRIBUTION_ORDER);
    const peopleMoments = getPeopleMoments();

    return {
        metrics: {
            totalEmployees,
            activeEmployees,
            teacherCount,
            leadershipCount,
            unitsCount
        },
        byRole,
        byEmploymentType,
        byUnit,
        peopleMoments
    };
};

export const getEmployeesHierarchy = (filters = {}) => {
    const filteredEmployees = applyFilters(filters);
    return ROLE_GROUP_ORDER.map((roleGroup) => {
        const members = filteredEmployees
            .filter((employee) => employee.roleGroup === roleGroup)
            .sort((a, b) => a.fullName.localeCompare(b.fullName, 'en-US'));

        return {
            roleGroup,
            total: members.length,
            members
        };
    });
};

export const getEmployees = (filters = {}) => {
    const { page = 1, limit = 50 } = filters;
    const filteredEmployees = applyFilters(filters);
    const start = (page - 1) * limit;
    const data = filteredEmployees.slice(start, start + limit);

    return {
        data,
        pagination: {
            totalRecords: filteredEmployees.length,
            pageSize: limit,
            currentPage: page,
            totalPages: Math.max(1, Math.ceil(filteredEmployees.length / limit))
        }
    };
};

export const getSchoolFilters = () => ({
    roleGroups: ROLE_GROUP_ORDER,
    units: uniqueSorted(employees.map((employee) => employee.unit), UNIT_DISTRIBUTION_ORDER),
    statuses: uniqueSorted(employees.map((employee) => employee.status), STATUS_ORDER),
    employmentTypes: uniqueSorted(employees.map((employee) => employee.employmentType), EMPLOYMENT_ORDER)
});

export const getEmployeeById = (employeeId) => {
    if (!employeeId) return null;
    return employees.find((employee) => employee._id === employeeId) || null;
};

export const getRelatedEmployees = (employeeId, limit = 6) => {
    const current = getEmployeeById(employeeId);
    if (!current) return [];

    const sameRole = employees.filter((employee) => employee._id !== employeeId && employee.roleGroup === current.roleGroup);
    const sameUnit = employees.filter((employee) => employee._id !== employeeId && employee.unit === current.unit);
    const others = employees.filter((employee) => employee._id !== employeeId);

    const unique = [];
    const seen = new Set();
    [...sameRole, ...sameUnit, ...others].forEach((employee) => {
        if (!seen.has(employee._id) && unique.length < limit) {
            seen.add(employee._id);
            unique.push(employee);
        }
    });

    return unique;
};

export { employees, ROLE_GROUP_ORDER };
