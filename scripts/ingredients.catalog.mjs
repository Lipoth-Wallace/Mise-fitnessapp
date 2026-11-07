// Canonical ingredient catalogue.
// Nutrition is NOT written here: build-data.mjs joins each row to its USDA SR Legacy entry
// (via the TempoLife CC-BY-4.0 dataset) by exact name. kcal is only used to disambiguate
// duplicate USDA names.
//
// Columns: id | display name | USDA name | kcal (disambiguator) | display unit (g|ml|each) |
//          grams per display unit (approximate, "each" only) | aisle | flags | may-contain | est. £/kg | receipt synonyms
//
// flags: UK FIC 14 allergens (celery gluten crustaceans eggs fish lupin milk molluscs mustard nuts peanuts sesame soya sulphites)
//        + diet flags (meat poultry pork seafood honey grain legume sugar gelatin)
// may-contain: allergens commonly present through processing / cross-contact; treated as exclusions for allergies.
// Prices are rough UK supermarket estimates for planning only and are always labelled "estimated" in the UI.

export const CATALOG = `
chicken-breast|Chicken breast|Chicken, breast, skinless, boneless, meat only|108|g||meat|meat,poultry||7.5|chicken breast,chicken fillet,chicken breast fillet,chicken fillets,chicken mini fillets
chicken-thigh|Chicken thigh (boneless)|Chicken, dark meat, thigh, meat only, raw|121|g||meat|meat,poultry||6.5|chicken thigh,thigh fillets,chicken thighs
turkey-mince|Turkey mince|Turkey, ground, 93% lean, 7% fat, raw|150|g||meat|meat,poultry||7|turkey mince,turkey breast mince
beef-mince|Lean beef mince (5% fat)|Beef, ground, 95% lean meat / 5% fat, raw|137|g||meat|meat||9|beef mince,lean mince,steak mince,5% mince
beef-steak|Sirloin steak|Beef, top sirloin, steak, raw|127|g||meat|meat||22|sirloin,steak,sirloin steak,rump steak
pork-tenderloin|Pork tenderloin|Pork, fresh, loin, tenderloin, raw|109|g||meat|meat,pork||9|pork tenderloin,pork fillet,pork loin
bacon|Smoked back bacon|Pork, cured, bacon, unprepared|393|g||meat|meat,pork|sulphites|11|bacon,back bacon,smoked bacon,unsmoked bacon,streaky bacon
lamb-mince|Lamb mince|Lamb, ground, raw|282|g||meat|meat||11|lamb mince
salmon|Salmon fillet|Fish, salmon, Atlantic, farmed, raw|208|g||fish|fish,seafood||18|salmon,salmon fillet,salmon fillets,scottish salmon
cod|Cod fillet|Fish, cod, Atlantic, raw|82|g||fish|fish,seafood||16|cod,cod fillet,cod loin,cod fillets
tuna-can|Tuna in spring water (drained)|Fish, tuna, light, canned in water, drained solids|86|g||dry|fish,seafood||9|tuna,tuna chunks,tuna in spring water,tuna in water
prawns|King prawns|Crustaceans, shrimp, raw|85|g||fish|crustaceans,seafood||18|prawns,king prawns,cooked prawns,raw prawns,shrimp
eggs|Eggs|Egg, whole, raw, fresh|143|each|50|dairy|eggs||4.2|eggs,free range eggs,large eggs,medium eggs,large free range eggs,egg
egg-whites|Egg whites|Egg, white, raw, fresh|52|ml||dairy|eggs||4|egg whites,liquid egg white
tofu|Firm tofu|Tofu, raw, firm, prepared with calcium sulfate|144|g||dairy|soya||7|tofu,firm tofu,extra firm tofu
tempeh|Tempeh|Tempeh|192|g||dairy|soya,legume||12|tempeh
chickpeas|Chickpeas (tinned, drained)|Chickpeas (garbanzo beans, bengal gram), mature seeds, canned, drained solids|139|g||dry|legume||2.5|chickpeas,chick peas,tinned chickpeas
black-beans|Black beans (tinned)|Beans, black turtle, mature seeds, canned|91|g||dry|legume||2.8|black beans
kidney-beans|Red kidney beans (tinned)|Beans, kidney, all types, mature seeds, canned|84|g||dry|legume||2.2|kidney beans,red kidney beans
red-lentils|Red lentils (dried)|Lentils, pink or red, raw|358|g||dry|legume||3|red lentils,split red lentils,lentils
edamame|Edamame (frozen)|Edamame, frozen, unprepared|109|g||frozen|soya,legume||8|edamame,edamame beans,soya beans
milk|Semi-skimmed milk|Milk, reduced fat, fluid, 2% milkfat, with added vitamin A and vitamin D|50|ml||dairy|milk||1|milk,semi skimmed milk,semi-skimmed milk,whole milk,skimmed milk,1% milk
almond-milk|Unsweetened almond drink|Beverages, almond milk, unsweetened, shelf stable|15|ml||dairy|nuts||1.6|almond milk,almond drink,unsweetened almond
soy-milk|Soya drink|SILK Plain, soymilk|41|ml||dairy|soya||1.6|soya milk,soy milk,soya drink
greek-yogurt|Fat-free Greek-style yogurt|Yogurt, Greek, plain, nonfat|59|g||dairy|milk||4|greek yogurt,greek style yogurt,0% greek,fat free yogurt,natural yogurt
yogurt|Natural yogurt|Yogurt, plain, whole milk|61|g||dairy|milk||2.5|natural yogurt,plain yogurt,yoghurt
cheddar|Mature cheddar|Cheese, cheddar|403|g||dairy|milk||9|cheddar,mature cheddar,cheese,extra mature
feta|Feta|Cheese, feta|265|g||dairy|milk||11|feta,greek salad cheese
mozzarella|Mozzarella|Cheese, mozzarella, whole milk|299|g||dairy|milk||8|mozzarella
parmesan|Parmesan|Cheese, parmesan, hard|392|g||dairy|milk||18|parmesan,parmigiano,grana padano
cottage-cheese|Cottage cheese (low fat)|Cheese, cottage, lowfat, 2% milkfat|81|g||dairy|milk||4|cottage cheese
ricotta|Ricotta|Cheese, ricotta, part skim milk|138|g||dairy|milk||7|ricotta
cream-cheese|Soft cheese|Cheese, cream|350|g||dairy|milk||6|soft cheese,cream cheese,philadelphia
butter|Butter|Butter, salted|717|g||dairy|milk||8|butter,salted butter,unsalted butter
double-cream|Double cream|Cream, fluid, heavy whipping|340|ml||dairy|milk||5|double cream,whipping cream,cream
oats|Porridge oats|Oats|389|g||dry|gluten,grain|gluten|1.4|oats,porridge oats,rolled oats,jumbo oats
oats-gf|Gluten-free oats (labelled GF)|Oats|389|g||dry|grain||4|gluten free oats,gf oats
white-rice|Basmati rice (dry)|Rice, white, long-grain, raw|365|g||dry|grain||2|rice,basmati,basmati rice,long grain rice,white rice
brown-rice|Brown rice (dry)|Rice, brown, long-grain, raw|367|g||dry|grain||2.4|brown rice,wholegrain rice
pasta|Dried pasta|Pasta, dry|371|g||dry|gluten,grain||1.3|pasta,penne,fusilli,spaghetti,linguine,rigatoni
gf-pasta|Gluten-free pasta (corn)|Pasta, gluten-free, corn, dry|357|g||dry|grain||3|gluten free pasta,gf pasta
wholemeal-bread|Wholemeal bread|Bread, whole-wheat|252|each|36|bakery|gluten,grain|soya,sesame|2.2|wholemeal bread,brown bread,wholemeal loaf,bread,seeded bread
sourdough|White sourdough|Bread, white|266|each|50|bakery|gluten,grain|sesame|5|sourdough,white bread,bloomer
flour-tortilla|Flour tortilla wrap|Tortillas, ready-to-bake or -fry, flour, shelf stable|297|each|62|bakery|gluten,grain|soya|4.5|tortilla wraps,wraps,flour tortillas,tortillas
corn-tortilla|Corn tortilla|Tortillas, ready-to-bake or -fry, corn|218|each|26|bakery|grain||6|corn tortillas
pitta|Pitta bread|Bread, pita, white|275|each|60|bakery|gluten,grain|sesame|3|pitta,pitta bread,pita
quinoa|Quinoa (dry)|Quinoa, uncooked|368|g||dry|grain||7|quinoa
couscous|Couscous (dry)|Couscous, dry|376|g||dry|gluten,grain||2.5|couscous
flour|Plain flour|Wheat flour, white, all-purpose|364|g||dry|gluten,grain||0.9|plain flour,flour,self raising flour
rice-noodles|Rice noodles (dry)|Rice noodles, dry|364|g||dry|grain||5|rice noodles,vermicelli,ribbon noodles
egg-noodles|Egg noodles (dry)|Noodles, egg, dry|384|g||dry|gluten,grain,eggs||3.5|egg noodles,medium noodles,noodles
onion|Onion|Onions, raw|40|each|110|produce|||1|onions,brown onions,red onions,onion
garlic|Garlic|Garlic, raw|149|each|3|produce|||8|garlic,garlic bulb
tomato|Tomatoes|Tomatoes, red, ripe, raw|18|g||produce|||3|tomatoes,salad tomatoes,cherry tomatoes,vine tomatoes,plum tomatoes
chopped-tomatoes|Chopped tomatoes (tin)|Tomatoes, red, ripe, canned, packed in tomato juice|16|g||dry|||1.4|chopped tomatoes,tinned tomatoes,plum tomatoes in juice
tomato-puree|Tomato purée|Tomato products, canned, paste, without salt added|82|g||sauces|||4|tomato puree,tomato paste
spinach|Spinach|Spinach, raw|23|g||produce|||5|spinach,baby spinach
broccoli|Broccoli|Broccoli, raw|34|g||produce|||2|broccoli,tenderstem
carrot|Carrots|Carrots, raw|41|each|60|produce|||0.8|carrots,carrot
red-pepper|Red pepper|Peppers, sweet, red, raw|26|each|150|produce|||4|red pepper,peppers,mixed peppers,sweet peppers,pepper
courgette|Courgette|Squash, summer, zucchini, raw|17|each|200|produce|||3|courgette,courgettes
mushrooms|Mushrooms|Mushrooms, white, raw|22|g||produce|||3.5|mushrooms,closed cup mushrooms,chestnut mushrooms
sweet-potato|Sweet potato|Sweet potato, raw, unprepared|86|g||produce|||1.5|sweet potato,sweet potatoes
potato|Potatoes|Potatoes, flesh and skin, raw|77|g||produce|||0.9|potatoes,baking potatoes,new potatoes,maris piper
cucumber|Cucumber|Cucumber, with peel, raw|15|each|300|produce|||2|cucumber
lettuce|Romaine lettuce|Lettuce, cos or romaine, raw|17|g||produce|||4|romaine,lettuce,cos lettuce,little gem
avocado|Avocado|Avocados, raw|160|each|150|produce|||6|avocado,avocados,ripe avocado
lemon|Lemon (juice)|Lemon juice, raw|22|each|30|produce|||3|lemons,lemon,unwaxed lemons
lime|Lime (juice)|Lime juice, raw|25|each|30|produce|||3.5|limes,lime
ginger|Fresh ginger|Ginger root, raw|80|g||produce|||8|ginger,root ginger
red-chilli|Red chilli|Peppers, hot chili, red, raw|40|each|15|produce|||12|red chilli,chillies,chilli
spring-onion|Spring onions|Onions, spring or scallions, raw|32|each|15|produce|||5|spring onions,salad onions
peas|Garden peas (frozen)|Peas, green, frozen, unprepared|77|g||frozen|legume||1.5|peas,garden peas,frozen peas,petits pois
sweetcorn|Sweetcorn (frozen)|Corn, sweet, yellow, frozen, kernels|79|g||frozen|grain||2|sweetcorn,corn
kale|Kale|Kale, raw|35|g||produce|||5|kale,cavolo nero
cauliflower|Cauliflower|Cauliflower, raw|25|g||produce|||1.6|cauliflower
aubergine|Aubergine|Eggplant, raw|25|each|300|produce|||3|aubergine,aubergines
green-beans|Green beans|Beans, snap, green, raw|31|g||produce|||6|green beans,fine beans
celery|Celery|Celery, raw|14|g||produce|celery||2|celery
basil|Fresh basil|Basil, fresh|23|g||produce|||25|basil
coriander|Fresh coriander|Coriander (cilantro) leaves, raw|23|g||produce|||25|coriander
parsley|Fresh parsley|Parsley, fresh|36|g||produce|||25|parsley
mint|Fresh mint|Spearmint, fresh|44|g||produce|||25|mint
banana|Bananas|Bananas, raw|89|each|118|produce|||1.1|bananas,banana
blueberries|Blueberries|Blueberries, raw|57|g||produce|||11|blueberries
strawberries|Strawberries|Strawberries, raw|32|g||produce|||7|strawberries
raspberries|Raspberries|Raspberries, raw|52|g||produce|||13|raspberries
frozen-berries|Frozen mixed berries|Strawberries, frozen, unsweetened|35|g||frozen|||4|frozen berries,mixed berries,frozen fruit
apple|Apples|Apples, raw, with skin|52|each|180|produce|||2|apples,apple,gala,braeburn,pink lady
mango|Mango|Mangos, raw|60|g||produce|||4|mango
pineapple|Pineapple|Pineapple, raw|50|g||produce|||2.5|pineapple
orange|Oranges|Oranges, raw|47|each|140|produce|||2|oranges,easy peelers,satsumas
dates|Medjool dates|Dates, medjool|277|each|24|dry|||12|dates,medjool dates
raisins|Raisins|Raisins, dark, seedless|299|g||dry|sulphites||4|raisins,sultanas
olive-oil|Olive oil|Oil, olive, salad or cooking|884|ml||sauces|||7|olive oil,extra virgin olive oil
sesame-oil|Toasted sesame oil|Oil, sesame, salad or cooking|884|ml||sauces|sesame||12|sesame oil
coconut-oil|Coconut oil|Oil, coconut|892|g||sauces|||10|coconut oil
peanut-butter|Peanut butter|Peanut Butter, smooth|588|g||sauces|peanuts,legume||5|peanut butter,smooth peanut butter,crunchy peanut butter
almonds|Almonds|Nuts, almonds|579|g||dry|nuts||12|almonds,flaked almonds,whole almonds
walnuts|Walnuts|Nuts, walnuts, english|654|g||dry|nuts||14|walnuts
cashews|Cashews|Nuts, cashew nuts, raw|553|g||dry|nuts||13|cashews,cashew nuts
peanuts|Peanuts|Peanuts, all types, raw|567|g||dry|peanuts,legume||6|peanuts,salted peanuts
chia|Chia seeds|Seeds, chia seeds, dried|486|g||dry|||10|chia seeds,chia
pumpkin-seeds|Pumpkin seeds|Seeds, pumpkin and squash seed kernels, dried|559|g||dry|||10|pumpkin seeds
tahini|Tahini|Seeds, sesame butter, tahini, from roasted and toasted kernels (most common type)|595|g||sauces|sesame||9|tahini
coconut-milk|Coconut milk (tin)|Nuts, coconut milk, canned (liquid expressed from grated meat and water)|197|ml||dry|||2.5|coconut milk,light coconut milk
soy-sauce|Soy sauce|Soy sauce made from soy and wheat (shoyu)|53|ml||sauces|soya,gluten,grain||5|soy sauce,light soy sauce,dark soy sauce
tamari|Tamari (wheat-free)|Soy sauce made from soy (tamari)|60|ml||sauces|soya||10|tamari
fish-sauce|Fish sauce|Sauce, fish, ready-to-serve|35|ml||sauces|fish,seafood|crustaceans|6|fish sauce,nam pla
honey|Honey|Honey|304|g||sauces|honey||7|honey,runny honey
maple-syrup|Maple syrup|Syrups, maple|260|ml||sauces|sugar||15|maple syrup
sugar|Caster sugar|Sugars, granulated|387|g||dry|sugar||1|sugar,caster sugar,granulated sugar
brown-sugar|Light brown sugar|Sugars, brown|380|g||dry|sugar||1.8|brown sugar,light brown sugar,soft brown sugar
dark-chocolate|Dark chocolate (70%+)|Chocolate, dark, 70-85% cacao solids|598|g||dry|sugar|milk,soya,nuts|10|dark chocolate,70% chocolate,cooking chocolate
cocoa|Cocoa powder|Cocoa, dry powder, unsweetened|228|g||dry||milk|10|cocoa,cocoa powder
vanilla|Vanilla extract|Vanilla extract|288|ml||dry|||80|vanilla,vanilla extract
baking-powder|Baking powder|Leavening agents, baking powder, double-acting, sodium aluminum sulfate|53|g||dry||gluten|6|baking powder
salt|Salt|—|0|g||dry|||0.6|salt,sea salt
black-pepper|Black pepper|Spices, pepper, black|251|g||dry|||20|black pepper,peppercorns
cumin|Ground cumin|Spices, cumin seed|375|g||dry|||20|cumin,ground cumin
paprika|Smoked paprika|Spices, paprika|282|g||dry|||20|paprika,smoked paprika
curry-powder|Curry powder|Spices, curry powder|325|g||dry||mustard,celery|20|curry powder,medium curry powder
turmeric|Ground turmeric|Spices, turmeric, ground|312|g||dry|||20|turmeric
cinnamon|Ground cinnamon|Spices, cinnamon, ground|247|g||dry|||20|cinnamon
chilli-powder|Chilli powder|Spices, chili powder|282|g||dry|||20|chilli powder,hot chilli powder
oregano|Dried oregano|Spices, oregano, dried|265|g||dry|||25|oregano
veg-stock|Vegetable stock|Soup, vegetable broth, ready to serve|5|ml||sauces|celery||1.5|vegetable stock,stock cubes,veg stock,stock pot
miso|White miso paste|Miso|198|g||sauces|soya|gluten|12|miso,miso paste
mayonnaise|Mayonnaise|Salad dressing, mayonnaise|680|g||sauces|eggs|mustard|4|mayonnaise,mayo
dijon|Dijon mustard|Mustard, prepared, yellow|60|g||sauces|mustard||6|dijon,mustard,wholegrain mustard
balsamic|Balsamic vinegar|Vinegar, balsamic|88|ml||sauces|sulphites||6|balsamic,balsamic vinegar
hummus|Houmous|Hummus, commercial|237|g||dairy|sesame,legume||5|houmous,hummus
pesto|Green pesto|Sauce, pesto, ready-to-serve, refrigerated|418|g||sauces|milk,nuts||10|pesto,green pesto,basil pesto
salsa|Tomato salsa|Sauce, salsa, ready-to-serve|29|g||sauces|||5|salsa
ketchup|Tomato ketchup|Catsup|101|g||sauces|sugar|celery|2|ketchup,tomato ketchup
whey|Whey protein powder|Beverages, Protein powder whey based|352|g||dry|milk|soya|25|whey,protein powder,whey protein
rice-cakes|Rice cakes|Snacks, rice cakes, brown rice, multigrain|387|each|9|dry|grain|gluten,sesame|5|rice cakes
olives|Black olives|Olives, ripe, canned (small-extra large)|116|g||dry|||8|olives,black olives,kalamata
sun-dried-tomatoes|Sun-dried tomatoes|Tomatoes, sun-dried, packed in oil, drained|213|g||sauces|sulphites||15|sun dried tomatoes
cabbage|Red cabbage|Cabbage, red, raw|31|g||produce|||1.2|red cabbage,cabbage
butternut|Butternut squash|Squash, winter, butternut, raw|45|g||produce|||1.6|butternut squash,butternut
asparagus|Asparagus|Asparagus, raw|20|g||produce|||10|asparagus
cornflour|Cornflour|Cornstarch|381|g||dry|||2.5|cornflour,cornstarch
naan|Plain naan|Bread, naan, plain, refrigerated|291|each|90|bakery|gluten,grain,milk|eggs,sesame|4|naan,naan bread
ice-cream|Vanilla ice cream|Ice creams, vanilla|207|g||frozen|milk,sugar|eggs|3|vanilla ice cream,ice cream
`
