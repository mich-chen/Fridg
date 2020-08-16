--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: equipment; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.equipment (
    equipment_id integer NOT NULL,
    recipe_id integer,
    equipment character varying
);


ALTER TABLE public.equipment OWNER TO vagrant;

--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.equipment_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.equipment_equipment_id_seq OWNER TO vagrant;

--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.equipment_equipment_id_seq OWNED BY public.equipment.equipment_id;


--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.ingredients (
    ingredient_id integer NOT NULL,
    name character varying
);


ALTER TABLE public.ingredients OWNER TO vagrant;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.ingredients_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_ingredient_id_seq OWNER TO vagrant;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.ingredients_ingredient_id_seq OWNED BY public.ingredients.ingredient_id;


--
-- Name: instructions; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.instructions (
    instruction_id integer NOT NULL,
    recipe_id integer,
    step_num integer,
    step_instruction character varying
);


ALTER TABLE public.instructions OWNER TO vagrant;

--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.instructions_instruction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.instructions_instruction_id_seq OWNER TO vagrant;

--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.instructions_instruction_id_seq OWNED BY public.instructions.instruction_id;


--
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.recipe_ingredients (
    rec_ing_id integer NOT NULL,
    recipe_id integer,
    ingredient_id integer,
    amount double precision,
    unit character varying
);


ALTER TABLE public.recipe_ingredients OWNER TO vagrant;

--
-- Name: recipe_ingredients_rec_ing_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.recipe_ingredients_rec_ing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_ingredients_rec_ing_id_seq OWNER TO vagrant;

--
-- Name: recipe_ingredients_rec_ing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.recipe_ingredients_rec_ing_id_seq OWNED BY public.recipe_ingredients.rec_ing_id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.recipes (
    recipe_id integer NOT NULL,
    title character varying,
    image character varying,
    servings integer,
    cooking_mins integer,
    prep_mins integer,
    ready_mins integer
);


ALTER TABLE public.recipes OWNER TO vagrant;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.recipes_recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_recipe_id_seq OWNER TO vagrant;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.recipes_recipe_id_seq OWNED BY public.recipes.recipe_id;


--
-- Name: saved_recipes; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.saved_recipes (
    saved_id integer NOT NULL,
    recipe_id integer,
    user_id integer,
    favorite boolean
);


ALTER TABLE public.saved_recipes OWNER TO vagrant;

--
-- Name: saved_recipes_saved_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.saved_recipes_saved_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.saved_recipes_saved_id_seq OWNER TO vagrant;

--
-- Name: saved_recipes_saved_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.saved_recipes_saved_id_seq OWNED BY public.saved_recipes.saved_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: vagrant
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying,
    password character varying
);


ALTER TABLE public.users OWNER TO vagrant;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: vagrant
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO vagrant;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vagrant
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: equipment equipment_id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.equipment ALTER COLUMN equipment_id SET DEFAULT nextval('public.equipment_equipment_id_seq'::regclass);


--
-- Name: ingredients ingredient_id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredient_id SET DEFAULT nextval('public.ingredients_ingredient_id_seq'::regclass);


--
-- Name: instructions instruction_id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.instructions ALTER COLUMN instruction_id SET DEFAULT nextval('public.instructions_instruction_id_seq'::regclass);


--
-- Name: recipe_ingredients rec_ing_id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.recipe_ingredients ALTER COLUMN rec_ing_id SET DEFAULT nextval('public.recipe_ingredients_rec_ing_id_seq'::regclass);


--
-- Name: recipes recipe_id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.recipes ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipes_recipe_id_seq'::regclass);


