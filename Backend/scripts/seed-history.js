import { prisma } from "../lib/prisma.js";

// ─── CONFIG ──────────────────────────────────────────────────────────────────

// const TAGS = [
//   "in/r1/a1/cgs1/cng1/comp1/ft1/pv",
//   "in/r1/a1/cgs1/cng1/comp1/ft1/lp",
//   "in/r1/a1/cgs1/cng2/comp1/ft1/pv",
//   "in/r1/a2/cgs2/cng2/comp2/ft2/pv",
// ];

// ─── TAG STRUCTURE ────────────────────────────────────────────────────────────
// country / region / area(city) / cgs / station / compressor / flowpoint / parameter
//
// Parameters:
//   pv  = Process Value       sp  = Set Point
//   op  = Output Percentage   hh  = High-High alarm
//   hi  = High alarm          lo  = Low alarm
//   ll  = Low-Low alarm       st  = Status
//   hr  = Hour Run            tmp = Temperature

const TAGS = [

  // ── GUJARAT / AHMEDABAD ──────────────────────────────────────────
  "india/gujarat/ahmedabad/ngs1/cng_naroda/comp1/ft1/pv",
  "india/gujarat/ahmedabad/ngs1/cng_naroda/comp1/ft1/sp",
  "india/gujarat/ahmedabad/ngs1/cng_naroda/comp1/pt1/pv",
  "india/gujarat/ahmedabad/ngs1/cng_naroda/comp1/pt1/hi",
  "india/gujarat/ahmedabad/ngs1/cng_naroda/comp1/tt1/tmp",
  "india/gujarat/ahmedabad/ngs1/cng_naroda/comp1/st/hr",
  "india/gujarat/ahmedabad/ngs1/cng_vatva/comp1/ft1/pv",
  "india/gujarat/ahmedabad/ngs1/cng_vatva/comp1/pt1/pv",
  "india/gujarat/ahmedabad/ngs1/cng_vatva/comp1/tt1/tmp",
  "india/gujarat/ahmedabad/sgs1/cng_sabarmati/comp1/ft1/pv",
  "india/gujarat/ahmedabad/sgs1/cng_sabarmati/comp1/pt1/pv",
  "india/gujarat/ahmedabad/sgs1/cng_sabarmati/comp1/pt1/hh",
  "india/gujarat/ahmedabad/sgs1/cng_sabarmati/comp1/pt1/ll",
  "india/gujarat/ahmedabad/sgs1/cng_sabarmati/comp1/tt1/tmp",
  "india/gujarat/ahmedabad/sgs1/cng_chandkheda/comp1/ft1/pv",
  "india/gujarat/ahmedabad/sgs1/cng_chandkheda/comp1/pt1/pv",
  "india/gujarat/ahmedabad/sgs1/cng_chandkheda/comp1/st/hr",

  // ── GUJARAT / SURAT ──────────────────────────────────────────────
  "india/gujarat/surat/sachin_gs/cng_sachin/comp1/ft1/pv",
  "india/gujarat/surat/sachin_gs/cng_sachin/comp1/pt1/pv",
  "india/gujarat/surat/sachin_gs/cng_sachin/comp1/tt1/tmp",
  "india/gujarat/surat/sachin_gs/cng_sachin/comp1/st/hr",
  "india/gujarat/surat/sachin_gs/cng_udhna/comp1/ft1/pv",
  "india/gujarat/surat/sachin_gs/cng_udhna/comp1/pt1/pv",
  "india/gujarat/surat/sachin_gs/cng_udhna/comp1/tt1/tmp",
  "india/gujarat/surat/surat_cgs/cng_adajan/comp1/ft1/pv",
  "india/gujarat/surat/surat_cgs/cng_adajan/comp1/pt1/pv",
  "india/gujarat/surat/surat_cgs/cng_adajan/comp1/pt1/hi",
  "india/gujarat/surat/surat_cgs/cng_adajan/comp1/tt1/tmp",
  "india/gujarat/surat/surat_cgs/cng_piplod/comp1/ft1/pv",
  "india/gujarat/surat/surat_cgs/cng_piplod/comp1/pt1/pv",
  "india/gujarat/surat/surat_cgs/cng_piplod/comp1/st/hr",

  // ── GUJARAT / VADODARA ───────────────────────────────────────────
  "india/gujarat/vadodara/vgs1/cng_gorwa/comp1/ft1/pv",
  "india/gujarat/vadodara/vgs1/cng_gorwa/comp1/pt1/pv",
  "india/gujarat/vadodara/vgs1/cng_gorwa/comp1/tt1/tmp",
  "india/gujarat/vadodara/vgs1/cng_gorwa/comp1/st/hr",
  "india/gujarat/vadodara/vgs1/cng_makarpura/comp1/ft1/pv",
  "india/gujarat/vadodara/vgs1/cng_makarpura/comp1/pt1/pv",
  "india/gujarat/vadodara/vgs1/cng_makarpura/comp1/tt1/tmp",
  "india/gujarat/vadodara/vgs1/cng_makarpura/comp2/ft1/pv",
  "india/gujarat/vadodara/vgs1/cng_makarpura/comp2/pt1/pv",

  // ── GUJARAT / RAJKOT ─────────────────────────────────────────────
  "india/gujarat/rajkot/rgs1/cng_kalawad/comp1/ft1/pv",
  "india/gujarat/rajkot/rgs1/cng_kalawad/comp1/pt1/pv",
  "india/gujarat/rajkot/rgs1/cng_kalawad/comp1/tt1/tmp",
  "india/gujarat/rajkot/rgs1/cng_kalawad/comp1/st/hr",
  "india/gujarat/rajkot/rgs1/cng_mavdi/comp1/ft1/pv",
  "india/gujarat/rajkot/rgs1/cng_mavdi/comp1/pt1/pv",
  "india/gujarat/rajkot/rgs1/cng_mavdi/comp1/tt1/tmp",

  // ── MAHARASHTRA / MUMBAI ─────────────────────────────────────────
  "india/maharashtra/mumbai/mgs1/cng_andheri/comp1/ft1/pv",
  "india/maharashtra/mumbai/mgs1/cng_andheri/comp1/ft1/sp",
  "india/maharashtra/mumbai/mgs1/cng_andheri/comp1/pt1/pv",
  "india/maharashtra/mumbai/mgs1/cng_andheri/comp1/pt1/hi",
  "india/maharashtra/mumbai/mgs1/cng_andheri/comp1/tt1/tmp",
  "india/maharashtra/mumbai/mgs1/cng_andheri/comp1/st/hr",
  "india/maharashtra/mumbai/mgs1/cng_kurla/comp1/ft1/pv",
  "india/maharashtra/mumbai/mgs1/cng_kurla/comp1/pt1/pv",
  "india/maharashtra/mumbai/mgs1/cng_kurla/comp1/tt1/tmp",
  "india/maharashtra/mumbai/mgs1/cng_kurla/comp1/st/hr",
  "india/maharashtra/mumbai/bgs1/cng_bandra/comp1/ft1/pv",
  "india/maharashtra/mumbai/bgs1/cng_bandra/comp1/pt1/pv",
  "india/maharashtra/mumbai/bgs1/cng_bandra/comp1/tt1/tmp",
  "india/maharashtra/mumbai/bgs1/cng_worli/comp1/ft1/pv",
  "india/maharashtra/mumbai/bgs1/cng_worli/comp1/pt1/pv",
  "india/maharashtra/mumbai/bgs1/cng_worli/comp1/st/hr",

  // ── MAHARASHTRA / PUNE ───────────────────────────────────────────
  "india/maharashtra/pune/pgs1/cng_hadapsar/comp1/ft1/pv",
  "india/maharashtra/pune/pgs1/cng_hadapsar/comp1/pt1/pv",
  "india/maharashtra/pune/pgs1/cng_hadapsar/comp1/pt1/hh",
  "india/maharashtra/pune/pgs1/cng_hadapsar/comp1/tt1/tmp",
  "india/maharashtra/pune/pgs1/cng_hadapsar/comp1/st/hr",
  "india/maharashtra/pune/pgs1/cng_kothrud/comp1/ft1/pv",
  "india/maharashtra/pune/pgs1/cng_kothrud/comp1/pt1/pv",
  "india/maharashtra/pune/pgs1/cng_kothrud/comp1/tt1/tmp",
  "india/maharashtra/pune/pgs1/cng_wakad/comp1/ft1/pv",
  "india/maharashtra/pune/pgs1/cng_wakad/comp1/pt1/pv",
  "india/maharashtra/pune/pgs1/cng_wakad/comp1/st/hr",

  // ── MAHARASHTRA / NAGPUR ─────────────────────────────────────────
  "india/maharashtra/nagpur/ngs1/cng_dharampeth/comp1/ft1/pv",
  "india/maharashtra/nagpur/ngs1/cng_dharampeth/comp1/pt1/pv",
  "india/maharashtra/nagpur/ngs1/cng_dharampeth/comp1/tt1/tmp",
  "india/maharashtra/nagpur/ngs1/cng_dharampeth/comp1/st/hr",
  "india/maharashtra/nagpur/ngs1/cng_hingna/comp1/ft1/pv",
  "india/maharashtra/nagpur/ngs1/cng_hingna/comp1/pt1/pv",
  "india/maharashtra/nagpur/ngs1/cng_hingna/comp1/tt1/tmp",

  // ── DELHI / NEW DELHI ────────────────────────────────────────────
  "india/delhi/newdelhi/dgs1/cng_connaught/comp1/ft1/pv",
  "india/delhi/newdelhi/dgs1/cng_connaught/comp1/ft1/sp",
  "india/delhi/newdelhi/dgs1/cng_connaught/comp1/pt1/pv",
  "india/delhi/newdelhi/dgs1/cng_connaught/comp1/pt1/hi",
  "india/delhi/newdelhi/dgs1/cng_connaught/comp1/tt1/tmp",
  "india/delhi/newdelhi/dgs1/cng_connaught/comp1/st/hr",
  "india/delhi/newdelhi/dgs1/cng_saket/comp1/ft1/pv",
  "india/delhi/newdelhi/dgs1/cng_saket/comp1/pt1/pv",
  "india/delhi/newdelhi/dgs1/cng_saket/comp1/tt1/tmp",
  "india/delhi/newdelhi/dgs2/cng_rohini/comp1/ft1/pv",
  "india/delhi/newdelhi/dgs2/cng_rohini/comp1/pt1/pv",
  "india/delhi/newdelhi/dgs2/cng_rohini/comp1/pt1/hh",
  "india/delhi/newdelhi/dgs2/cng_rohini/comp1/tt1/tmp",
  "india/delhi/newdelhi/dgs2/cng_rohini/comp1/st/hr",
  "india/delhi/newdelhi/dgs2/cng_dwarka/comp1/ft1/pv",
  "india/delhi/newdelhi/dgs2/cng_dwarka/comp1/pt1/pv",
  "india/delhi/newdelhi/dgs2/cng_dwarka/comp1/tt1/tmp",
  "india/delhi/newdelhi/dgs2/cng_dwarka/comp1/st/hr",

  // ── UTTAR PRADESH / LUCKNOW ──────────────────────────────────────
  "india/uttarpradesh/lucknow/lgs1/cng_gomtinagar/comp1/ft1/pv",
  "india/uttarpradesh/lucknow/lgs1/cng_gomtinagar/comp1/pt1/pv",
  "india/uttarpradesh/lucknow/lgs1/cng_gomtinagar/comp1/tt1/tmp",
  "india/uttarpradesh/lucknow/lgs1/cng_gomtinagar/comp1/st/hr",
  "india/uttarpradesh/lucknow/lgs1/cng_hazratganj/comp1/ft1/pv",
  "india/uttarpradesh/lucknow/lgs1/cng_hazratganj/comp1/pt1/pv",
  "india/uttarpradesh/lucknow/lgs1/cng_hazratganj/comp1/tt1/tmp",
  "india/uttarpradesh/lucknow/lgs2/cng_aliganj/comp1/ft1/pv",
  "india/uttarpradesh/lucknow/lgs2/cng_aliganj/comp1/pt1/pv",
  "india/uttarpradesh/lucknow/lgs2/cng_aliganj/comp1/st/hr",

  // ── UTTAR PRADESH / AGRA ─────────────────────────────────────────
  "india/uttarpradesh/agra/ags1/cng_tajganj/comp1/ft1/pv",
  "india/uttarpradesh/agra/ags1/cng_tajganj/comp1/pt1/pv",
  "india/uttarpradesh/agra/ags1/cng_tajganj/comp1/tt1/tmp",
  "india/uttarpradesh/agra/ags1/cng_tajganj/comp1/st/hr",
  "india/uttarpradesh/agra/ags1/cng_sikandra/comp1/ft1/pv",
  "india/uttarpradesh/agra/ags1/cng_sikandra/comp1/pt1/pv",
  "india/uttarpradesh/agra/ags1/cng_sikandra/comp1/tt1/tmp",

  // ── RAJASTHAN / JAIPUR ───────────────────────────────────────────
  "india/rajasthan/jaipur/jgs1/cng_malviya/comp1/ft1/pv",
  "india/rajasthan/jaipur/jgs1/cng_malviya/comp1/ft1/sp",
  "india/rajasthan/jaipur/jgs1/cng_malviya/comp1/pt1/pv",
  "india/rajasthan/jaipur/jgs1/cng_malviya/comp1/pt1/hi",
  "india/rajasthan/jaipur/jgs1/cng_malviya/comp1/tt1/tmp",
  "india/rajasthan/jaipur/jgs1/cng_malviya/comp1/st/hr",
  "india/rajasthan/jaipur/jgs1/cng_mansarovar/comp1/ft1/pv",
  "india/rajasthan/jaipur/jgs1/cng_mansarovar/comp1/pt1/pv",
  "india/rajasthan/jaipur/jgs1/cng_mansarovar/comp1/tt1/tmp",
  "india/rajasthan/jaipur/jgs2/cng_vaishali/comp1/ft1/pv",
  "india/rajasthan/jaipur/jgs2/cng_vaishali/comp1/pt1/pv",
  "india/rajasthan/jaipur/jgs2/cng_vaishali/comp1/st/hr",

  // ── RAJASTHAN / JODHPUR ──────────────────────────────────────────
  "india/rajasthan/jodhpur/jdgs1/cng_ratanada/comp1/ft1/pv",
  "india/rajasthan/jodhpur/jdgs1/cng_ratanada/comp1/pt1/pv",
  "india/rajasthan/jodhpur/jdgs1/cng_ratanada/comp1/tt1/tmp",
  "india/rajasthan/jodhpur/jdgs1/cng_ratanada/comp1/st/hr",
  "india/rajasthan/jodhpur/jdgs1/cng_pratapnagar/comp1/ft1/pv",
  "india/rajasthan/jodhpur/jdgs1/cng_pratapnagar/comp1/pt1/pv",

  // ── KARNATAKA / BENGALURU ────────────────────────────────────────
  "india/karnataka/bengaluru/bgs1/cng_koramangala/comp1/ft1/pv",
  "india/karnataka/bengaluru/bgs1/cng_koramangala/comp1/ft1/sp",
  "india/karnataka/bengaluru/bgs1/cng_koramangala/comp1/pt1/pv",
  "india/karnataka/bengaluru/bgs1/cng_koramangala/comp1/pt1/hi",
  "india/karnataka/bengaluru/bgs1/cng_koramangala/comp1/tt1/tmp",
  "india/karnataka/bengaluru/bgs1/cng_koramangala/comp1/st/hr",
  "india/karnataka/bengaluru/bgs1/cng_whitefield/comp1/ft1/pv",
  "india/karnataka/bengaluru/bgs1/cng_whitefield/comp1/pt1/pv",
  "india/karnataka/bengaluru/bgs1/cng_whitefield/comp1/tt1/tmp",
  "india/karnataka/bengaluru/bgs2/cng_hebbal/comp1/ft1/pv",
  "india/karnataka/bengaluru/bgs2/cng_hebbal/comp1/pt1/pv",
  "india/karnataka/bengaluru/bgs2/cng_hebbal/comp1/st/hr",
  "india/karnataka/bengaluru/bgs2/cng_electronic_city/comp1/ft1/pv",
  "india/karnataka/bengaluru/bgs2/cng_electronic_city/comp1/pt1/pv",
  "india/karnataka/bengaluru/bgs2/cng_electronic_city/comp1/tt1/tmp",

  // ── TELANGANA / HYDERABAD ────────────────────────────────────────
  "india/telangana/hyderabad/hgs1/cng_banjara/comp1/ft1/pv",
  "india/telangana/hyderabad/hgs1/cng_banjara/comp1/pt1/pv",
  "india/telangana/hyderabad/hgs1/cng_banjara/comp1/pt1/hh",
  "india/telangana/hyderabad/hgs1/cng_banjara/comp1/tt1/tmp",
  "india/telangana/hyderabad/hgs1/cng_banjara/comp1/st/hr",
  "india/telangana/hyderabad/hgs1/cng_madhapur/comp1/ft1/pv",
  "india/telangana/hyderabad/hgs1/cng_madhapur/comp1/pt1/pv",
  "india/telangana/hyderabad/hgs1/cng_madhapur/comp1/tt1/tmp",
  "india/telangana/hyderabad/hgs2/cng_secunderabad/comp1/ft1/pv",
  "india/telangana/hyderabad/hgs2/cng_secunderabad/comp1/pt1/pv",
  "india/telangana/hyderabad/hgs2/cng_secunderabad/comp1/st/hr",

  // ── MADHYA PRADESH / INDORE ──────────────────────────────────────
  "india/madhyapradesh/indore/igs1/cng_vijay_nagar/comp1/ft1/pv",
  "india/madhyapradesh/indore/igs1/cng_vijay_nagar/comp1/pt1/pv",
  "india/madhyapradesh/indore/igs1/cng_vijay_nagar/comp1/tt1/tmp",
  "india/madhyapradesh/indore/igs1/cng_vijay_nagar/comp1/st/hr",
  "india/madhyapradesh/indore/igs1/cng_palasia/comp1/ft1/pv",
  "india/madhyapradesh/indore/igs1/cng_palasia/comp1/pt1/pv",
  "india/madhyapradesh/indore/igs1/cng_palasia/comp1/tt1/tmp",

  // ── MADHYA PRADESH / BHOPAL ──────────────────────────────────────
  "india/madhyapradesh/bhopal/bpgs1/cng_hoshangabad/comp1/ft1/pv",
  "india/madhyapradesh/bhopal/bpgs1/cng_hoshangabad/comp1/pt1/pv",
  "india/madhyapradesh/bhopal/bpgs1/cng_hoshangabad/comp1/tt1/tmp",
  "india/madhyapradesh/bhopal/bpgs1/cng_hoshangabad/comp1/st/hr",
  "india/madhyapradesh/bhopal/bpgs1/cng_mp_nagar/comp1/ft1/pv",
  "india/madhyapradesh/bhopal/bpgs1/cng_mp_nagar/comp1/pt1/pv",

  // ── PUNJAB / LUDHIANA ────────────────────────────────────────────
  "india/punjab/ludhiana/lgs1/cng_brs_nagar/comp1/ft1/pv",
  "india/punjab/ludhiana/lgs1/cng_brs_nagar/comp1/pt1/pv",
  "india/punjab/ludhiana/lgs1/cng_brs_nagar/comp1/tt1/tmp",
  "india/punjab/ludhiana/lgs1/cng_brs_nagar/comp1/st/hr",
  "india/punjab/ludhiana/lgs1/cng_giaspura/comp1/ft1/pv",
  "india/punjab/ludhiana/lgs1/cng_giaspura/comp1/pt1/pv",
  "india/punjab/ludhiana/lgs1/cng_giaspura/comp1/tt1/tmp",

  // ── HARYANA / GURUGRAM ───────────────────────────────────────────
  "india/haryana/gurugram/ggs1/cng_sohna_road/comp1/ft1/pv",
  "india/haryana/gurugram/ggs1/cng_sohna_road/comp1/pt1/pv",
  "india/haryana/gurugram/ggs1/cng_sohna_road/comp1/pt1/hi",
  "india/haryana/gurugram/ggs1/cng_sohna_road/comp1/tt1/tmp",
  "india/haryana/gurugram/ggs1/cng_sohna_road/comp1/st/hr",
  "india/haryana/gurugram/ggs1/cng_udyog_vihar/comp1/ft1/pv",
  "india/haryana/gurugram/ggs1/cng_udyog_vihar/comp1/pt1/pv",
  "india/haryana/gurugram/ggs1/cng_udyog_vihar/comp1/tt1/tmp",
  "india/haryana/gurugram/ggs1/cng_udyog_vihar/comp1/st/hr",

  // ── WEST BENGAL / KOLKATA ────────────────────────────────────────
  "india/westbengal/kolkata/kgs1/cng_salt_lake/comp1/ft1/pv",
  "india/westbengal/kolkata/kgs1/cng_salt_lake/comp1/pt1/pv",
  "india/westbengal/kolkata/kgs1/cng_salt_lake/comp1/tt1/tmp",
  "india/westbengal/kolkata/kgs1/cng_salt_lake/comp1/st/hr",
  "india/westbengal/kolkata/kgs1/cng_howrah/comp1/ft1/pv",
  "india/westbengal/kolkata/kgs1/cng_howrah/comp1/pt1/pv",
  "india/westbengal/kolkata/kgs1/cng_howrah/comp1/tt1/tmp",
  "india/westbengal/kolkata/kgs2/cng_jadavpur/comp1/ft1/pv",
  "india/westbengal/kolkata/kgs2/cng_jadavpur/comp1/pt1/pv",
  "india/westbengal/kolkata/kgs2/cng_jadavpur/comp1/st/hr",

  // ── TAMIL NADU / CHENNAI ─────────────────────────────────────────
  "india/tamilnadu/chennai/cgs1/cng_anna_nagar/comp1/ft1/pv",
  "india/tamilnadu/chennai/cgs1/cng_anna_nagar/comp1/pt1/pv",
  "india/tamilnadu/chennai/cgs1/cng_anna_nagar/comp1/tt1/tmp",
  "india/tamilnadu/chennai/cgs1/cng_anna_nagar/comp1/st/hr",
  "india/tamilnadu/chennai/cgs1/cng_tambaram/comp1/ft1/pv",
  "india/tamilnadu/chennai/cgs1/cng_tambaram/comp1/pt1/pv",
  "india/tamilnadu/chennai/cgs1/cng_tambaram/comp1/tt1/tmp",
  "india/tamilnadu/chennai/cgs2/cng_porur/comp1/ft1/pv",
  "india/tamilnadu/chennai/cgs2/cng_porur/comp1/pt1/pv",
  "india/tamilnadu/chennai/cgs2/cng_porur/comp1/st/hr",

  // ── ANDHRA PRADESH / VISAKHAPATNAM ──────────────────────────────
  "india/andhrapradesh/visakhapatnam/vgs1/cng_gajuwaka/comp1/ft1/pv",
  "india/andhrapradesh/visakhapatnam/vgs1/cng_gajuwaka/comp1/pt1/pv",
  "india/andhrapradesh/visakhapatnam/vgs1/cng_gajuwaka/comp1/tt1/tmp",
  "india/andhrapradesh/visakhapatnam/vgs1/cng_gajuwaka/comp1/st/hr",
  "india/andhrapradesh/visakhapatnam/vgs1/cng_mvp_colony/comp1/ft1/pv",
  "india/andhrapradesh/visakhapatnam/vgs1/cng_mvp_colony/comp1/pt1/pv",
  "india/andhrapradesh/visakhapatnam/vgs1/cng_mvp_colony/comp1/tt1/tmp",

  // ── ODISHA / BHUBANESWAR ─────────────────────────────────────────
  "india/odisha/bhubaneswar/ogs1/cng_patia/comp1/ft1/pv",
  "india/odisha/bhubaneswar/ogs1/cng_patia/comp1/pt1/pv",
  "india/odisha/bhubaneswar/ogs1/cng_patia/comp1/tt1/tmp",
  "india/odisha/bhubaneswar/ogs1/cng_patia/comp1/st/hr",
  "india/odisha/bhubaneswar/ogs1/cng_rasulgarh/comp1/ft1/pv",
  "india/odisha/bhubaneswar/ogs1/cng_rasulgarh/comp1/pt1/pv",
  "india/odisha/bhubaneswar/ogs1/cng_rasulgarh/comp1/tt1/tmp",

  // ── UTTARAKHAND / DEHRADUN ───────────────────────────────────────
  "india/uttarakhand/dehradun/ddn_gs1/cng_rajpur/comp1/ft1/pv",
  "india/uttarakhand/dehradun/ddn_gs1/cng_rajpur/comp1/pt1/pv",
  "india/uttarakhand/dehradun/ddn_gs1/cng_rajpur/comp1/tt1/tmp",
  "india/uttarakhand/dehradun/ddn_gs1/cng_rajpur/comp1/st/hr",
  "india/uttarakhand/dehradun/ddn_gs1/cng_rispana/comp1/ft1/pv",
  "india/uttarakhand/dehradun/ddn_gs1/cng_rispana/comp1/pt1/pv",
  "india/uttarakhand/dehradun/ddn_gs1/cng_rispana/comp1/tt1/tmp",

];

