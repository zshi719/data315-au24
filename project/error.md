Warning: There were 73 warnings in `mutate()`.
The first warning was:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 4.
Caused by warning:
! "AbbVie, North Chi..." not uniquely geocoded, using "1 n waukegan rd, north chicago, il 60064, usa"
ℹ Run dplyr::last_dplyr_warnings() to see the 72 remaining warnings.
> 
> # Log errors (rows with NA for hq_lat or hq_long)
> error_log <- data %>%
+   filter(is.na(hq_lat) | is.na(hq_long)) %>%
+   select(security, headquarters_location) %>%
+   mutate(error_message = "Failed to fetch HQ coordinates")
> 
> # Save error log for review
> write.csv(error_log, "data/error_log.csv", row.names = FALSE)
> 
> # Save the updated dataset with HQ coordinates
> write.csv(data, "data/current_new_with_hq_coords.csv", row.names = FALSE)
> 
> # Display the updated dataset
> print(head(data))
> 
> 
> dplyr::last_dplyr_warnings()
[[1]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 4.
Caused by warning:
! "AbbVie, North Chi..." not uniquely geocoded, using "1 n waukegan rd, north chicago, il 60064, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[2]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 18.
Caused by warning:
! "Alliant Energy, M..." not uniquely geocoded, using "1919 alliant energy center way, madison, wi 53713, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[3]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 26.
Caused by warning:
! "Ameren, St. Louis..." not uniquely geocoded, using "10733 big bend rd, st. louis, mo 63122, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[4]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 34.
Caused by warning:
! "Amgen, Thousand O..." not uniquely geocoded, using "1041 n ventu park rd, thousand oaks, ca 91320, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[5]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 36.
Caused by warning:
! "Analog Devices, W..." not uniquely geocoded, using "831 woburn st, wilmington, ma 01887, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

... with 68 more warnings.
ℹ Run dplyr::last_dplyr_warnings(n = 10) to show more.
> dplyr::last_dplyr_warnings(n=80)
[[1]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 4.
Caused by warning:
! "AbbVie, North Chi..." not uniquely geocoded, using "1 n waukegan rd, north chicago, il 60064, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[2]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 18.
Caused by warning:
! "Alliant Energy, M..." not uniquely geocoded, using "1919 alliant energy center way, madison, wi 53713, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[3]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 26.
Caused by warning:
! "Ameren, St. Louis..." not uniquely geocoded, using "10733 big bend rd, st. louis, mo 63122, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[4]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 34.
Caused by warning:
! "Amgen, Thousand O..." not uniquely geocoded, using "1041 n ventu park rd, thousand oaks, ca 91320, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[5]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 36.
Caused by warning:
! "Analog Devices, W..." not uniquely geocoded, using "831 woburn st, wilmington, ma 01887, usa"
---
Backtrace:
    ▆
 1. ├─... %>% select(-hq_result)
 2. ├─dplyr::select(., -hq_result)
 3. ├─dplyr::mutate(...)
 4. └─dplyr:::mutate.data.frame(...)

[[6]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 37.
Caused by warning:
! "Ansys, Canonsburg..." not uniquely geocoded, using "250 technology dr, canonsburg, pa 15317, usa"

[[7]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 46.
Caused by warning:
! Geocoding "Arthur J. Gallagh..." failed with error:


[[8]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 48.
Caused by warning:
! Geocoding "AT&T, Dallas, Texas" failed with error:


[[9]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 54.
Caused by warning:
! "Avery Dennison, M..." not uniquely geocoded, using "7070 spinach dr, mentor, oh 44060, usa"

[[10]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 60.
Caused by warning:
! "Becton Dickinson,..." not uniquely geocoded, using "18-02 nj-208, franklin lakes, nj 07417, usa"

[[11]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 68.
Caused by warning:
! "Boeing, Arlington..." not uniquely geocoded, using "arlington, va, usa"

[[12]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 70.
Caused by warning:
! "BorgWarner, Aubur..." not uniquely geocoded, using "3000 university dr, auburn hills, mi 48326, usa"

[[13]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 75.
Caused by warning:
! Geocoding "Brown & Brown, Da..." failed with error:


[[14]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 87.
Caused by warning:
! "CarMax, Richmond,..." not uniquely geocoded, using "12800 tuckahoe creek pkwy, richmond, va 23238, usa"

[[15]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 88.
Caused by warning:
! "Carnival, Miami, ..." not uniquely geocoded, using "miami, fl 33131, usa"

[[16]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 95.
Caused by warning:
! "Celanese, Irving,..." not uniquely geocoded, using "222 w las colinas blvd. #900n, irving, tx 75039, usa"

[[17]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 106.
Caused by warning:
! Geocoding "Church & Dwight, ..." failed with error:


[[18]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 134.
Caused by warning:
! "Crown Castle, Hou..." not uniquely geocoded, using "2216 winbern st d, houston, tx 77004, usa"

[[19]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 143.
Caused by warning:
! Geocoding "Deere & Company, ..." failed with error:


[[20]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 144.
Caused by warning:
! "Dell Technologies..." not uniquely geocoded, using "2300 greenlawn blvd #3, round rock, tx 78682, usa"

[[21]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 149.
Caused by warning:
! "Digital Realty, A..." not uniquely geocoded, using "7620 metro center dr, austin, tx 78744, usa"

[[22]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 163.
Caused by warning:
! "eBay, San Jose, C..." not uniquely geocoded, using "2025 hamilton ave, san jose, ca 95125, usa"

[[23]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 205.
Caused by warning:
! "Fox Corporation (..." not uniquely geocoded, using "avenue b, new york, ny 10009, usa"

[[24]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 210.
Caused by warning:
! "GE Aerospace, Eve..." not uniquely geocoded, using "1 neumann way, cincinnati, oh 45215, usa"

[[25]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 217.
Caused by warning:
! "General Motors, D..." not uniquely geocoded, using "48265-3000, 300 renaissance center, detroit, mi 48243, usa"

[[26]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 219.
Caused by warning:
! "Gilead Sciences, ..." not uniquely geocoded, using "333 lakeside dr, foster city, ca 94404, usa"

[[27]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 224.
Caused by warning:
! "Halliburton, Hous..." not uniquely geocoded, using "5500 north sam houston pkwy w #800, houston, tx 77086, usa"

[[28]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 232.
Caused by warning:
! "Hewlett Packard E..." not uniquely geocoded, using "27816 jones rd, houston, tx 77070, usa"

[[29]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 234.
Caused by warning:
! "Hologic, Marlboro..." not uniquely geocoded, using "445 simarano dr, marlborough, ma 01752, usa"

[[30]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 236.
Caused by warning:
! "Honeywell, Charlo..." not uniquely geocoded, using "13509 s point blvd, charlotte, nc 28273, usa"

[[31]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 238.
Caused by warning:
! Geocoding "Host Hotels & Res..." failed with error:


[[32]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 243.
Caused by warning:
! "Huntington Bancsh..." not uniquely geocoded, using "columbus, oh, usa"

[[33]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 245.
Caused by warning:
! "IBM, Armonk, New ..." not uniquely geocoded, using "1 orchard rd, armonk, ny 10504, usa"

[[34]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 247.
Caused by warning:
! "Idexx Laboratorie..." not uniquely geocoded, using "1 thomas dr, westbrook, me 04092, usa"

[[35]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 254.
Caused by warning:
! Geocoding "International Fla..." failed with error:


[[36]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 261.
Caused by warning:
! "IQVIA, Durham, No..." not uniquely geocoded, using "2400 ellis rd, durham, nc 27703, usa"

[[37]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 263.
Caused by warning:
! "J.B. Hunt, Lowell..." not uniquely geocoded, using "705 n bloomington st, lowell, ar 72745, usa"

[[38]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 265.
Caused by warning:
! Geocoding "Jack Henry & Asso..." failed with error:


[[39]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 267.
Caused by warning:
! Geocoding "Johnson & Johnson..." failed with error:


[[40]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 281.
Caused by warning:
! "Kraft Heinz, Chic..." not uniquely geocoded, using "chicago, il, usa"

[[41]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 295.
Caused by warning:
! "Loews Corporation..." not uniquely geocoded, using "9 w 57th st, new york, ny 10019, usa"

[[42]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 299.
Caused by warning:
! Geocoding "M&T Bank, Buffalo..." failed with error:


[[43]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 309.
Caused by warning:
! Geocoding "McCormick & Compa..." failed with error:


[[44]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 311.
Caused by warning:
! "McKesson Corporat..." not uniquely geocoded, using "845 regent blvd, irving, tx 75063, usa"

[[45]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 313.
Caused by warning:
! Geocoding "Merck & Co., Keni..." failed with error:


[[46]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 321.
Caused by warning:
! "Mid-America Apart..." not uniquely geocoded, using "3505 s mendenhall rd, memphis, tn 38115, usa"

[[47]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 326.
Caused by warning:
! "Mondelez Internat..." not uniquely geocoded, using "905 w fulton market, chicago, il 60607, usa"

[[48]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 336.
Caused by warning:
! "Netflix, Los Gato..." not uniquely geocoded, using "131 albright wy, los gatos, ca 95032, usa"

[[49]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 337.
Caused by warning:
! "Newmont, Denver, ..." not uniquely geocoded, using "6900 e layton ave #700, denver, co 80237, usa"

[[50]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 339.
Caused by warning:
! "News Corp (Class ..." not uniquely geocoded, using "avenue b, new york, ny 10009, usa"

[[51]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 346.
Caused by warning:
! "Northrop Grumman,..." not uniquely geocoded, using "2980 fairview park dr, falls church, va 22042, usa"

[[52]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 348.
Caused by warning:
! "NRG Energy, Houst..." not uniquely geocoded, using "12070 old, beaumont hwy, houston, tx 77049, usa"

[[53]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 352.
Caused by warning:
! "NXP Semiconductor..." not uniquely geocoded, using "46, htc 46, 5656 ae eindhoven, netherlands"

[[54]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 356.
Caused by warning:
! "Omnicom Group, Ne..." not uniquely geocoded, using "437 madison ave, new york, ny 10022, usa"

[[55]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 360.
Caused by warning:
! "Otis Worldwide, F..." not uniquely geocoded, using "1 carrier pl, farmington, ct 06032, usa"

[[56]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 372.
Caused by warning:
! "Pfizer, New York ..." not uniquely geocoded, using "235 e 42nd st, new york, ny 10017, usa"

[[57]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 373.
Caused by warning:
! Geocoding "PG&E Corporation,..." failed with error:


[[58]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 379.
Caused by warning:
! "PPG Industries, P..." not uniquely geocoded, using "1 ppg pl, pittsburgh, pa 15222, usa"

[[59]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 380.
Caused by warning:
! "PPL Corporation, ..." not uniquely geocoded, using "827 hausman rd, allentown, pa 18104, usa"

[[60]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 382.
Caused by warning:
! Geocoding "Procter & Gamble,..." failed with error:


[[61]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 388.
Caused by warning:
! "Public Storage, G..." not uniquely geocoded, using "4820 san fernando rd, glendale, ca 91204, usa"

[[62]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 398.
Caused by warning:
! "Regency Centers, ..." not uniquely geocoded, using "13720 old st augustine rd, jacksonville, fl 32258, usa"

[[63]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 409.
Caused by warning:
! Geocoding "S&P Global, New Y..." failed with error:


[[64]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 415.
Caused by warning:
! "ServiceNow, Santa..." not uniquely geocoded, using "2215 lawson ln, santa clara, ca 95054, usa"

[[65]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 425.
Caused by warning:
! Geocoding "Stanley Black & D..." failed with error:


[[66]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 427.
Caused by warning:
! "State Street Corp..." not uniquely geocoded, using "state st, cambridge, ma 02139, usa"

[[67]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 434.
Caused by warning:
! "Sysco, Houston, T..." not uniquely geocoded, using "1390 enclave pkwy, houston, tx 77077, usa"

[[68]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 444.
Caused by warning:
! "Teradyne, North R..." not uniquely geocoded, using "700 riverpark dr, north reading, ma 01864, usa"

[[69]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 474.
Caused by warning:
! "Vertex Pharmaceut..." not uniquely geocoded, using "316 northern ave, boston, ma 02210, usa"

[[70]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 476.
Caused by warning:
! "Vici Properties, ..." not uniquely geocoded, using "535 madison ave 20th floor, new york, ny 10022, usa"

[[71]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 484.
Caused by warning:
! "Walmart, Bentonvi..." not uniquely geocoded, using "1300 s walton blvd, bentonville, ar 72712, usa"

[[72]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 498.
Caused by warning:
! "Xcel Energy, Minn..." not uniquely geocoded, using "3100 marshall st ne, minneapolis, mn 55418, usa"

[[73]]
<warning/rlang_warning>
Warning in `mutate()`:
ℹ In argument: `hq_result = list(get_hq_geocoding(security, headquarters_location))`.
ℹ In row 501.
Caused by warning:
! "Zebra Technologie..." not uniquely geocoded, using "3 overlook point, lincolnshire, il 60069, usa"