--
-- Name: saved_recipes saved_id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.saved_recipes ALTER COLUMN saved_id SET DEFAULT nextval('public.saved_recipes_saved_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.equipment (equipment_id, recipe_id, equipment) FROM stdin;
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.ingredients (ingredient_id, name) FROM stdin;
1002002	5 spice powder
11482	acorn squash
6979	adobo sauce
19912	agave nectar
15117	ahi tuna
93606	alfredo pasta sauce
1002050	almond extract
93740	almond flour
93607	almond milk
12061	almonds
10014534	amaretto
10211962	ancho chiles
15001	anchovies
7064	andouille sausage
18087	angel food cake mix
10020420	angel hair pasta
93653	angostura bitters
9003	apple
19294	apple butter spread
1009016	apple cider
9016	apple juice
1042035	apple pie spice
19719	apricot preserves
9021	apricots
10020052	arborio rice
20003	arrowroot powder
93828	artichoke heart quarters
11007	artichokes
11959	arugula
1032035	asafoetida
0	asafoetida powder
1001033	asiago cheese
9252	asian pear
11011	asparagus spears
9037	avocado
4581	avocado oil
10311821	baby bell peppers
93636	baby bok choy
11960	baby carrots
10011168	baby corn
11457	baby spinach leaves
10010204	baby-back ribs
10192	baby-back ribs
10123	bacon
4609	bacon fat
18033	baguette
19078	baking bar
18371	baking powder
18372	baking soda
98998	balsamic glaze
2069	balsamic vinegar
11028	bamboo shoots
9040	banana
10020444	basmati rice
2004	bay leaves
6150	bbq sauce
16069	beans
23572	beef
13023	beef brisket
6008	beef broth
13786	beef chuck roast
6170	beef stock
13926	beef tenderloin
14003	beer
14006	beer
11080	beets
10211821	bell pepper
1009054	berries
18010	biscuit mix
18009	biscuits
19903	bittersweet chocolate
99210	black bean sauce
16015	black beans
1059195	black olives
1002030	black pepper
10012023	black sesame seeds
9042	blackberries
12062	blanched almonds
1009200	blood orange
1004	blue cheese
9050	blueberries
11116	bok choy
1055062	boneless skinless chicken breast
10014037	bourbon
10114037	brandy
18064	bread
10120129	bread flour
7919	breakfast links
1006	brie
11090	broccoli
10011090	broccoli florets
20040	brown rice
20090	brown rice flour
19334	brown sugar
18632	brownie mix
11098	brussel sprouts
20012	bulgur
1001	butter
11250	butterhead lettuce
1230	buttermilk
11485	butternut squash
19070	butterscotch chips
11109	cabbage
43015	caesar dressing
1032028	cajun seasoning
10020129	cake flour
93759	candy canes
98857	candy coating
93775	candy melts
16018	canned black beans
11531	canned diced tomatoes
16058	canned garbanzo beans
11980	canned green chiles
16034	canned kidney beans
11264	canned mushrooms
16044	canned pinto beans
10016034	canned red kidney beans
10011693	canned tomatoes
10115121	canned tuna
16051	canned white beans
10016051	canned white cannellini beans
10716050	cannellini beans
9181	cantaloupe
2054	capers
19364	caramel sauce
19074	caramels
2005	caraway seed
2006	cardamom
1002006	cardamom pods
15008	carp
11124	carrots
15010	cat fish filets
11135	cauliflower
10011135	cauliflower florets
10111135	cauliflower rice
11143	celery
10111143	celery ribs
11141	celery root
1052047	celery salt
2007	celery seed
8029	cereal
10043155	champagne
99236	chana dal
1009	cheddar
1041009	cheese
98921	cheese curds
1188	cheese dip
6038	cheese soup
10093727	cheese tortellini
9070	cherry
19314	cherry pie filling
10311529	cherry tomatoes
12098	chestnuts
12006	chia seeds
6080	chicken base
6480	chicken bouillon
1006080	chicken bouillon granules
5062	chicken breasts
6194	chicken broth
5066	chicken drumsticks
5075	chicken legs
1005006	chicken pieces
93668	chicken sausage
6172	chicken stock
1015062	chicken tenders
5091	chicken thighs
5100	chicken wings
16057	chickpea
93749	chile garlic sauce
6973	chili paste
11962	chili peppers
2009	chili powder
6972	chili sauce
11632	chipotle chiles in adobo
98839	chipotle chilies
99223	chipotle peppers in adobo
93748	chive & onion cream cheese spread
19081	chocolate
28027	chocolate chip cookies
10419903	chocolate chunks
19270	chocolate ice cream
1102	chocolate milk
18166	chocolate sandwich cookies
14181	chocolate syrup
10118157	chocolate wafer cookies
7019	chorizo sausage
2048	cider vinegar
11165	cilantro
99020	cinnamon roll
1002010	cinnamon stick
10219335	cinnamon sugar
18047	cinnamon swirl bread
14187	clam juice
15157	clams
93632	clarified butter
1002011	clove
1002047	coarse salt
2035	coarsely ground pepper
98846	cocoa nibs
19165	cocoa powder
12104	coconut
98929	coconut aminos
93746	coconut butter
12115	coconut cream
1032050	coconut extract
93747	coconut flour
12118	coconut milk
4047	coconut oil
12119	coconut water
15015	cod
14209	coffee
10414037	cognac
14400	cola
1011	colby jack
11161	collard greens
6010	condensed cream of celery soup
6147	condensed cream of mushroom soup
99084	confectioner's swerve
10862	cooked bacon
20041	cooked brown rice
5064	cooked chicken breast
10802	cooked ham
10220445	cooked long grain rice
20421	cooked pasta
1008166	cooked polenta
20137	cooked quinoa
20088	cooked wild rice
10118192	cookies
2012	coriander
11168	corn
18022	corn bread mix
19003	corn chips
8020	corn flakes cereal
20019	corn flour
11172	corn kernels
42289	corn oil
18363	corn tortillas
18023	cornbread
13346	corned beef
5307	cornish hens
35137	cornmeal
20027	cornstarch
1001019	cotija cheese
1012	cottage cheese
10018029	country bread
11477	courgettes
20028	couscous
16063	cow pea
10015136	crabmeat
2030	cracked pepper
9078	cranberries
43382	cranberry juice
1053	cream
1017	cream cheese
1186	cream cheese block
6016	cream of chicken soup
18373	cream of tartar
11174	creamed corn
10116098	creamy peanut butter
1001056	creme fraiche
11266	cremini mushrooms
1002031	creole seasoning
8066	crisp rice cereal
18242	croutons
93751	crystallized ginger
11206	cucumber
2014	cumin seeds
18139	cup cake
9085	currants
93604	curry leaves
10016223	dairy free milk
10019334	dark brown sugar
19904	dark chocolate
10019904	dark chocolate candy bars
10019071	dark chocolate chips
1004058	dark sesame oil
9087	dates
18945	deep dish pie crust
10010151	deli ham
7259	deli turkey
8121	dessert oats
10014057	dessert wine
99186	diced ham
14146	diet pop
1002046	dijon mustard
2045	dill
10011937	dill pickles
21118	hot dog
1011053	double cream
9032	dried apricots
2003	dried basil
93822	dried cherries
99233	dried chorizo
9079	dried cranberries
2017	dried dill
11284	dried onion
10011268	dried porcini mushrooms
1002038	dried rubbed sage
2042	dried thyme
11955	dried tomatoes
18079	dry bread crumbs
1090	dry milk
1002024	dry mustard
14097	dry red wine
16090	dry roasted peanuts
4574	duck fat
10019165	dutch process cocoa powder
11212	edamame
1226	egg substitute
20409	egg vermicelli
1124	egg whites
1125	egg yolk
1057	eggnog
11209	eggplant
10120499	elbow macaroni
6599	enchilada sauce
10111205	english cucumber
18439	english muffin
98887	erythritol
11213	escarole
14210	espresso
1214	evaporated milk
16163	extra firm tofu
1034053	extra virgin olive oil
10120420	farfalle
10020005	farro
42193	fat free mayo
6984	fat-free less-sodium chicken broth
11957	fennel
2018	fennel seeds
98963	fenugreek leaf
2019	fenugreek seeds
1019	feta cheese
10020409	fettuccine
98849	fire roasted tomatoes
10115261	fish
6179	fish sauce
6963	fish stock
23657	flank steak
10012220	flax seeds
1022047	fleur de sel
20081	flour
10218364	flour tortillas
1020	fontina cheese
10711111	food dye
98878	frank's redhot sauce
1123	free range eggs
18029	french bread
2044	fresh basil
11043	fresh bean sprouts
11156	fresh chives
11167	fresh corn
10011167	fresh corn kernels
9089	fresh figs
9431	fresh fruit
10111297	fresh herbs
2064	fresh mint
1026	fresh mozzarella
2063	fresh rosemary
2049	fresh thyme leaves
93709	fried onions
19230	frosting
93629	froyo bars
11913	frozen corn
11463	frozen spinach
19100	fudge
10019348	fudge topping
19065	fun size almond joy bar
93663	garam masala
16157	garbanzo bean flour
11215	garlic
10111215	garlic paste
1022020	garlic powder
2020	garlic powder
1062047	garlic salt
19177	gelatin
99040	gf chocolate cake mix
10514037	gin
11216	ginger
14136	ginger ale
93754	ginger paste
10093754	ginger-garlic paste
18172	gingersnap cookies
98853	gnocchi
1159	goat cheese
9297	golden raisins
1011004	gorgonzola
1022	gouda cheese
10018617	graham cracker crumbs
18942	graham cracker pie crust
18617	graham crackers
10020088	grain blend
10314534	grand marnier
1089003	granny smith apples
8212	granola
1002020	granulated garlic
10111529	grape tomatoes
9112	grapefruit
4517	grapeseed oil
6997	gravy
16025	great northern beans
1256	greek yogurt
11052	green beans
11333	green bell pepper
31015	green chili pepper
1441111	green food coloring
1019132	green grapes
1029195	green olives
11291	green onions
21052	greens
10093624	grill cheese
1022034	grill seasoning
2001	ground allspice
1022009	ground ancho chili
10023572	ground beef
5332	ground chicken
1052009	ground chipotle chile pepper
1012010	ground cinnamon
2010	ground cinnamon
2011	ground cloves
1002013	ground coriander seeds
1002014	ground cumin
12220	ground flaxseed
2021	ground ginger
17224	ground lamb
2022	ground mace
2025	ground nutmeg
10219	ground pork
7063	ground pork sausage
17142	ground veal
1023	gruyere
1009037	guacamole
1049	half n half
15036	halibut fillet
10151	ham
18350	hamburger buns
1129	hard cooked eggs
1006972	harissa
11390	hash brown potatoes
12120	hazelnuts
6987	healthy request cream of celery soup
93602	hemp seeds
1012042	herbes de provence
1002044	herbs
93743	hershey's kisses brand milk chocolates
6175	hoisin sauce
99227	honey mustard
1002055	horseradish
6168	hot sauce
16158	hummus
10014412	ice
19095	ice cream
19184	instant chocolate pudding mix
14214	instant coffee powder
10014214	instant espresso powder
19332	instant lemon pudding mix
10118375	instant yeast
93764	irish cream
10028033	italian bread
93651	italian cheese blend
7036	italian sausages
1022027	italian seasoning
99002	jaggery
11979	jalapeno
10120444	jasmine rice
19297	jelly
11603	jicama
93645	jimmies
1019016	juice
10520420	jumbo shell pasta
93633	kaffir lime leaves
93716	kahlua
1009195	kalamata olives
11233	kale
11935	ketchup
93768	kitchen bouquet
9148	kiwis
1082047	kosher salt
18423	ladyfingers
10017224	lamb
10620420	lasagna noodles
18133	lb cake
23557	lean ground beef
5662	lean ground turkey
10060	lean pork tenderloin
11246	leeks
17013	leg of lamb
9150	lemon
93834	lemon curd
12311111	lemon extract
9152	lemon juice
9156	lemon peel
1012030	lemon pepper
1029150	lemon wedges
11972	lemongrass
11252	lettuce
93623	lettuce leaves
4602	light butter
99009	light coconut milk
19350	light corn syrup
43274	light cream cheese
4641	light mayonnaise
1054053	light olive oil
10216124	light soy sauce
9159	lime
9160	lime juice
1029159	lime wedges
1009159	lime zest
10720420	linguine
93627	liquid smoke
10811111	liquid stevia
14037	liquor
15147	live lobster
10220444	long-grain rice
1088	low fat buttermilk
1082	low fat milk
1174	low fat milk
1117	low fat plain yogurt
1037	low fat ricotta cheese
1179	low fat sour cream
6970	low sodium chicken broth
16424	low sodium soy sauce
1006970	low-sodium chicken stock
10093741	lower sodium beef broth
10115136	lump crab
19157	m&m candies
12131	macadamia nuts
32004	macaroni and cheese mix
2015	madras curry powder
14311	malt drink mix
9383	mandarin orange sections
9218	mandarin oranges
9176	mango
19911	maple syrup
9328	maraschino cherries
4073	margarine
10111549	marinara sauce
2023	marjoram
14057	marsala wine
93644	marshmallow fluff
19116	marshmallows
20317	masa harina
93820	mascarpone
99144	mat beans
98932	matcha tea
4025	mayonnaise
1015006	meat
1065062	meat
10110219	meatballs
9421	medjool dates
93772	mexican cream
1009152	meyer lemon juice
1077	milk
10019146	milk chocolate chips
98991	mint chutney
20048	minute rice
4014	miracle whip
93830	mirin
16112	miso
19304	molasses
1001025	monterey jack cheese
11260	mushroom
15164	mussels
2046	mustard
2024	mustard seeds
11119	napa cabbage
9202	navel oranges
9191	nectarine
11352	new potatoes
1011256	non-fat greek yogurt
1200	nonfat cool whip
1085	nonfat milk
11446	nori
12195	nut butter
93620	nut meal
19125	nutella
93690	nutritional yeast
20132	oat flour
8120	oats
4582	oil
11956	oil packed sun dried tomatoes
11278	okra
1052034	old bay seasoning
4053	olive oil
9195	olives
11282	onion
2026	onion powder
6094	onion soup mix
9200	orange
10011821	orange bell pepper
9206	orange juice
9214	orange juice concentrate
10414534	orange liqueur
19303	orange marmalade
12511111	orange oil
9216	orange zest
2027	oregano
10018166	oreo cookies
10920420	orzo
6176	oyster sauce
15167	oysters
93831	palm sugar
10410123	pancetta
98847	paneer
10018079	panko
9226	papaya
2028	paprika
1033	parmigiano reggiano
11297	parsley
2029	parsley flakes
11298	parsnip
1028	part-skim mozzarella cheese
20420	pasta
99036	pasta salad mix
10011549	pasta sauce
10020080	pastry flour
9236	peach
16098	peanut butter
93762	peanut butter chips
19150	peanut butter cups
4042	peanut oil
16091	peanuts
98988	pear liqueur
20005	pearl barley
10111282	pearl onions
11304	peas
12142	pecan
10012142	pecan pieces
1038	pecorino
11120420	penne
11976	peperoncino
1025	pepper jack cheese
1022030	peppercorns
98858	peppermint baking chips
1022050	peppermint extract
7057	pepperoni
10111333	peppers
93698	pesto
11944	pickle relish
11937	pickles
27027	pico de gallo
18334	pie crust
1049195	pimento stuffed olives
11943	pimientos
12147	pine nuts
9266	pineapple
1029354	pineapple chunks
9354	pineapple in juice
9273	pineapple juice
1032047	pink himalayan salt
16043	pinto beans
12151	pistachios
18413	pita
93770	pizza crust
98924	pizza mix
1001256	plain greek yogurt
1118	plain nonfat yogurt
1001116	plain yogurt
9277	plantain
9279	plum
10411529	plum tomatoes
10011333	poblano peppers
10035137	polenta
7059	polish sausage
9442	pomegranate juice
10042040	pomegranate molasses
9286	pomegranate seeds
19034	popcorn
2033	poppy seeds
10010219	pork
16009	Pork & Beans
10005	pork belly
10084	pork butt
10010062	pork chops
1007063	pork links
10062	pork loin chops
10225	pork loin roast
10010225	pork roast
10072	pork shoulder
10218	pork tenderloin
10114057	port
11265	portabella mushrooms
23612	pot roast
19411	potato chips
11413	potato starch
11362	potatoes
2034	poultry seasoning
19336	powdered sugar
19047	pretzel sandwiches
1253	processed american cheese
10010123	prosciutto
1035	provolone cheese
9291	prunes
18337	puff pastry
11422	pumpkin
11426	pumpkin pie filling
1002035	pumpkin pie spice
11424	pumpkin puree
12014	pumpkin seeds
1228	queso fresco
8402	quick cooking oats
20035	quinoa
93773	quinoa flour
11952	radicchio
11429	radishes
9299	raisins
10193663	rajma masala
6583	ramen noodles
4639	ranch dressing
93733	ranch dressing mix
9302	raspberries
10719297	raspberry jam
12087	raw cashews
15152	raw shrimp
93721	ready-to-serve Asian fried rice
99229	real bacon recipe pieces
1079003	red apples
11821	red bell peppers
11112	red cabbage
11819	red chilli
1059003	red delicious apples
1451111	red food coloring
98926	red grapefruit juice
9132	red grapes
16033	red kidney beans
10016069	red lentils
10011282	red onion
1032009	red pepper flakes
2031	red pepper powder
10011355	red potatoes
18157	red velvet cookie
14096	red wine
1022068	red wine vinegar
1001168	reduced fat shredded cheddar cheese
16202	refried beans
93618	refrigerated crescent rolls
93610	refrigerated pizza dough
18205	refrigerated sugar cookie dough
9307	rhubarb
98937	rib tips
20444	rice
20061	rice flour
8065	rice krispies cereal
93761	rice milk
20133	rice noodles
10118368	rice paper
93784	rice syrup
1022053	rice vinegar
43479	rice wine
1036	ricotta salata
18621	ritz crackers
93713	roast beef
5114	roasted chicken
12135	roasted nuts
16092	roasted peanuts
11916	roasted red peppers
10211529	roma tomatoes
10111251	romaine lettuce
10011298	root vegetables
2036	rosemary
11320420	rotini pasta
5348	rotisserie chicken
23617	round steak
1012034	rub
12211111	rum extract
19296	runny honey
11353	russet potatoes
11435	rutabaga
18060	rye bread
98905	rye meal
2037	saffron threads
2038	sage
99226	sage leaves
4114	salad dressing
7071	salami
15076	salmon fillet
6164	salsa
27028	salsa verde
2047	salt
1102047	salt and pepper
1001001	salted butter
18228	saltine crackers
18353	sandwich bun
11439	sauerkraut
1017063	sausage
1037063	sausage links
10011819	scotch bonnet chili
1012047	sea salt
10015172	sea scallops
18376	seasoned bread crumbs
1032053	seasoned rice vinegar
1042047	seasoned salt
1042027	seasoning
1032027	seasoning blend
93818	seeds
20129	self-rising flour
10019903	semi sweet chocolate chips
11977	serrano chile
4058	sesame oil
10018350	sesame seed hamburger buns
12023	sesame seeds
11677	shallot
1031009	sharp cheddar cheese
1011019	sheeps milk cheese
11020420	shells
10114106	sherry
10214106	sherry
1012068	sherry vinegar
11238	shiitake mushroom caps
10120052	short grain rice
20499	short pasta
10013149	short ribs
18192	shortbread cookies
10018338	shortcrust pastry
4615	shortening
1001009	shredded cheddar cheese
1011026	shredded cheese
1005114	shredded chicken
12108	shredded coconut
1001251	shredded mexican cheese blend
1251	shredded mexican cheese blend
1001026	shredded mozzarella
16161	silken tofu
23625	sirloin steak
93630	skim milk ricotta
99033	skim vanilla greek yogurt
1005091	skin-on bone-in chicken leg quarters
1045062	skinless boneless chicken breast halves
5096	skinless boneless chicken thighs
93718	skinned black gram
43016	slaw dressing
10011109	slaw mix
10012061	slivered almonds
1012028	smoked paprika
15077	smoked salmon
7916	smoked sausage
16150	smooth peanut butter
15101	snapper fillets
11300	snow peas
14121	soda water
1056	sour cream
99169	sourdough bowl
10118029	sourdough bread
16223	soy milk
16122	soy protein powder
16124	soy sauce
11420420	spaghetti
11492	spaghetti squash
43155	sparkling wine
93823	spelt flour
1022046	spicy brown mustard
10011457	spinach
14144	sprite
11001	sprouts
10011485	squash
1016168	sriracha sauce
23232	steaks
93695	steel cut oats
93628	stevia
10023618	stew meat
11583	stew vegetables
1006615	stock
18338	store-bought phyllo
93619	stout
9316	strawberries
10819297	strawberry jam
10219172	strawberry jello
18082	stuffing
18081	stuffing mix
98940	sub rolls
19335	sugar
10011300	sugar snap peas
90480	sugar syrup
99190	sukrin sweetener
98961	summer savory
11641	summer squash
4584	sunflower oil
12036	sunflower seeds
98962	sweet chilli sauce
11294	sweet onion
1002028	sweet paprika
93640	sweet pickle juice
11945	sweet pickle relish
11507	sweet potato
14355	sweet tea
12109	sweetened coconut
1095	sweetened condensed milk
12179	sweetened shredded coconut
11147	swiss chard
1040	swiss cheese
2073	taco seasoning mix
18360	taco shells
12698	tahini
10116124	tamari
93696	tapioca flour
2041	tarragon
1029003	tart apple
10111111	tea bags
10814037	tequila
6112	teriyaki sauce
1012044	thai basil
11670	thai chiles
93605	thai red curry paste
10310123	thick-cut bacon
15261	tilapia fillets
18070	toast
19383	toffee bits
16213	tofu
11954	tomatillos
11886	tomato juice
11887	tomato paste
11547	tomato puree
11549	tomato sauce
6159	tomato soup
11529	tomatoes
13523	top blade steak
23636	top round steak
23584	Top Sirloin
18364	tortilla
19056	tortilla chips
14534	triple sec
1024053	truffle oil
10015121	tuna
19908	turbinado sugar
5165	turkey
5696	turkey breast
7955	turkey kielbasa
2043	turmeric
11564	turnips
10020081	unbleached flour
1145	unsalted butter
10130	unsmoked back bacon
9019	unsweetened applesauce
12117	unsweetened coconut milk
10012108	unsweetened shredded coconut
93622	vanilla bean
93813	vanilla bean paste
1012050	vanilla essence
2050	vanilla extract
10019230	vanilla frosting
19206	vanilla instant pudding mix
99076	vanilla protein powder
18609	vanilla wafers
1119	vanilla yogurt
93701	vegan cheese
98848	vegan chocolate chips
4673	vegan margarine
6615	vegetable broth
4513	vegetable oil
16542	vegetarian bacon
14132	vermouth
4135	vinaigrette
2053	vinegar
14051	vodka
12155	walnuts
14412	water
11590	water chestnuts
15121	water-packed tuna
11591	watercress
9326	watermelon chunks
20077	wheat bran
20078	wheat germ
1054	whipped cream
42135	whipped topping
1001053	whipping cream
14052	whiskey
1012069	white balsamic vinegar
18069	white bread
18137	white cake mix
1011009	white cheddar
19087	white chocolate
10019087	white chocolate chips
10611282	white onion
2032	white pepper
93824	white whole wheat flour
14106	white wine
1002068	white wine vinegar
1002001	whole allspice berries
5006	whole chicken
2013	whole coriander seeds
9081	whole cranberry sauce
11177	whole kernel corn
1012002	whole star anise
18075	whole wheat bread
20080	whole wheat flour
93675	whole wheat tortillas
1012046	whole-grain mustard
14084	wine
2068	wine vinegar
10111485	winter squash
10018368	won ton wraps
6971	worcestershire sauce
10018364	wraps
93626	xanthan gum
18375	yeast
11951	yellow bell pepper
18144	yellow cake mix
10511282	yellow onion
1116	yogurt
10211362	yukon gold potato
\.


--
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.instructions (instruction_id, recipe_id, step_num, step_instruction) FROM stdin;
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.recipe_ingredients (rec_ing_id, recipe_id, ingredient_id, amount, unit) FROM stdin;
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.recipes (recipe_id, title, image, servings, cooking_mins, prep_mins, ready_mins) FROM stdin;
\.


--
-- Data for Name: saved_recipes; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.saved_recipes (saved_id, recipe_id, user_id, favorite) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: vagrant
--

COPY public.users (user_id, email, password) FROM stdin;
\.


--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.equipment_equipment_id_seq', 1, false);


--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 1, false);


--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.instructions_instruction_id_seq', 1, false);


--
-- Name: recipe_ingredients_rec_ing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.recipe_ingredients_rec_ing_id_seq', 1, false);


--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.recipes_recipe_id_seq', 1, false);


--
-- Name: saved_recipes_saved_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.saved_recipes_saved_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vagrant
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (equipment_id);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);


--
-- Name: instructions instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY (instruction_id);


--
-- Name: recipe_ingredients recipe_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (rec_ing_id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);


--
-- Name: saved_recipes saved_recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.saved_recipes
    ADD CONSTRAINT saved_recipes_pkey PRIMARY KEY (saved_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: equipment equipment_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: instructions instructions_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: recipe_ingredients recipe_ingredients_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id);


--
-- Name: recipe_ingredients recipe_ingredients_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: saved_recipes saved_recipes_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.saved_recipes
    ADD CONSTRAINT saved_recipes_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: saved_recipes saved_recipes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vagrant
--

ALTER TABLE ONLY public.saved_recipes
    ADD CONSTRAINT saved_recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