// ─── BREAKDOWN ────────────────────────────────────────────────────────────────
// 14 states  : Gujarat, Maharashtra, Delhi, Uttar Pradesh, Rajasthan,
//              Karnataka, Telangana, Madhya Pradesh, Punjab, Haryana,
//              West Bengal, Tamil Nadu, Andhra Pradesh, Odisha, Uttarakhand
// 20 cities  : Ahmedabad, Surat, Vadodara, Rajkot, Mumbai, Pune, Nagpur,
//              New Delhi, Lucknow, Agra, Jaipur, Jodhpur, Bengaluru,
//              Hyderabad, Indore, Bhopal, Ludhiana, Gurugram, Kolkata,
//              Chennai, Visakhapatnam, Bhubaneswar, Dehradun
// 200 tags total

const LIVE_INTERVAL_MS = 15_000;

const VALUE_PROFILES = {
  pv:      { base: 50,  drift: 2  },
  lp:      { base: 200, drift: 10 },
  default: { base: 30,  drift: 3  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function parseTag(tag) {
  const [country, region, area, cgs, station, compressor, point, parameter] = tag.split("/");
  return { tag, country, region, area, cgs, station, compressor, point, parameter };
}

function nextValue(current, drift) {
  const change = (Math.random() - 0.5) * drift;
  return parseFloat((current + change).toFixed(4));
}

// ─── STARTUP SETUP ───────────────────────────────────────────────────────────

async function seedHierarchyForTag(parts) {
  const { country, region, area, cgs, station, compressor } = parts;

  await prisma.country.upsert({
    where: { name: country },
    update: {},
    create: { name: country },
  });

  await prisma.region.upsert({
    where: { name_country: { name: region, country } },
    update: {},
    create: { name: region, country },
  });

  await prisma.area.upsert({
    where: { name_region: { name: area, region } },
    update: {},
    create: { name: area, region, country },
  });

  await prisma.cgs.upsert({
    where: { name_area: { name: cgs, area } },
    update: {},
    create: { name: cgs, area, region, country },
  });

  await prisma.station.upsert({
    where: { name_cgs: { name: station, cgs } },
    update: {},
    create: { name: station, cgs, area, region, country },
  });

  await prisma.compressor.upsert({
    where: { name_station: { name: compressor, station } },
    update: {},
    create: { name: compressor, station, cgs, area, region, country },
  });
}

async function setupDatabase(allParts) {
  console.log("Setting up hierarchy and telemetry data...");

  const seenHierarchyKeys = new Set();
  for (const parts of allParts) {
    const key = `${parts.country}/${parts.region}/${parts.area}/${parts.cgs}/${parts.station}/${parts.compressor}`;
    if (!seenHierarchyKeys.has(key)) {
      seenHierarchyKeys.add(key);
      await seedHierarchyForTag(parts);
    }
  }

  await prisma.telemetryData.createMany({
    data: allParts.map(({ tag, country, region, area, cgs, station, compressor, point, parameter }) => ({
      tag, country, region, area, cgs, station, compressor, point, parameter,
    })),
    skipDuplicates: true,
  });

  console.log("Setup complete ✅");
}

// ─── LIVE GENERATOR ───────────────────────────────────────────────────────────

async function startLiveGenerator(telemetryMap) {
  const currentValues = new Map(
    TAGS.map((tag) => {
      const { parameter } = parseTag(tag);
      const profile = VALUE_PROFILES[parameter] ?? VALUE_PROFILES.default;
      return [tag, profile.base];
    })
  );

  console.log(`Live generator started — inserting every ${LIVE_INTERVAL_MS / 1000}s (Ctrl+C to stop)\n`);

  setInterval(async () => {
    try {
      // Each tag is processed individually with its own timestamp —
      // mirrors how a real MQTT broker publishes each message separately
      const rows = TAGS.map((tag) => {
        const { parameter } = parseTag(tag);
        const profile       = VALUE_PROFILES[parameter] ?? VALUE_PROFILES.default;
        const value         = nextValue(currentValues.get(tag), profile.drift);

        currentValues.set(tag, value);

        return {
          telemetry_id: telemetryMap.get(tag),
          value,
          quality:   192,
          timestamp: new Date(), // called per tag, so each gets its own moment
        };
      });

      await prisma.$executeRaw`
        INSERT INTO "History" (telemetry_id, value, quality, timestamp)
        SELECT
          unnest(${rows.map((r) => r.telemetry_id)}::int[]),
          unnest(${rows.map((r) => r.value)}::float[]),
          unnest(${rows.map((r) => r.quality)}::int[]),
          unnest(${rows.map((r) => r.timestamp)}::timestamp[])
      `;

      console.log(`[tick] Inserted ${rows.length} rows — timestamps range: ${rows[0].timestamp.toISOString()} → ${rows.at(-1).timestamp.toISOString()}`);
    } catch (err) {
      console.error("Insert error:", err.message);
    }
  }, LIVE_INTERVAL_MS);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  const allParts = TAGS.map(parseTag);

  await setupDatabase(allParts);

  const telemetryRows = await prisma.telemetryData.findMany({
    where: { tag: { in: TAGS } },
    select: { id: true, tag: true },
  });
  const telemetryMap = new Map(telemetryRows.map((r) => [r.tag, r.id]));

  await startLiveGenerator(telemetryMap);
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});