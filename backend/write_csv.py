# Columns: name, region, diet_type, meal_type, calories, protein_g, carbs_g, fat_g,
#          glycemic_load, saturated_fat_level, is_dairy_heavy, is_folate_rich
#
# saturated_fat_level: rough tag - ghee/cream/red meat/coconut-heavy = high,
#                       lean protein/vegetable oil-based = low, mixed = medium
# is_dairy_heavy: contains a significant amount of milk/curd/paneer/ghee as a core ingredient
# is_folate_rich: leafy greens, legumes/dals, and other folate-dense ingredients as a core part

rows = [
    ["name","region","diet_type","meal_type","calories","protein_g","carbs_g","fat_g",
     "glycemic_load","saturated_fat_level","is_dairy_heavy","is_folate_rich"],

    ["Idli (2 pieces)","south","veg","breakfast",120,4,24,0.5,"medium","low","false","false"],
    ["Masala Dosa","south","veg","breakfast",350,8,45,15,"high","medium","false","false"],
    ["Plain Dosa","south","veg","breakfast",180,4,32,5,"high","low","false","false"],
    ["Rava Dosa","south","veg","breakfast",220,5,34,8,"high","medium","false","false"],
    ["Uttapam (1 piece)","south","veg","breakfast",200,6,30,6,"medium","low","false","false"],
    ["Upma (1 bowl)","south","veg","breakfast",220,6,35,6,"medium","low","false","false"],
    ["Pongal (1 bowl)","south","veg","breakfast",260,7,40,8,"medium","medium","true","false"],
    ["Egg Dosa","south","non-veg","breakfast",300,12,35,12,"medium","medium","false","false"],
    ["Appam (2 pieces)","south","veg","breakfast",240,4,45,4,"high","low","false","false"],
    ["Vegetable Kootu (1 bowl)","south","veg","lunch",150,6,18,6,"low","low","false","true"],
    ["Sambar (1 bowl)","south","veg","lunch",140,7,20,4,"low","low","false","true"],
    ["Rasam (1 bowl)","south","veg","lunch",60,2,10,1,"low","low","false","false"],
    ["Curd Rice (1 bowl)","south","veg","lunch",250,6,45,5,"medium","medium","true","false"],
    ["Lemon Rice (1 bowl)","south","veg","lunch",230,4,40,7,"high","low","false","false"],
    ["Bisi Bele Bath (1 bowl)","south","veg","lunch",300,8,48,8,"medium","medium","false","true"],
    ["Avial (1 bowl)","south","veg","lunch",160,4,16,9,"low","medium","true","true"],
    ["Chicken Chettinad","south","non-veg","dinner",320,28,10,20,"low","high","false","false"],
    ["Fish Curry Kerala Style","south","non-veg","lunch",280,25,8,17,"low","medium","false","false"],
    ["Chicken Curry South Style","south","non-veg","dinner",300,27,9,18,"low","high","false","false"],
    ["Prawn Roast","south","non-veg","dinner",260,24,6,15,"low","medium","false","false"],
    ["Egg Curry South Style","south","non-veg","dinner",240,13,9,16,"low","medium","false","false"],
    ["Buttermilk (1 glass)","south","veg","snack",60,3,6,2,"low","low","true","false"],
    ["Banana Chips (small bowl)","south","veg","snack",160,2,20,8,"high","high","false","false"],
    ["Idli with Chutney (2 pieces)","south","veg","snack",180,5,28,4,"medium","low","false","false"],
    ["Egg Roll (1 piece)","south","non-veg","snack",220,14,18,10,"medium","medium","false","false"],
    ["Roasted Peanuts (small bowl)","south","veg","snack",170,7,6,14,"low","medium","false","false"],
    ["Sundal (1 bowl)","south","veg","snack",150,8,20,4,"low","low","false","true"],
    ["Murukku (4 pieces)","south","veg","snack",200,3,22,11,"high","high","false","false"],
    ["Vada (2 pieces)","south","veg","snack",210,6,22,10,"high","high","false","false"],
    ["Rava Kesari (1 bowl)","south","veg","snack",230,3,35,9,"high","high","true","false"],
    ["Vegetable Uttapam (1 piece)","south","veg","breakfast",210,6,32,6,"medium","low","false","true"],
    ["Coconut Chutney (side, 1 bowl)","south","veg","snack",90,2,6,7,"low","high","false","false"],

    ["Chapati (1 piece)","north","veg","dinner",120,3,18,3.5,"medium","low","false","false"],
    ["Missi Roti (1 piece)","north","veg","dinner",140,5,20,4,"low","low","false","true"],
    ["Dal Makhani (1 bowl)","north","veg","dinner",280,12,30,12,"low","high","true","true"],
    ["Dal Tadka (1 bowl)","north","veg","lunch",200,10,26,6,"low","low","false","true"],
    ["Paneer Butter Masala (1 bowl)","north","veg","dinner",320,14,15,24,"low","high","true","false"],
    ["Rajma (1 bowl)","north","veg","lunch",220,10,35,5,"low","low","false","true"],
    ["Chole (1 bowl)","north","veg","lunch",270,11,38,8,"low","medium","false","true"],
    ["Aloo Paratha (1 piece)","north","veg","breakfast",260,6,35,10,"high","medium","false","false"],
    ["Gobi Paratha (1 piece)","north","veg","breakfast",240,6,32,9,"medium","medium","false","false"],
    ["Palak Paneer (1 bowl)","north","veg","dinner",290,14,12,22,"low","high","true","true"],
    ["Malai Kofta (1 bowl)","north","veg","dinner",340,10,20,26,"medium","high","true","false"],
    ["Butter Chicken (1 bowl)","north","non-veg","dinner",380,25,10,27,"low","high","true","false"],
    ["Tandoori Chicken (2 pieces)","north","non-veg","dinner",250,30,3,13,"low","medium","true","false"],
    ["Egg Bhurji (1 bowl)","north","non-veg","breakfast",220,14,4,16,"low","medium","false","false"],
    ["Chicken Tikka (6 pieces)","north","non-veg","lunch",300,32,4,17,"low","medium","true","false"],
    ["Chicken Curry North Style","north","non-veg","dinner",340,28,8,22,"low","high","false","false"],
    ["Keema Matar (1 bowl)","north","non-veg","dinner",320,24,9,20,"low","high","false","false"],
    ["Plain Rice (1 bowl)","north","veg","lunch",200,4,45,0.5,"high","low","false","false"],
    ["Jeera Rice (1 bowl)","north","veg","lunch",230,4,44,5,"high","medium","false","false"],
    ["Roti with Ghee (1 piece)","north","veg","dinner",150,3,18,6,"medium","high","true","false"],
    ["Vegetable Pulao (1 bowl)","north","veg","lunch",280,6,50,7,"high","medium","false","false"],
    ["Mutton Curry (1 bowl)","north","non-veg","dinner",350,26,8,24,"low","high","false","false"],
    ["Poha (1 bowl)","north","veg","breakfast",180,4,30,5,"high","low","false","false"],
    ["Besan Chilla (2 pieces)","north","veg","breakfast",200,10,20,9,"low","low","false","false"],
    ["Moong Dal Cheela (2 pieces)","north","veg","breakfast",190,11,22,6,"low","low","false","true"],
    ["Paratha with Curd (1 piece)","north","veg","breakfast",230,6,30,9,"medium","medium","true","false"],
    ["Kadhi North Style (1 bowl)","north","veg","lunch",150,6,15,7,"medium","medium","true","false"],
    ["Bhindi Masala (1 bowl)","north","veg","dinner",140,4,12,9,"low","medium","false","true"],
    ["Baingan Bharta (1 bowl)","north","veg","dinner",130,3,14,8,"low","medium","false","false"],
    ["Matar Paneer (1 bowl)","north","veg","dinner",260,12,16,17,"low","high","true","true"],
    ["Roasted Makhana (1 bowl)","north","veg","snack",150,5,18,6,"low","low","false","false"],
    ["Sprouts Salad (1 bowl)","north","veg","snack",120,8,15,2,"low","low","false","true"],
    ["Mixed Nuts (small handful)","north","veg","snack",180,6,8,15,"low","medium","false","false"],
    ["Boiled Egg (2 pieces)","north","non-veg","snack",140,12,1,10,"low","medium","false","true"],
    ["Chicken Salad (1 bowl)","north","non-veg","snack",220,20,8,12,"low","low","false","true"],
    ["Chana Chaat (1 bowl)","north","veg","snack",180,9,24,5,"low","low","false","true"],
    ["Aloo Tikki (2 pieces)","north","veg","snack",220,4,28,10,"high","medium","false","false"],
    ["Samosa (2 pieces)","north","veg","snack",260,5,30,14,"high","high","false","false"],
    ["Paneer Tikka (6 pieces)","north","veg","snack",280,18,8,20,"low","high","true","false"],
    ["Vegetable Soup (1 bowl)","north","veg","snack",90,3,14,2,"low","low","false","true"],
    ["Paneer Paratha (1 piece)","north","veg","breakfast",270,10,30,12,"medium","high","true","false"],
    ["Vegetable Biryani (1 bowl)","north","veg","lunch",310,7,48,9,"high","medium","false","false"],
    ["Chicken Biryani (1 bowl)","north","non-veg","lunch",400,26,45,14,"high","medium","false","false"],
    ["Egg Paratha (1 piece)","north","non-veg","breakfast",270,11,28,13,"medium","medium","false","false"],
    ["Lauki Sabzi (1 bowl)","north","veg","dinner",110,3,12,6,"low","low","false","false"],

    ["Machher Jhol (1 bowl)","east","non-veg","dinner",260,24,8,15,"low","medium","false","false"],
    ["Shukto (1 bowl)","east","veg","lunch",150,5,18,6,"low","low","false","true"],
    ["Chingri Malai Curry (1 bowl)","east","non-veg","dinner",300,22,10,19,"low","high","true","false"],
    ["Bhapa Ilish (1 piece)","east","non-veg","lunch",280,26,3,18,"low","medium","false","false"],
    ["Cholar Dal (1 bowl)","east","veg","lunch",200,10,28,5,"low","low","false","true"],
    ["Luchi (2 pieces)","east","veg","breakfast",220,5,30,9,"high","medium","false","false"],
    ["Aloo Posto (1 bowl)","east","veg","dinner",240,4,20,16,"medium","medium","false","false"],
    ["Panta Bhat (1 bowl)","east","veg","breakfast",180,4,38,1,"medium","low","false","false"],
    ["Mishti Doi (1 bowl)","east","veg","snack",180,6,28,4,"high","medium","true","false"],
    ["Egg Curry Bengali Style","east","non-veg","dinner",260,14,10,18,"low","medium","false","false"],
    ["Chirer Pulao (1 bowl)","east","veg","breakfast",220,5,38,6,"medium","low","false","false"],
    ["Dhokar Dalna (1 bowl)","east","veg","lunch",230,10,26,9,"low","medium","false","true"],
    ["Macher Kalia (1 bowl)","east","non-veg","dinner",310,25,8,20,"low","high","true","false"],
    ["Chingri Bhape (1 bowl)","east","non-veg","lunch",250,23,5,15,"low","medium","false","false"],
    ["Aloo Dum East Style (1 bowl)","east","veg","dinner",220,4,28,9,"medium","medium","false","false"],
    ["Begun Bhaja (1 bowl)","east","veg","snack",150,2,12,10,"medium","medium","false","false"],
    ["Muri (1 bowl)","east","veg","snack",130,3,28,0.5,"high","low","false","false"],
    ["Pantua (2 pieces)","east","veg","snack",220,4,35,8,"high","medium","true","false"],
    ["Egg Roll Kolkata Style","east","non-veg","snack",260,12,30,11,"medium","medium","false","false"],
    ["Fish Fry East Style (2 pieces)","east","non-veg","snack",240,20,8,15,"low","medium","false","false"],
    ["Bengali Vegetable Chop (2 pieces)","east","veg","snack",230,4,30,10,"high","medium","false","false"],

    ["Dhokla (4 pieces)","west","veg","breakfast",160,7,25,3,"medium","low","false","false"],
    ["Thepla (2 pieces)","west","veg","breakfast",220,6,30,8,"medium","medium","false","false"],
    ["Khaman (4 pieces)","west","veg","breakfast",170,7,24,4,"medium","low","false","false"],
    ["Poha Gujarati Style","west","veg","breakfast",190,4,32,5,"high","low","false","false"],
    ["Misal Pav (1 bowl + pav)","west","veg","lunch",320,12,45,10,"medium","medium","false","true"],
    ["Usal (1 bowl)","west","veg","lunch",220,12,30,6,"low","low","false","true"],
    ["Undhiyu (1 bowl)","west","veg","dinner",260,7,25,14,"low","medium","false","true"],
    ["Kadhi Gujarati Style (1 bowl)","west","veg","lunch",160,6,18,7,"medium","medium","true","false"],
    ["Puran Poli (1 piece)","west","veg","snack",240,5,40,7,"high","medium","true","false"],
    ["Bombil Fry (4 pieces)","west","non-veg","dinner",280,22,8,18,"low","medium","false","false"],
    ["Kolhapuri Chicken (1 bowl)","west","non-veg","dinner",340,28,10,22,"low","high","false","false"],
    ["Handvo (1 slice)","west","veg","snack",200,8,22,9,"medium","medium","false","true"],
    ["Batata Vada (2 pieces)","west","veg","snack",240,4,30,12,"high","high","false","false"],
    ["Pav Bhaji (1 bowl + pav)","west","veg","dinner",340,8,45,14,"high","high","true","false"],
    ["Sabudana Khichdi (1 bowl)","west","veg","breakfast",260,3,40,10,"high","medium","false","false"],
    ["Bharli Vangi (1 bowl)","west","veg","dinner",200,5,18,12,"low","medium","false","false"],
    ["Solkadhi (1 glass)","west","veg","snack",60,1,8,2,"low","low","true","false"],
    ["Chicken Sukka (1 bowl)","west","non-veg","dinner",300,26,6,19,"low","high","false","false"],
    ["Prawn Curry Goan Style","west","non-veg","dinner",290,24,8,18,"low","high","true","false"],
    ["Modak (2 pieces)","west","veg","snack",220,4,34,8,"high","medium","false","false"],
    ["Fish Fry West Style (2 pieces)","west","non-veg","snack",250,21,7,16,"low","medium","false","false"],
    ["Doodh Poha (1 bowl)","west","veg","breakfast",210,5,34,6,"high","medium","true","false"],
]

header = rows[0]
data_rows = rows[1:]

seen = {}
duplicates = []
for r in data_rows:
    name = r[0]
    if name in seen:
        duplicates.append(name)
    seen[name] = seen.get(name, 0) + 1

malformed = [r for r in data_rows if len(r) != len(header)]

if duplicates:
    print("DUPLICATE NAMES FOUND:")
    for d in set(duplicates):
        print(" -", d)

if malformed:
    print("MALFORMED ROWS FOUND:")
    for m in malformed:
        print(" -", m)

if duplicates or malformed:
    print("\nCSV NOT written due to errors above.")
else:
    import csv
    with open("../data/indian_foods.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(rows)
    print(f"Wrote {len(data_rows)} food rows to indian_foods.csv (with full nutrigenomics tags)")