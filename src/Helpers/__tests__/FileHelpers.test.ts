
import * as path from 'path';
import { App, TFile } from 'obsidian';
import * as fs from 'fs';
import { FileHelper } from 'obsidian-sharpener-common/FileHelpers';

// Mocking the App and TFile classes
let testData = fs.readFileSync(path.join("/Users/artemdvoryadkin/Projects/obsidian-sharpener/src/Helpers/__tests__/", 'testData.md'), 'utf8');
const mockApp = {
	workspace: {
		getActiveFile: jest.fn().mockReturnValue({
			path: 'test-.md',
			extension: 'md',
		}),
	},
	metadataCache: {
		getFileCache: jest.fn().mockReturnValue({
			"links": [
				{
					"link": "Building a Second Brain - Tiago Forte. ЗМКН.Создай свой \"Второй мозг\".md",
					"original": "[Building a Second Brain - Tiago Forte. ЗМКН.Создай свой \"Второй мозг\"](Building%20a%20Second%20Brain%20-%20Tiago%20Forte.%20ЗМКН.Создай%20свой%20\"Второй%20мозг\".md)",
					"displayText": "Building a Second Brain - Tiago Forte. ЗМКН.Создай свой \"Второй мозг\"",
					"position": {
						"start": {
							"line": 54,
							"col": 4,
							"offset": 2668
						},
						"end": {
							"line": 54,
							"col": 169,
							"offset": 2833
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=5&selection=2,0,4,22&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=5&selection=2,0,4,22&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 62,
							"col": 35,
							"offset": 3395
						},
						"end": {
							"line": 62,
							"col": 97,
							"offset": 3457
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=6&selection=24,47,25,55&color=note",
					"original": "[p.6](Второй_мозг.pdf#page=6&selection=24,47,25,55&color=note)",
					"displayText": "p.6",
					"position": {
						"start": {
							"line": 64,
							"col": 75,
							"offset": 3534
						},
						"end": {
							"line": 64,
							"col": 137,
							"offset": 3596
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=6&selection=26,0,34,2",
					"original": "[p.6](Второй_мозг.pdf#page=6&selection=26,0,34,2)",
					"displayText": "p.6",
					"position": {
						"start": {
							"line": 66,
							"col": 229,
							"offset": 3827
						},
						"end": {
							"line": 66,
							"col": 278,
							"offset": 3876
						}
					}
				},
				{
					"link": "Второй_мозгуправления личными знаниями",
					"original": "[[Второй_мозгуправления личными знаниями|УЛЗ]]",
					"displayText": "УЛЗ",
					"position": {
						"start": {
							"line": 67,
							"col": 2,
							"offset": 3879
						},
						"end": {
							"line": 67,
							"col": 48,
							"offset": 3925
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=6&selection=35,1,41,15",
					"original": "[p.6](Второй_мозг.pdf#page=6&selection=35,1,41,15)",
					"displayText": "p.6",
					"position": {
						"start": {
							"line": 67,
							"col": 394,
							"offset": 4271
						},
						"end": {
							"line": 67,
							"col": 444,
							"offset": 4321
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=10&selection=0,7,3,27",
					"original": "[page](Второй_мозг.pdf#page=10&selection=0,7,3,27)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 69,
							"col": 50,
							"offset": 4375
						},
						"end": {
							"line": 69,
							"col": 100,
							"offset": 4425
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=11&selection=2,0,4,19&color=yellow",
					"original": "[p.11](Второй_мозг.pdf#page=11&selection=2,0,4,19&color=yellow)",
					"displayText": "p.11",
					"position": {
						"start": {
							"line": 71,
							"col": 32,
							"offset": 4459
						},
						"end": {
							"line": 71,
							"col": 95,
							"offset": 4522
						}
					}
				},
				{
					"link": "Человеческий капитал",
					"original": "[[Человеческий капитал|Человеческий капитал]]",
					"displayText": "Человеческий капитал",
					"position": {
						"start": {
							"line": 73,
							"col": 3,
							"offset": 4527
						},
						"end": {
							"line": 73,
							"col": 48,
							"offset": 4572
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=17&selection=24,44,30,1&color=yellow",
					"original": "[p.17](Второй_мозг.pdf#page=17&selection=24,44,30,1&color=yellow)",
					"displayText": "p.17",
					"position": {
						"start": {
							"line": 73,
							"col": 196,
							"offset": 4720
						},
						"end": {
							"line": 73,
							"col": 261,
							"offset": 4785
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=18&selection=14,0,15,60&color=yellow",
					"original": "[p.18](Второй_мозг.pdf#page=18&selection=14,0,15,60&color=yellow)",
					"displayText": "p.18",
					"position": {
						"start": {
							"line": 75,
							"col": 122,
							"offset": 4909
						},
						"end": {
							"line": 75,
							"col": 187,
							"offset": 4974
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=20&selection=2,0,4,24&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=20&selection=2,0,4,24&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 82,
							"col": 37,
							"offset": 5340
						},
						"end": {
							"line": 82,
							"col": 100,
							"offset": 5403
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=20&selection=15,0,19,43&color=red",
					"original": "[p.20](Второй_мозг.pdf#page=20&selection=15,0,19,43&color=red)",
					"displayText": "p.20",
					"position": {
						"start": {
							"line": 84,
							"col": 276,
							"offset": 5681
						},
						"end": {
							"line": 84,
							"col": 338,
							"offset": 5743
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=21&selection=8,0,13,0&color=red",
					"original": "[p.21](Второй_мозг.pdf#page=21&selection=8,0,13,0&color=red)",
					"displayText": "p.21",
					"position": {
						"start": {
							"line": 87,
							"col": 161,
							"offset": 6130
						},
						"end": {
							"line": 87,
							"col": 221,
							"offset": 6190
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=21&selection=13,2,19,1&color=red",
					"original": "[p.21](Второй_мозг.pdf#page=21&selection=13,2,19,1&color=red)",
					"displayText": "p.21",
					"position": {
						"start": {
							"line": 89,
							"col": 306,
							"offset": 6498
						},
						"end": {
							"line": 89,
							"col": 367,
							"offset": 6559
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=26&selection=16,0,19,49&color=yellow",
					"original": "[p.26](Второй_мозг.pdf#page=26&selection=16,0,19,49&color=yellow)",
					"displayText": "p.26",
					"position": {
						"start": {
							"line": 95,
							"col": 229,
							"offset": 7375
						},
						"end": {
							"line": 95,
							"col": 294,
							"offset": 7440
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=27&selection=10,0,34,13&color=yellow",
					"original": "[p.27](Второй_мозг.pdf#page=27&selection=10,0,34,13&color=yellow)",
					"displayText": "p.27",
					"position": {
						"start": {
							"line": 102,
							"col": 120,
							"offset": 8048
						},
						"end": {
							"line": 102,
							"col": 185,
							"offset": 8113
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=27&selection=42,0,52,13&color=red",
					"original": "[p.27](Второй_мозг.pdf#page=27&selection=42,0,52,13&color=red)",
					"displayText": "p.27",
					"position": {
						"start": {
							"line": 104,
							"col": 220,
							"offset": 8335
						},
						"end": {
							"line": 104,
							"col": 282,
							"offset": 8397
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#PAGE=28&SELECTION=30,7,37,27&COLOR=RED",
					"original": "[P.28](Второй_мозг.pdf#PAGE=28&SELECTION=30,7,37,27&COLOR=RED)",
					"displayText": "P.28",
					"position": {
						"start": {
							"line": 106,
							"col": 649,
							"offset": 9048
						},
						"end": {
							"line": 106,
							"col": 711,
							"offset": 9110
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#PAGE=28&SELECTION=38,0,41,13&COLOR=YELLOW",
					"original": "[P.28](Второй_мозг.pdf#PAGE=28&SELECTION=38,0,41,13&COLOR=YELLOW)",
					"displayText": "P.28",
					"position": {
						"start": {
							"line": 108,
							"col": 184,
							"offset": 9296
						},
						"end": {
							"line": 108,
							"col": 249,
							"offset": 9361
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=28&selection=45,41,48,7&color=yellow",
					"original": "[p.28](Второй_мозг.pdf#page=28&selection=45,41,48,7&color=yellow)",
					"displayText": "p.28",
					"position": {
						"start": {
							"line": 110,
							"col": 138,
							"offset": 9501
						},
						"end": {
							"line": 110,
							"col": 203,
							"offset": 9566
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=31&selection=25,0,27,21&color=yellow",
					"original": "[p.31](Второй_мозг.pdf#page=31&selection=25,0,27,21&color=yellow)",
					"displayText": "p.31",
					"position": {
						"start": {
							"line": 112,
							"col": 133,
							"offset": 9701
						},
						"end": {
							"line": 112,
							"col": 198,
							"offset": 9766
						}
					}
				},
				{
					"link": "GTD",
					"original": "[[GTD]]",
					"displayText": "GTD",
					"position": {
						"start": {
							"line": 116,
							"col": 161,
							"offset": 10017
						},
						"end": {
							"line": 116,
							"col": 168,
							"offset": 10024
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=36&selection=0,2,11,23&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=36&selection=0,2,11,23&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 118,
							"col": 39,
							"offset": 10066
						},
						"end": {
							"line": 118,
							"col": 103,
							"offset": 10130
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=37&selection=4,0,4,25&color=h3",
					"original": "[p.37](Второй_мозг.pdf#page=37&selection=4,0,4,25&color=h3)",
					"displayText": "p.37",
					"position": {
						"start": {
							"line": 123,
							"col": 30,
							"offset": 10326
						},
						"end": {
							"line": 123,
							"col": 89,
							"offset": 10385
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=37&selection=6,0,19,37&color=yellow",
					"original": "[p.37](Второй_мозг.pdf#page=37&selection=6,0,19,37&color=yellow)",
					"displayText": "p.37",
					"position": {
						"start": {
							"line": 129,
							"col": 49,
							"offset": 10679
						},
						"end": {
							"line": 129,
							"col": 113,
							"offset": 10743
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=37&selection=22,0,23,24&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=37&selection=22,0,23,24&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 131,
							"col": 61,
							"offset": 10806
						},
						"end": {
							"line": 131,
							"col": 126,
							"offset": 10871
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=38&selection=13,0,16,16&color=important",
					"original": "[p.38](Второй_мозг.pdf#page=38&selection=13,0,16,16&color=important)",
					"displayText": "p.38",
					"position": {
						"start": {
							"line": 133,
							"col": 198,
							"offset": 11071
						},
						"end": {
							"line": 133,
							"col": 266,
							"offset": 11139
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=38&selection=18,29,24,1&color=important",
					"original": "[p.38](Второй_мозг.pdf#page=38&selection=18,29,24,1&color=important)",
					"displayText": "p.38",
					"position": {
						"start": {
							"line": 135,
							"col": 259,
							"offset": 11400
						},
						"end": {
							"line": 135,
							"col": 327,
							"offset": 11468
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=38&selection=26,0,27,38&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=38&selection=26,0,27,38&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 137,
							"col": 75,
							"offset": 11545
						},
						"end": {
							"line": 137,
							"col": 140,
							"offset": 11610
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=38&selection=29,0,30,48&color=yellow",
					"original": "[p.38](Второй_мозг.pdf#page=38&selection=29,0,30,48&color=yellow)",
					"displayText": "p.38",
					"position": {
						"start": {
							"line": 139,
							"col": 114,
							"offset": 11726
						},
						"end": {
							"line": 139,
							"col": 179,
							"offset": 11791
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=39&selection=7,0,13,61&color=yellow",
					"original": "[p.39](Второй_мозг.pdf#page=39&selection=7,0,13,61&color=yellow)",
					"displayText": "p.39",
					"position": {
						"start": {
							"line": 141,
							"col": 424,
							"offset": 12217
						},
						"end": {
							"line": 141,
							"col": 488,
							"offset": 12281
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=39&selection=15,0,16,41&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=39&selection=15,0,16,41&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 143,
							"col": 78,
							"offset": 12361
						},
						"end": {
							"line": 143,
							"col": 143,
							"offset": 12426
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=39&selection=18,0,31,54&color=yellow",
					"original": "[p.39](Второй_мозг.pdf#page=39&selection=18,0,31,54&color=yellow)",
					"displayText": "p.39",
					"position": {
						"start": {
							"line": 145,
							"col": 220,
							"offset": 12648
						},
						"end": {
							"line": 145,
							"col": 285,
							"offset": 12713
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=40&selection=3,17,7,43&color=yellow",
					"original": "[p.40](Второй_мозг.pdf#page=40&selection=3,17,7,43&color=yellow)",
					"displayText": "p.40",
					"position": {
						"start": {
							"line": 147,
							"col": 263,
							"offset": 12978
						},
						"end": {
							"line": 147,
							"col": 327,
							"offset": 13042
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=40&selection=9,0,10,39&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=40&selection=9,0,10,39&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 149,
							"col": 76,
							"offset": 13120
						},
						"end": {
							"line": 149,
							"col": 140,
							"offset": 13184
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=40&selection=12,0,14,19",
					"original": "[p.40](Второй_мозг.pdf#page=40&selection=12,0,14,19)",
					"displayText": "p.40",
					"position": {
						"start": {
							"line": 151,
							"col": 137,
							"offset": 13323
						},
						"end": {
							"line": 151,
							"col": 189,
							"offset": 13375
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=41&selection=9,0,12,8",
					"original": "[p.41](Второй_мозг.pdf#page=41&selection=9,0,12,8)",
					"displayText": "p.41",
					"position": {
						"start": {
							"line": 153,
							"col": 195,
							"offset": 13572
						},
						"end": {
							"line": 153,
							"col": 245,
							"offset": 13622
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=41&selection=19,0,20,38",
					"original": "[page](Второй_мозг.pdf#page=41&selection=19,0,20,38)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 155,
							"col": 84,
							"offset": 13708
						},
						"end": {
							"line": 155,
							"col": 136,
							"offset": 13760
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=42&selection=5,0,53,29",
					"original": "[p.42](Второй_мозг.pdf#page=42&selection=5,0,53,29)",
					"displayText": "p.42",
					"position": {
						"start": {
							"line": 161,
							"col": 299,
							"offset": 15262
						},
						"end": {
							"line": 161,
							"col": 350,
							"offset": 15313
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=44&selection=1,0,4,7",
					"original": "[p.44](Второй_мозг.pdf#page=44&selection=1,0,4,7)",
					"displayText": "p.44",
					"position": {
						"start": {
							"line": 165,
							"col": 190,
							"offset": 15593
						},
						"end": {
							"line": 165,
							"col": 239,
							"offset": 15642
						}
					}
				},
				{
					"link": "перфекционизм.md",
					"original": "[перфекционизма](перфекционизм.md)",
					"displayText": "перфекционизма",
					"position": {
						"start": {
							"line": 167,
							"col": 11,
							"offset": 15724
						},
						"end": {
							"line": 167,
							"col": 45,
							"offset": 15758
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=44&selection=12,0,13,38",
					"original": "[page](Второй_мозг.pdf#page=44&selection=12,0,13,38)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 169,
							"col": 74,
							"offset": 16197
						},
						"end": {
							"line": 169,
							"col": 126,
							"offset": 16249
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=44&selection=15,0,22,1",
					"original": "[p.44](Второй_мозг.pdf#page=44&selection=15,0,22,1)",
					"displayText": "p.44",
					"position": {
						"start": {
							"line": 171,
							"col": 158,
							"offset": 16409
						},
						"end": {
							"line": 171,
							"col": 209,
							"offset": 16460
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=44&selection=27,0,31,15",
					"original": "[p.44](Второй_мозг.pdf#page=44&selection=27,0,31,15)",
					"displayText": "p.44",
					"position": {
						"start": {
							"line": 173,
							"col": 245,
							"offset": 16707
						},
						"end": {
							"line": 173,
							"col": 297,
							"offset": 16759
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=44&selection=42,0,59,1",
					"original": "[p.44](Второй_мозг.pdf#page=44&selection=42,0,59,1)",
					"displayText": "p.44",
					"position": {
						"start": {
							"line": 175,
							"col": 151,
							"offset": 16912
						},
						"end": {
							"line": 175,
							"col": 202,
							"offset": 16963
						}
					}
				},
				{
					"link": "MoC, Map of Content.md",
					"original": "[MoC](MoC,%20Map%20of%20Content.md)",
					"displayText": "MoC",
					"position": {
						"start": {
							"line": 177,
							"col": 27,
							"offset": 16992
						},
						"end": {
							"line": 177,
							"col": 62,
							"offset": 17027
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=45&selection=18,3,25,34",
					"original": "[p.45](Второй_мозг.pdf#page=45&selection=18,3,25,34)",
					"displayText": "p.45",
					"position": {
						"start": {
							"line": 179,
							"col": 377,
							"offset": 17453
						},
						"end": {
							"line": 179,
							"col": 429,
							"offset": 17505
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=46&selection=13,0,14,33",
					"original": "[page](Второй_мозг.pdf#page=46&selection=13,0,14,33)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 181,
							"col": 61,
							"offset": 17568
						},
						"end": {
							"line": 181,
							"col": 113,
							"offset": 17620
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=46&selection=16,0,31,18&color=yellow",
					"original": "[p.46](Второй_мозг.pdf#page=46&selection=16,0,31,18&color=yellow)",
					"displayText": "p.46",
					"position": {
						"start": {
							"line": 183,
							"col": 266,
							"offset": 17888
						},
						"end": {
							"line": 183,
							"col": 331,
							"offset": 17953
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=47&selection=34,0,35,40&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=47&selection=34,0,35,40&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 186,
							"col": 62,
							"offset": 18090
						},
						"end": {
							"line": 186,
							"col": 127,
							"offset": 18155
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=48&selection=10,0,14,37&color=yellow",
					"original": "[p.48](Второй_мозг.pdf#page=48&selection=10,0,14,37&color=yellow)",
					"displayText": "p.48",
					"position": {
						"start": {
							"line": 188,
							"col": 269,
							"offset": 18426
						},
						"end": {
							"line": 188,
							"col": 334,
							"offset": 18491
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=48&selection=28,0,36,43&color=yellow",
					"original": "[p.48](Второй_мозг.pdf#page=48&selection=28,0,36,43&color=yellow)",
					"displayText": "p.48",
					"position": {
						"start": {
							"line": 192,
							"col": 168,
							"offset": 18870
						},
						"end": {
							"line": 192,
							"col": 233,
							"offset": 18935
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=49&selection=8,0,23,59&color=yellow",
					"original": "[p.49](Второй_мозг.pdf#page=49&selection=8,0,23,59&color=yellow)",
					"displayText": "p.49",
					"position": {
						"start": {
							"line": 194,
							"col": 367,
							"offset": 19304
						},
						"end": {
							"line": 194,
							"col": 431,
							"offset": 19368
						}
					}
				},
				{
					"link": "GTD",
					"original": "[[GTD|GTD]]",
					"displayText": "GTD",
					"position": {
						"start": {
							"line": 196,
							"col": 12,
							"offset": 19382
						},
						"end": {
							"line": 196,
							"col": 23,
							"offset": 19393
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=49&selection=25,0,26,40",
					"original": "[page](Второй_мозг.pdf#page=49&selection=25,0,26,40)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 198,
							"col": 63,
							"offset": 19570
						},
						"end": {
							"line": 198,
							"col": 115,
							"offset": 19622
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=50&selection=5,13,11,41",
					"original": "[p.50](Второй_мозг.pdf#page=50&selection=5,13,11,41)",
					"displayText": "p.50",
					"position": {
						"start": {
							"line": 200,
							"col": 157,
							"offset": 19781
						},
						"end": {
							"line": 200,
							"col": 209,
							"offset": 19833
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=50&selection=10,43,16,58",
					"original": "[p.50](Второй_мозг.pdf#page=50&selection=10,43,16,58)",
					"displayText": "p.50",
					"position": {
						"start": {
							"line": 202,
							"col": 150,
							"offset": 19985
						},
						"end": {
							"line": 202,
							"col": 203,
							"offset": 20038
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=50&selection=30,0,30,30",
					"original": "[page](Второй_мозг.pdf#page=50&selection=30,0,30,30)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 206,
							"col": 36,
							"offset": 20142
						},
						"end": {
							"line": 206,
							"col": 88,
							"offset": 20194
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=51&selection=4,0,8,1",
					"original": "[p.51](Второй_мозг.pdf#page=51&selection=4,0,8,1)",
					"displayText": "p.51",
					"position": {
						"start": {
							"line": 209,
							"col": 113,
							"offset": 20337
						},
						"end": {
							"line": 209,
							"col": 162,
							"offset": 20386
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=51&selection=25,0,29,11",
					"original": "[p.51](Второй_мозг.pdf#page=51&selection=25,0,29,11)",
					"displayText": "p.51",
					"position": {
						"start": {
							"line": 211,
							"col": 245,
							"offset": 20633
						},
						"end": {
							"line": 211,
							"col": 297,
							"offset": 20685
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=51&selection=33,0,37,59",
					"original": "[p.51](Второй_мозг.pdf#page=51&selection=33,0,37,59)",
					"displayText": "p.51",
					"position": {
						"start": {
							"line": 213,
							"col": 298,
							"offset": 20985
						},
						"end": {
							"line": 213,
							"col": 350,
							"offset": 21037
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=51&selection=38,0,50,16",
					"original": "[p.51](Второй_мозг.pdf#page=51&selection=38,0,50,16)",
					"displayText": "p.51",
					"position": {
						"start": {
							"line": 215,
							"col": 323,
							"offset": 21362
						},
						"end": {
							"line": 215,
							"col": 375,
							"offset": 21414
						}
					}
				},
				{
					"link": "Raycast",
					"original": "[[Raycast|Raycast]]",
					"displayText": "Raycast",
					"position": {
						"start": {
							"line": 218,
							"col": 63,
							"offset": 21606
						},
						"end": {
							"line": 218,
							"col": 82,
							"offset": 21625
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=52&selection=2,0,2,41&color=red",
					"original": "[page](Второй_мозг.pdf#page=52&selection=2,0,2,41&color=red)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 220,
							"col": 47,
							"offset": 21706
						},
						"end": {
							"line": 220,
							"col": 107,
							"offset": 21766
						}
					}
				},
				{
					"link": "Второй_мозгуправления личными знаниями",
					"original": "[[Второй_мозгуправления личными знаниями|УЛЗ управления личными знаниями]]",
					"displayText": "УЛЗ управления личными знаниями",
					"position": {
						"start": {
							"line": 222,
							"col": 129,
							"offset": 21897
						},
						"end": {
							"line": 222,
							"col": 203,
							"offset": 21971
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=52&selection=11,3,14,45&color=yellow",
					"original": "[p.52](Второй_мозг.pdf#page=52&selection=11,3,14,45&color=yellow)",
					"displayText": "p.52",
					"position": {
						"start": {
							"line": 222,
							"col": 272,
							"offset": 22040
						},
						"end": {
							"line": 222,
							"col": 337,
							"offset": 22105
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=52&selection=38,3,50,58&color=yellow",
					"original": "[p.52](Второй_мозг.pdf#page=52&selection=38,3,50,58&color=yellow)",
					"displayText": "p.52",
					"position": {
						"start": {
							"line": 224,
							"col": 280,
							"offset": 22387
						},
						"end": {
							"line": 224,
							"col": 345,
							"offset": 22452
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=53&selection=3,0,7,3&color=yellow",
					"original": "[p.53](Второй_мозг.pdf#page=53&selection=3,0,7,3&color=yellow)",
					"displayText": "p.53",
					"position": {
						"start": {
							"line": 226,
							"col": 120,
							"offset": 22574
						},
						"end": {
							"line": 226,
							"col": 182,
							"offset": 22636
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=54&selection=0,0,1,21&color=yellow",
					"original": "[p.54](Второй_мозг.pdf#page=54&selection=0,0,1,21&color=yellow)",
					"displayText": "p.54",
					"position": {
						"start": {
							"line": 228,
							"col": 76,
							"offset": 22714
						},
						"end": {
							"line": 228,
							"col": 139,
							"offset": 22777
						}
					}
				},
				{
					"link": "йога",
					"original": "[[йога|йоги]]",
					"displayText": "йоги",
					"position": {
						"start": {
							"line": 230,
							"col": 22,
							"offset": 22801
						},
						"end": {
							"line": 230,
							"col": 35,
							"offset": 22814
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=55&selection=0,0,2,11",
					"original": "[page](Второй_мозг.pdf#page=55&selection=0,0,2,11)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 232,
							"col": 36,
							"offset": 22960
						},
						"end": {
							"line": 232,
							"col": 86,
							"offset": 23010
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=56&selection=0,2,5,22",
					"original": "[page](Второй_мозг.pdf#page=56&selection=0,2,5,22)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 234,
							"col": 56,
							"offset": 23068
						},
						"end": {
							"line": 234,
							"col": 106,
							"offset": 23118
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=56&selection=28,0,30,20",
					"original": "[p.56](Второй_мозг.pdf#page=56&selection=28,0,30,20)",
					"displayText": "p.56",
					"position": {
						"start": {
							"line": 239,
							"col": 168,
							"offset": 23407
						},
						"end": {
							"line": 239,
							"col": 220,
							"offset": 23459
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=57&selection=16,0,16,32",
					"original": "[page](Второй_мозг.pdf#page=57&selection=16,0,16,32)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 243,
							"col": 37,
							"offset": 23815
						},
						"end": {
							"line": 243,
							"col": 89,
							"offset": 23867
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=58&selection=1,0,5,46",
					"original": "[p.58](Второй_мозг.pdf#page=58&selection=1,0,5,46)",
					"displayText": "p.58",
					"position": {
						"start": {
							"line": 245,
							"col": 286,
							"offset": 24155
						},
						"end": {
							"line": 245,
							"col": 336,
							"offset": 24205
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=59&selection=20,0,26,16",
					"original": "[p.59](Второй_мозг.pdf#page=59&selection=20,0,26,16)",
					"displayText": "p.59",
					"position": {
						"start": {
							"line": 249,
							"col": 372,
							"offset": 24847
						},
						"end": {
							"line": 249,
							"col": 424,
							"offset": 24899
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=60&selection=2,0,4,15",
					"original": "[page](Второй_мозг.pdf#page=60&selection=2,0,4,15)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 253,
							"col": 77,
							"offset": 25082
						},
						"end": {
							"line": 253,
							"col": 127,
							"offset": 25132
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=60&selection=16,31,18,36",
					"original": "[p.60](Второй_мозг.pdf#page=60&selection=16,31,18,36)",
					"displayText": "p.60",
					"position": {
						"start": {
							"line": 255,
							"col": 120,
							"offset": 25254
						},
						"end": {
							"line": 255,
							"col": 173,
							"offset": 25307
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=60&selection=32,0,36,57",
					"original": "[p.60](Второй_мозг.pdf#page=60&selection=32,0,36,57)",
					"displayText": "p.60",
					"position": {
						"start": {
							"line": 257,
							"col": 502,
							"offset": 25811
						},
						"end": {
							"line": 257,
							"col": 554,
							"offset": 25863
						}
					}
				},
				{
					"link": "Интеллектуальный актив",
					"original": "[[Интеллектуальный актив]]",
					"displayText": "Интеллектуальный актив",
					"position": {
						"start": {
							"line": 261,
							"col": 3,
							"offset": 25937
						},
						"end": {
							"line": 261,
							"col": 29,
							"offset": 25963
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=61&selection=42,19,48,31",
					"original": "[p.61](Второй_мозг.pdf#page=61&selection=42,19,48,31)",
					"displayText": "p.61",
					"position": {
						"start": {
							"line": 261,
							"col": 318,
							"offset": 26252
						},
						"end": {
							"line": 261,
							"col": 371,
							"offset": 26305
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=62&selection=4,0,50,53",
					"original": "[p.62](Второй_мозг.pdf#page=62&selection=4,0,50,53)",
					"displayText": "p.62",
					"position": {
						"start": {
							"line": 269,
							"col": 110,
							"offset": 27004
						},
						"end": {
							"line": 269,
							"col": 161,
							"offset": 27055
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=62&selection=58,0,104,35",
					"original": "[p.62](Второй_мозг.pdf#page=62&selection=58,0,104,35)",
					"displayText": "p.62",
					"position": {
						"start": {
							"line": 276,
							"col": 92,
							"offset": 27606
						},
						"end": {
							"line": 276,
							"col": 145,
							"offset": 27659
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=63&selection=24,0,28,9",
					"original": "[page](Второй_мозг.pdf#page=63&selection=24,0,28,9)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 278,
							"col": 27,
							"offset": 27688
						},
						"end": {
							"line": 278,
							"col": 78,
							"offset": 27739
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=63&selection=45,27,57,53",
					"original": "[p.63](Второй_мозг.pdf#page=63&selection=45,27,57,53)",
					"displayText": "p.63",
					"position": {
						"start": {
							"line": 285,
							"col": 137,
							"offset": 29195
						},
						"end": {
							"line": 285,
							"col": 190,
							"offset": 29248
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=64&selection=37,0,39,24",
					"original": "[page](Второй_мозг.pdf#page=64&selection=37,0,39,24)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 287,
							"col": 86,
							"offset": 29336
						},
						"end": {
							"line": 287,
							"col": 138,
							"offset": 29388
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=69&selection=31,0,33,18",
					"original": "[page](Второй_мозг.pdf#page=69&selection=31,0,33,18)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 290,
							"col": 86,
							"offset": 29525
						},
						"end": {
							"line": 290,
							"col": 138,
							"offset": 29577
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=70&selection=3,17,9,48",
					"original": "[p.70](Второй_мозг.pdf#page=70&selection=3,17,9,48)",
					"displayText": "p.70",
					"position": {
						"start": {
							"line": 292,
							"col": 391,
							"offset": 29970
						},
						"end": {
							"line": 292,
							"col": 442,
							"offset": 30021
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=70&selection=16,30,22,35",
					"original": "[p.70](Второй_мозг.pdf#page=70&selection=16,30,22,35)",
					"displayText": "p.70",
					"position": {
						"start": {
							"line": 294,
							"col": 180,
							"offset": 30203
						},
						"end": {
							"line": 294,
							"col": 233,
							"offset": 30256
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=70&selection=26,0,28,43",
					"original": "[p.70](Второй_мозг.pdf#page=70&selection=26,0,28,43)",
					"displayText": "p.70",
					"position": {
						"start": {
							"line": 296,
							"col": 152,
							"offset": 30410
						},
						"end": {
							"line": 296,
							"col": 204,
							"offset": 30462
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=70&selection=28,44,34,6",
					"original": "[p.70](Второй_мозг.pdf#page=70&selection=28,44,34,6)",
					"displayText": "p.70",
					"position": {
						"start": {
							"line": 298,
							"col": 88,
							"offset": 30552
						},
						"end": {
							"line": 298,
							"col": 140,
							"offset": 30604
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=70&selection=46,0,48,56",
					"original": "[p.70](Второй_мозг.pdf#page=70&selection=46,0,48,56)",
					"displayText": "p.70",
					"position": {
						"start": {
							"line": 300,
							"col": 164,
							"offset": 30770
						},
						"end": {
							"line": 300,
							"col": 216,
							"offset": 30822
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=71&selection=11,39,25,2",
					"original": "[p.71](Второй_мозг.pdf#page=71&selection=11,39,25,2)",
					"displayText": "p.71",
					"position": {
						"start": {
							"line": 306,
							"col": 194,
							"offset": 31569
						},
						"end": {
							"line": 306,
							"col": 246,
							"offset": 31621
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=71&selection=29,0,29,53",
					"original": "[page](Второй_мозг.pdf#page=71&selection=29,0,29,53)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 310,
							"col": 59,
							"offset": 31794
						},
						"end": {
							"line": 310,
							"col": 111,
							"offset": 31846
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=71&selection=31,0,34,38",
					"original": "[p.71](Второй_мозг.pdf#page=71&selection=31,0,34,38)",
					"displayText": "p.71",
					"position": {
						"start": {
							"line": 312,
							"col": 210,
							"offset": 32058
						},
						"end": {
							"line": 312,
							"col": 262,
							"offset": 32110
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=72&selection=1,0,4,59",
					"original": "[p.72](Второй_мозг.pdf#page=72&selection=1,0,4,59)",
					"displayText": "p.72",
					"position": {
						"start": {
							"line": 314,
							"col": 247,
							"offset": 32359
						},
						"end": {
							"line": 314,
							"col": 297,
							"offset": 32409
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=72&selection=6,0,6,47",
					"original": "[page](Второй_мозг.pdf#page=72&selection=6,0,6,47)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 316,
							"col": 53,
							"offset": 32464
						},
						"end": {
							"line": 316,
							"col": 103,
							"offset": 32514
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=72&selection=18,0,23,14",
					"original": "[p.72](Второй_мозг.pdf#page=72&selection=18,0,23,14)",
					"displayText": "p.72",
					"position": {
						"start": {
							"line": 318,
							"col": 307,
							"offset": 32823
						},
						"end": {
							"line": 318,
							"col": 359,
							"offset": 32875
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=72&selection=25,0,25,46",
					"original": "[page](Второй_мозг.pdf#page=72&selection=25,0,25,46)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 320,
							"col": 52,
							"offset": 32929
						},
						"end": {
							"line": 320,
							"col": 104,
							"offset": 32981
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=72&selection=27,0,33,16",
					"original": "[p.72](Второй_мозг.pdf#page=72&selection=27,0,33,16)",
					"displayText": "p.72",
					"position": {
						"start": {
							"line": 322,
							"col": 354,
							"offset": 33337
						},
						"end": {
							"line": 322,
							"col": 406,
							"offset": 33389
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=73&selection=3,0,8,58",
					"original": "[p.73](Второй_мозг.pdf#page=73&selection=3,0,8,58)",
					"displayText": "p.73",
					"position": {
						"start": {
							"line": 324,
							"col": 355,
							"offset": 33746
						},
						"end": {
							"line": 324,
							"col": 405,
							"offset": 33796
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=73&selection=10,0,11,31",
					"original": "[page](Второй_мозг.pdf#page=73&selection=10,0,11,31)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 326,
							"col": 62,
							"offset": 33860
						},
						"end": {
							"line": 326,
							"col": 114,
							"offset": 33912
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=73&selection=30,24,33,27",
					"original": "[p.73](Второй_мозг.pdf#page=73&selection=30,24,33,27)",
					"displayText": "p.73",
					"position": {
						"start": {
							"line": 328,
							"col": 179,
							"offset": 34093
						},
						"end": {
							"line": 328,
							"col": 232,
							"offset": 34146
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=73&selection=33,3,39,49",
					"original": "[p.73](Второй_мозг.pdf#page=73&selection=33,3,39,49)",
					"displayText": "p.73",
					"position": {
						"start": {
							"line": 330,
							"col": 367,
							"offset": 34515
						},
						"end": {
							"line": 330,
							"col": 419,
							"offset": 34567
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=73&selection=40,0,41,38",
					"original": "[p.73](Второй_мозг.pdf#page=73&selection=40,0,41,38)",
					"displayText": "p.73",
					"position": {
						"start": {
							"line": 332,
							"col": 92,
							"offset": 34661
						},
						"end": {
							"line": 332,
							"col": 144,
							"offset": 34713
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=74&selection=3,0,7,54",
					"original": "[p.74](Второй_мозг.pdf#page=74&selection=3,0,7,54)",
					"displayText": "p.74",
					"position": {
						"start": {
							"line": 334,
							"col": 279,
							"offset": 34994
						},
						"end": {
							"line": 334,
							"col": 329,
							"offset": 35044
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=74&selection=12,0,13,41",
					"original": "[p.74](Второй_мозг.pdf#page=74&selection=12,0,13,41)",
					"displayText": "p.74",
					"position": {
						"start": {
							"line": 336,
							"col": 94,
							"offset": 35140
						},
						"end": {
							"line": 336,
							"col": 146,
							"offset": 35192
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=74&selection=15,0,15,41",
					"original": "[page](Второй_мозг.pdf#page=74&selection=15,0,15,41)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 337,
							"col": 46,
							"offset": 35239
						},
						"end": {
							"line": 337,
							"col": 98,
							"offset": 35291
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=74&selection=18,51,20,34",
					"original": "[p.74](Второй_мозг.pdf#page=74&selection=18,51,20,34)",
					"displayText": "p.74",
					"position": {
						"start": {
							"line": 339,
							"col": 102,
							"offset": 35395
						},
						"end": {
							"line": 339,
							"col": 155,
							"offset": 35448
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=74&selection=23,34,30,16",
					"original": "[p.74](Второй_мозг.pdf#page=74&selection=23,34,30,16)",
					"displayText": "p.74",
					"position": {
						"start": {
							"line": 345,
							"col": 166,
							"offset": 35859
						},
						"end": {
							"line": 345,
							"col": 219,
							"offset": 35912
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=75&selection=3,0,6,59",
					"original": "[p.75](Второй_мозг.pdf#page=75&selection=3,0,6,59)",
					"displayText": "p.75",
					"position": {
						"start": {
							"line": 347,
							"col": 238,
							"offset": 36152
						},
						"end": {
							"line": 347,
							"col": 288,
							"offset": 36202
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=75&selection=7,0,11,1",
					"original": "[p.75](Второй_мозг.pdf#page=75&selection=7,0,11,1)",
					"displayText": "p.75",
					"position": {
						"start": {
							"line": 349,
							"col": 117,
							"offset": 36321
						},
						"end": {
							"line": 349,
							"col": 167,
							"offset": 36371
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=75&selection=18,22,23,1",
					"original": "[p.75](Второй_мозг.pdf#page=75&selection=18,22,23,1)",
					"displayText": "p.75",
					"position": {
						"start": {
							"line": 351,
							"col": 101,
							"offset": 36474
						},
						"end": {
							"line": 351,
							"col": 153,
							"offset": 36526
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=75&selection=33,0,35,5",
					"original": "[p.75](Второй_мозг.pdf#page=75&selection=33,0,35,5)",
					"displayText": "p.75",
					"position": {
						"start": {
							"line": 353,
							"col": 115,
							"offset": 36643
						},
						"end": {
							"line": 353,
							"col": 166,
							"offset": 36694
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=75&selection=36,0,37,37",
					"original": "[p.75](Второй_мозг.pdf#page=75&selection=36,0,37,37)",
					"displayText": "p.75",
					"position": {
						"start": {
							"line": 355,
							"col": 93,
							"offset": 36789
						},
						"end": {
							"line": 355,
							"col": 145,
							"offset": 36841
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=76&selection=5,0,7,54",
					"original": "[p.76](Второй_мозг.pdf#page=76&selection=5,0,7,54)",
					"displayText": "p.76",
					"position": {
						"start": {
							"line": 357,
							"col": 165,
							"offset": 37008
						},
						"end": {
							"line": 357,
							"col": 215,
							"offset": 37058
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=76&selection=13,28,20,48",
					"original": "[p.76](Второй_мозг.pdf#page=76&selection=13,28,20,48)",
					"displayText": "p.76",
					"position": {
						"start": {
							"line": 364,
							"col": 294,
							"offset": 37520
						},
						"end": {
							"line": 364,
							"col": 347,
							"offset": 37573
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=76&selection=22,0,23,46",
					"original": "[page](Второй_мозг.pdf#page=76&selection=22,0,23,46)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 366,
							"col": 76,
							"offset": 37651
						},
						"end": {
							"line": 366,
							"col": 128,
							"offset": 37703
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=79&selection=3,0,55,46",
					"original": "[p.79](Второй_мозг.pdf#page=79&selection=3,0,55,46)",
					"displayText": "p.79",
					"position": {
						"start": {
							"line": 375,
							"col": 333,
							"offset": 40264
						},
						"end": {
							"line": 375,
							"col": 384,
							"offset": 40315
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=80&selection=49,0,50,24",
					"original": "[page](Второй_мозг.pdf#page=80&selection=49,0,50,24)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 377,
							"col": 55,
							"offset": 40372
						},
						"end": {
							"line": 377,
							"col": 107,
							"offset": 40424
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=80&selection=59,0,64,58",
					"original": "[p.80](Второй_мозг.pdf#page=80&selection=59,0,64,58)",
					"displayText": "p.80",
					"position": {
						"start": {
							"line": 379,
							"col": 492,
							"offset": 40918
						},
						"end": {
							"line": 379,
							"col": 544,
							"offset": 40970
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=81&selection=6,0,9,8",
					"original": "[p.81](Второй_мозг.pdf#page=81&selection=6,0,9,8)",
					"displayText": "p.81",
					"position": {
						"start": {
							"line": 381,
							"col": 178,
							"offset": 41150
						},
						"end": {
							"line": 381,
							"col": 227,
							"offset": 41199
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=81&selection=16,3,31,1",
					"original": "[p.81](Второй_мозг.pdf#page=81&selection=16,3,31,1)",
					"displayText": "p.81",
					"position": {
						"start": {
							"line": 383,
							"col": 162,
							"offset": 41363
						},
						"end": {
							"line": 383,
							"col": 213,
							"offset": 41414
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=81&selection=35,0,38,15",
					"original": "[p.81](Второй_мозг.pdf#page=81&selection=35,0,38,15)",
					"displayText": "p.81",
					"position": {
						"start": {
							"line": 385,
							"col": 189,
							"offset": 41605
						},
						"end": {
							"line": 385,
							"col": 241,
							"offset": 41657
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=81&selection=38,17,41,37",
					"original": "[p.81](Второй_мозг.pdf#page=81&selection=38,17,41,37)",
					"displayText": "p.81",
					"position": {
						"start": {
							"line": 387,
							"col": 193,
							"offset": 41852
						},
						"end": {
							"line": 387,
							"col": 246,
							"offset": 41905
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=82&selection=20,0,24,53",
					"original": "[p.82](Второй_мозг.pdf#page=82&selection=20,0,24,53)",
					"displayText": "p.82",
					"position": {
						"start": {
							"line": 389,
							"col": 280,
							"offset": 42187
						},
						"end": {
							"line": 389,
							"col": 332,
							"offset": 42239
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=82&selection=30,0,31,27",
					"original": "[p.82](Второй_мозг.pdf#page=82&selection=30,0,31,27)",
					"displayText": "p.82",
					"position": {
						"start": {
							"line": 391,
							"col": 80,
							"offset": 42321
						},
						"end": {
							"line": 391,
							"col": 132,
							"offset": 42373
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=82&selection=35,35,36,58",
					"original": "[p.82](Второй_мозг.pdf#page=82&selection=35,35,36,58)",
					"displayText": "p.82",
					"position": {
						"start": {
							"line": 393,
							"col": 84,
							"offset": 42459
						},
						"end": {
							"line": 393,
							"col": 137,
							"offset": 42512
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=82&selection=38,0,39,20",
					"original": "[page](Второй_мозг.pdf#page=82&selection=38,0,39,20)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 395,
							"col": 61,
							"offset": 42575
						},
						"end": {
							"line": 395,
							"col": 113,
							"offset": 42627
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=83&selection=1,0,3,12",
					"original": "[p.83](Второй_мозг.pdf#page=83&selection=1,0,3,12)",
					"displayText": "p.83",
					"position": {
						"start": {
							"line": 397,
							"col": 130,
							"offset": 42759
						},
						"end": {
							"line": 397,
							"col": 180,
							"offset": 42809
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=83&selection=12,0,16,42",
					"original": "[p.83](Второй_мозг.pdf#page=83&selection=12,0,16,42)",
					"displayText": "p.83",
					"position": {
						"start": {
							"line": 399,
							"col": 269,
							"offset": 43080
						},
						"end": {
							"line": 399,
							"col": 321,
							"offset": 43132
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=84&selection=1,33,3,25",
					"original": "[p.84](Второй_мозг.pdf#page=84&selection=1,33,3,25)",
					"displayText": "p.84",
					"position": {
						"start": {
							"line": 401,
							"col": 115,
							"offset": 43249
						},
						"end": {
							"line": 401,
							"col": 166,
							"offset": 43300
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=85&selection=0,2,5,26",
					"original": "[page](Второй_мозг.pdf#page=85&selection=0,2,5,26)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 403,
							"col": 64,
							"offset": 43366
						},
						"end": {
							"line": 403,
							"col": 114,
							"offset": 43416
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=85&selection=7,0,12,19",
					"original": "[page](Второй_мозг.pdf#page=85&selection=7,0,12,19)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 406,
							"col": 39,
							"offset": 43573
						},
						"end": {
							"line": 406,
							"col": 90,
							"offset": 43624
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=85&selection=22,51,29,45",
					"original": "[page](Второй_мозг.pdf#page=85&selection=22,51,29,45)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 408,
							"col": 243,
							"offset": 43869
						},
						"end": {
							"line": 408,
							"col": 296,
							"offset": 43922
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=86&selection=21,0,27,54",
					"original": "[p.86](Второй_мозг.pdf#page=86&selection=21,0,27,54)",
					"displayText": "p.86",
					"position": {
						"start": {
							"line": 411,
							"col": 317,
							"offset": 44340
						},
						"end": {
							"line": 411,
							"col": 369,
							"offset": 44392
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=87&selection=29,0,35,57",
					"original": "[p.87](Второй_мозг.pdf#page=87&selection=29,0,35,57)",
					"displayText": "p.87",
					"position": {
						"start": {
							"line": 415,
							"col": 419,
							"offset": 44844
						},
						"end": {
							"line": 415,
							"col": 471,
							"offset": 44896
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=88&selection=6,0,16,55",
					"original": "[p.88](Второй_мозг.pdf#page=88&selection=6,0,16,55)",
					"displayText": "p.88",
					"position": {
						"start": {
							"line": 419,
							"col": 622,
							"offset": 45851
						},
						"end": {
							"line": 419,
							"col": 673,
							"offset": 45902
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=88&selection=43,13,45,25",
					"original": "[p.88](Второй_мозг.pdf#page=88&selection=43,13,45,25)",
					"displayText": "p.88",
					"position": {
						"start": {
							"line": 423,
							"col": 124,
							"offset": 46141
						},
						"end": {
							"line": 423,
							"col": 177,
							"offset": 46194
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=89&selection=0,2,10,47",
					"original": "[p.89](Второй_мозг.pdf#page=89&selection=0,2,10,47)",
					"displayText": "p.89",
					"position": {
						"start": {
							"line": 425,
							"col": 477,
							"offset": 46673
						},
						"end": {
							"line": 425,
							"col": 528,
							"offset": 46724
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=89&selection=19,42,24,16",
					"original": "[p.89](Второй_мозг.pdf#page=89&selection=19,42,24,16)",
					"displayText": "p.89",
					"position": {
						"start": {
							"line": 429,
							"col": 255,
							"offset": 47081
						},
						"end": {
							"line": 429,
							"col": 308,
							"offset": 47134
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=90&selection=3,0,5,59",
					"original": "[p.90](Второй_мозг.pdf#page=90&selection=3,0,5,59)",
					"displayText": "p.90",
					"position": {
						"start": {
							"line": 431,
							"col": 175,
							"offset": 47311
						},
						"end": {
							"line": 431,
							"col": 225,
							"offset": 47361
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=90&selection=7,0,8,37",
					"original": "[page](Второй_мозг.pdf#page=90&selection=7,0,8,37)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 435,
							"col": 77,
							"offset": 47611
						},
						"end": {
							"line": 435,
							"col": 127,
							"offset": 47661
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=90&selection=22,13,23,41",
					"original": "[p.90](Второй_мозг.pdf#page=90&selection=22,13,23,41)",
					"displayText": "p.90",
					"position": {
						"start": {
							"line": 437,
							"col": 88,
							"offset": 47751
						},
						"end": {
							"line": 437,
							"col": 141,
							"offset": 47804
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=91&selection=14,0,54,3",
					"original": "[p.91](Второй_мозг.pdf#page=91&selection=14,0,54,3)",
					"displayText": "p.91",
					"position": {
						"start": {
							"line": 439,
							"col": 341,
							"offset": 48147
						},
						"end": {
							"line": 439,
							"col": 392,
							"offset": 48198
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=93&selection=22,0,24,5",
					"original": "[p.93](Второй_мозг.pdf#page=93&selection=22,0,24,5)",
					"displayText": "p.93",
					"position": {
						"start": {
							"line": 441,
							"col": 115,
							"offset": 48315
						},
						"end": {
							"line": 441,
							"col": 166,
							"offset": 48366
						}
					}
				},
				{
					"link": "PARA.md",
					"original": "[PARA](PARA.md)",
					"displayText": "PARA",
					"position": {
						"start": {
							"line": 447,
							"col": 12,
							"offset": 48600
						},
						"end": {
							"line": 447,
							"col": 27,
							"offset": 48615
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=94&selection=10,0,11,36",
					"original": "[page](Второй_мозг.pdf#page=94&selection=10,0,11,36)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 447,
							"col": 66,
							"offset": 48654
						},
						"end": {
							"line": 447,
							"col": 118,
							"offset": 48706
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=94&selection=13,0,51,6",
					"original": "[p.94](Второй_мозг.pdf#page=94&selection=13,0,51,6)",
					"displayText": "p.94",
					"position": {
						"start": {
							"line": 454,
							"col": 67,
							"offset": 49242
						},
						"end": {
							"line": 454,
							"col": 118,
							"offset": 49293
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=95&selection=2,0,2,39",
					"original": "[page](Второй_мозг.pdf#page=95&selection=2,0,2,39)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 458,
							"col": 44,
							"offset": 49392
						},
						"end": {
							"line": 458,
							"col": 94,
							"offset": 49442
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=95&selection=6,0,11,58",
					"original": "[p.95](Второй_мозг.pdf#page=95&selection=6,0,11,58)",
					"displayText": "p.95",
					"position": {
						"start": {
							"line": 460,
							"col": 348,
							"offset": 49792
						},
						"end": {
							"line": 460,
							"col": 399,
							"offset": 49843
						}
					}
				},
				{
					"link": "Проект.md",
					"original": "[Проект](Проект.md)",
					"displayText": "Проект",
					"position": {
						"start": {
							"line": 463,
							"col": 4,
							"offset": 50103
						},
						"end": {
							"line": 463,
							"col": 23,
							"offset": 50122
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=95&selection=29,2,34,16",
					"original": "[p.95](Второй_мозг.pdf#page=95&selection=29,2,34,16)",
					"displayText": "p.95",
					"position": {
						"start": {
							"line": 463,
							"col": 24,
							"offset": 50123
						},
						"end": {
							"line": 463,
							"col": 76,
							"offset": 50175
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=96&selection=19,0,19,34",
					"original": "[page](Второй_мозг.pdf#page=96&selection=19,0,19,34)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 465,
							"col": 39,
							"offset": 50216
						},
						"end": {
							"line": 465,
							"col": 91,
							"offset": 50268
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=96&selection=29,0,33,31",
					"original": "[p.96](Второй_мозг.pdf#page=96&selection=29,0,33,31)",
					"displayText": "p.96",
					"position": {
						"start": {
							"line": 467,
							"col": 268,
							"offset": 50538
						},
						"end": {
							"line": 467,
							"col": 320,
							"offset": 50590
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=98&selection=43,0,60,6",
					"original": "[p.98](Второй_мозг.pdf#page=98&selection=43,0,60,6)",
					"displayText": "p.98",
					"position": {
						"start": {
							"line": 469,
							"col": 285,
							"offset": 50878
						},
						"end": {
							"line": 469,
							"col": 336,
							"offset": 50929
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=99&selection=2,0,2,33",
					"original": "[page](Второй_мозг.pdf#page=99&selection=2,0,2,33)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 471,
							"col": 38,
							"offset": 50969
						},
						"end": {
							"line": 471,
							"col": 88,
							"offset": 51019
						}
					}
				},
				{
					"link": "PARA.md#Ресурсы",
					"original": "[01.Entities/PARA \\> Ресурсы](PARA.md#Ресурсы)",
					"displayText": "01.Entities/PARA > Ресурсы",
					"position": {
						"start": {
							"line": 471,
							"col": 89,
							"offset": 51020
						},
						"end": {
							"line": 471,
							"col": 135,
							"offset": 51066
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=99&selection=4,0,6,63",
					"original": "[p.99](Второй_мозг.pdf#page=99&selection=4,0,6,63)",
					"displayText": "p.99",
					"position": {
						"start": {
							"line": 473,
							"col": 186,
							"offset": 51254
						},
						"end": {
							"line": 473,
							"col": 236,
							"offset": 51304
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=99&selection=42,29,44,61",
					"original": "[p.99](Второй_мозг.pdf#page=99&selection=42,29,44,61)",
					"displayText": "p.99",
					"position": {
						"start": {
							"line": 475,
							"col": 154,
							"offset": 51460
						},
						"end": {
							"line": 475,
							"col": 207,
							"offset": 51513
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=99&selection=46,0,46,34",
					"original": "[page](Второй_мозг.pdf#page=99&selection=46,0,46,34)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 477,
							"col": 39,
							"offset": 51554
						},
						"end": {
							"line": 477,
							"col": 91,
							"offset": 51606
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=99&selection=48,0,58,45",
					"original": "[p.99](Второй_мозг.pdf#page=99&selection=48,0,58,45)",
					"displayText": "p.99",
					"position": {
						"start": {
							"line": 482,
							"col": 77,
							"offset": 52012
						},
						"end": {
							"line": 482,
							"col": 129,
							"offset": 52064
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=100&selection=0,3,8,35",
					"original": "[p.100](Второй_мозг.pdf#page=100&selection=0,3,8,35)",
					"displayText": "p.100",
					"position": {
						"start": {
							"line": 484,
							"col": 209,
							"offset": 52275
						},
						"end": {
							"line": 484,
							"col": 261,
							"offset": 52327
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=100&selection=16,0,16,38&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=100&selection=16,0,16,38&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 486,
							"col": 43,
							"offset": 52372
						},
						"end": {
							"line": 486,
							"col": 109,
							"offset": 52438
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=107&selection=62,0,63,17&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=107&selection=62,0,63,17&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 488,
							"col": 51,
							"offset": 52491
						},
						"end": {
							"line": 488,
							"col": 117,
							"offset": 52557
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=108&selection=4,0,12,23&color=yellow",
					"original": "[p.108](Второй_мозг.pdf#page=108&selection=4,0,12,23&color=yellow)",
					"displayText": "p.108",
					"position": {
						"start": {
							"line": 490,
							"col": 493,
							"offset": 53052
						},
						"end": {
							"line": 490,
							"col": 559,
							"offset": 53118
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=108&selection=17,0,36,48&color=yellow",
					"original": "[p.108](Второй_мозг.pdf#page=108&selection=17,0,36,48&color=yellow)",
					"displayText": "p.108",
					"position": {
						"start": {
							"line": 496,
							"col": 52,
							"offset": 53693
						},
						"end": {
							"line": 496,
							"col": 119,
							"offset": 53760
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=108&color=yellow",
					"original": "[p.108](Второй_мозг.pdf#page=108&color=yellow)",
					"displayText": "p.108",
					"position": {
						"start": {
							"line": 498,
							"col": 374,
							"offset": 54136
						},
						"end": {
							"line": 498,
							"col": 420,
							"offset": 54182
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=110&selection=2,0,3,14&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=110&selection=2,0,3,14&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 500,
							"col": 58,
							"offset": 54242
						},
						"end": {
							"line": 500,
							"col": 122,
							"offset": 54306
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=110&selection=31,0,41,60&color=yellow",
					"original": "[p.110](Второй_мозг.pdf#page=110&selection=31,0,41,60&color=yellow)",
					"displayText": "p.110",
					"position": {
						"start": {
							"line": 502,
							"col": 233,
							"offset": 54541
						},
						"end": {
							"line": 502,
							"col": 300,
							"offset": 54608
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=112&selection=5,0,6,26&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=112&selection=5,0,6,26&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 504,
							"col": 62,
							"offset": 54672
						},
						"end": {
							"line": 504,
							"col": 126,
							"offset": 54736
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=113&selection=16,0,18,51&color=yellow",
					"original": "[p.113](Второй_мозг.pdf#page=113&selection=16,0,18,51&color=yellow)",
					"displayText": "p.113",
					"position": {
						"start": {
							"line": 506,
							"col": 165,
							"offset": 54903
						},
						"end": {
							"line": 506,
							"col": 232,
							"offset": 54970
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=114&selection=15,0,32,4&color=yellow",
					"original": "[p.114](Второй_мозг.pdf#page=114&selection=15,0,32,4&color=yellow)",
					"displayText": "p.114",
					"position": {
						"start": {
							"line": 508,
							"col": 402,
							"offset": 55374
						},
						"end": {
							"line": 508,
							"col": 468,
							"offset": 55440
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=114&selection=33,0,38,62&color=yellow",
					"original": "[p.114](Второй_мозг.pdf#page=114&selection=33,0,38,62&color=yellow)",
					"displayText": "p.114",
					"position": {
						"start": {
							"line": 510,
							"col": 356,
							"offset": 55798
						},
						"end": {
							"line": 510,
							"col": 423,
							"offset": 55865
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=114&selection=39,0,45,53&color=yellow",
					"original": "[p.114](Второй_мозг.pdf#page=114&selection=39,0,45,53&color=yellow)",
					"displayText": "p.114",
					"position": {
						"start": {
							"line": 512,
							"col": 385,
							"offset": 56252
						},
						"end": {
							"line": 512,
							"col": 452,
							"offset": 56319
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=115&selection=6,0,7,21&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=115&selection=6,0,7,21&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 514,
							"col": 59,
							"offset": 56380
						},
						"end": {
							"line": 514,
							"col": 123,
							"offset": 56444
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=115&selection=9,0,10,51&color=yellow",
					"original": "[p.115](Второй_мозг.pdf#page=115&selection=9,0,10,51&color=yellow)",
					"displayText": "p.115",
					"position": {
						"start": {
							"line": 516,
							"col": 116,
							"offset": 56562
						},
						"end": {
							"line": 516,
							"col": 182,
							"offset": 56628
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=115&selection=33,14,36,55&color=yellow",
					"original": "[p.115](Второй_мозг.pdf#page=115&selection=33,14,36,55&color=yellow)",
					"displayText": "p.115",
					"position": {
						"start": {
							"line": 518,
							"col": 226,
							"offset": 56856
						},
						"end": {
							"line": 518,
							"col": 294,
							"offset": 56924
						}
					}
				},
				{
					"link": "PARA.md",
					"original": "[PARA](PARA.md)",
					"displayText": "PARA",
					"position": {
						"start": {
							"line": 520,
							"col": 26,
							"offset": 56952
						},
						"end": {
							"line": 520,
							"col": 41,
							"offset": 56967
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=115&selection=37,0,43,20&color=yellow",
					"original": "[p.115](Второй_мозг.pdf#page=115&selection=37,0,43,20&color=yellow)",
					"displayText": "p.115",
					"position": {
						"start": {
							"line": 520,
							"col": 373,
							"offset": 57299
						},
						"end": {
							"line": 520,
							"col": 440,
							"offset": 57366
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=115&selection=43,22,45,10&color=yellow",
					"original": "[p.115](Второй_мозг.pdf#page=115&selection=43,22,45,10&color=yellow)",
					"displayText": "p.115",
					"position": {
						"start": {
							"line": 522,
							"col": 108,
							"offset": 57476
						},
						"end": {
							"line": 522,
							"col": 176,
							"offset": 57544
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=116&selection=4,0,35,24&color=yellow",
					"original": "[p.116](Второй_мозг.pdf#page=116&selection=4,0,35,24&color=yellow)",
					"displayText": "p.116",
					"position": {
						"start": {
							"line": 527,
							"col": 219,
							"offset": 58256
						},
						"end": {
							"line": 527,
							"col": 285,
							"offset": 58322
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=117&selection=26,0,31,34&color=yellow",
					"original": "[p.117](Второй_мозг.pdf#page=117&selection=26,0,31,34&color=yellow)",
					"displayText": "p.117",
					"position": {
						"start": {
							"line": 531,
							"col": 341,
							"offset": 59040
						},
						"end": {
							"line": 531,
							"col": 408,
							"offset": 59107
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=118&selection=2,0,10,7&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=118&selection=2,0,10,7&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 533,
							"col": 33,
							"offset": 59142
						},
						"end": {
							"line": 533,
							"col": 97,
							"offset": 59206
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=122&selection=2,0,3,37&color=yellow",
					"original": "[page](Второй_мозг.pdf#page=122&selection=2,0,3,37&color=yellow)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 540,
							"col": 67,
							"offset": 59524
						},
						"end": {
							"line": 540,
							"col": 131,
							"offset": 59588
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=122&selection=24,32,27,42",
					"original": "[p.122](Второй_мозг.pdf#page=122&selection=24,32,27,42)",
					"displayText": "p.122",
					"position": {
						"start": {
							"line": 542,
							"col": 186,
							"offset": 59776
						},
						"end": {
							"line": 542,
							"col": 241,
							"offset": 59831
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=122&selection=28,0,29,59",
					"original": "[p.122](Второй_мозг.pdf#page=122&selection=28,0,29,59)",
					"displayText": "p.122",
					"position": {
						"start": {
							"line": 544,
							"col": 116,
							"offset": 59949
						},
						"end": {
							"line": 544,
							"col": 170,
							"offset": 60003
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=123&selection=27,0,28,20",
					"original": "[page](Второй_мозг.pdf#page=123&selection=27,0,28,20)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 546,
							"col": 59,
							"offset": 60064
						},
						"end": {
							"line": 546,
							"col": 112,
							"offset": 60117
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=123",
					"original": "[p.123](Второй_мозг.pdf#page=123)",
					"displayText": "p.123",
					"position": {
						"start": {
							"line": 548,
							"col": 214,
							"offset": 60333
						},
						"end": {
							"line": 548,
							"col": 247,
							"offset": 60366
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=123&selection=34,0,35,59",
					"original": "[p.123](Второй_мозг.pdf#page=123&selection=34,0,35,59)",
					"displayText": "p.123",
					"position": {
						"start": {
							"line": 550,
							"col": 113,
							"offset": 60481
						},
						"end": {
							"line": 550,
							"col": 167,
							"offset": 60535
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=124&selection=9,0,15,20",
					"original": "[p.124](Второй_мозг.pdf#page=124&selection=9,0,15,20)",
					"displayText": "p.124",
					"position": {
						"start": {
							"line": 552,
							"col": 362,
							"offset": 60899
						},
						"end": {
							"line": 552,
							"col": 415,
							"offset": 60952
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=125&selection=40,0,41,32",
					"original": "[page](Второй_мозг.pdf#page=125&selection=40,0,41,32)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 554,
							"col": 58,
							"offset": 61012
						},
						"end": {
							"line": 554,
							"col": 111,
							"offset": 61065
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=126&selection=4,0,8,38",
					"original": "[p.126](Второй_мозг.pdf#page=126&selection=4,0,8,38)",
					"displayText": "p.126",
					"position": {
						"start": {
							"line": 557,
							"col": 58,
							"offset": 61392
						},
						"end": {
							"line": 557,
							"col": 110,
							"offset": 61444
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=128&selection=1,0,8,18",
					"original": "[p.128](Второй_мозг.pdf#page=128&selection=1,0,8,18)",
					"displayText": "p.128",
					"position": {
						"start": {
							"line": 559,
							"col": 416,
							"offset": 61862
						},
						"end": {
							"line": 559,
							"col": 468,
							"offset": 61914
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=128&selection=15,0,27,60",
					"original": "[p.128](Второй_мозг.pdf#page=128&selection=15,0,27,60)",
					"displayText": "p.128",
					"position": {
						"start": {
							"line": 562,
							"col": 2,
							"offset": 62700
						},
						"end": {
							"line": 562,
							"col": 56,
							"offset": 62754
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=130&rect=46,60,354,431",
					"original": "[p.130](Второй_мозг.pdf#page=130&rect=46,60,354,431)",
					"displayText": "p.130",
					"position": {
						"start": {
							"line": 562,
							"col": 56,
							"offset": 62754
						},
						"end": {
							"line": 562,
							"col": 108,
							"offset": 62806
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=131&selection=10,0,14,26",
					"original": "[p.131](Второй_мозг.pdf#page=131&selection=10,0,14,26)",
					"displayText": "p.131",
					"position": {
						"start": {
							"line": 564,
							"col": 256,
							"offset": 63064
						},
						"end": {
							"line": 564,
							"col": 310,
							"offset": 63118
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=131&selection=14,28,20,37",
					"original": "[p.131](Второй_мозг.pdf#page=131&selection=14,28,20,37)",
					"displayText": "p.131",
					"position": {
						"start": {
							"line": 566,
							"col": 360,
							"offset": 63480
						},
						"end": {
							"line": 566,
							"col": 415,
							"offset": 63535
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=131&selection=35,0,39,23",
					"original": "[p.131](Второй_мозг.pdf#page=131&selection=35,0,39,23)",
					"displayText": "p.131",
					"position": {
						"start": {
							"line": 569,
							"col": 57,
							"offset": 63840
						},
						"end": {
							"line": 569,
							"col": 111,
							"offset": 63894
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=133&selection=2,0,2,27",
					"original": "[page](Второй_мозг.pdf#page=133&selection=2,0,2,27)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 571,
							"col": 30,
							"offset": 63926
						},
						"end": {
							"line": 571,
							"col": 81,
							"offset": 63977
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=133&selection=29,9,32,53",
					"original": "[p.133](Второй_мозг.pdf#page=133&selection=29,9,32,53)",
					"displayText": "p.133",
					"position": {
						"start": {
							"line": 573,
							"col": 219,
							"offset": 64198
						},
						"end": {
							"line": 573,
							"col": 273,
							"offset": 64252
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=134&selection=6,0,12,62",
					"original": "[p.134](Второй_мозг.pdf#page=134&selection=6,0,12,62)",
					"displayText": "p.134",
					"position": {
						"start": {
							"line": 575,
							"col": 414,
							"offset": 64668
						},
						"end": {
							"line": 575,
							"col": 467,
							"offset": 64721
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=134&selection=32,0,32,39",
					"original": "[page](Второй_мозг.pdf#page=134&selection=32,0,32,39)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 577,
							"col": 42,
							"offset": 64765
						},
						"end": {
							"line": 577,
							"col": 95,
							"offset": 64818
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=135&selection=20,0,20,19",
					"original": "[page](Второй_мозг.pdf#page=135&selection=20,0,20,19)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 579,
							"col": 22,
							"offset": 64842
						},
						"end": {
							"line": 579,
							"col": 75,
							"offset": 64895
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=135&selection=25,3,29,9",
					"original": "[p.135](Второй_мозг.pdf#page=135&selection=25,3,29,9)",
					"displayText": "p.135",
					"position": {
						"start": {
							"line": 581,
							"col": 191,
							"offset": 65088
						},
						"end": {
							"line": 581,
							"col": 244,
							"offset": 65141
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=136&selection=31,0,31,13",
					"original": "[page](Второй_мозг.pdf#page=136&selection=31,0,31,13)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 583,
							"col": 16,
							"offset": 65159
						},
						"end": {
							"line": 583,
							"col": 69,
							"offset": 65212
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=136&selection=38,0,55,27",
					"original": "[p.136](Второй_мозг.pdf#page=136&selection=38,0,55,27)",
					"displayText": "p.136",
					"position": {
						"start": {
							"line": 585,
							"col": 306,
							"offset": 65520
						},
						"end": {
							"line": 585,
							"col": 360,
							"offset": 65574
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=138&selection=5,0,5,21",
					"original": "[page](Второй_мозг.pdf#page=138&selection=5,0,5,21)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 587,
							"col": 24,
							"offset": 65600
						},
						"end": {
							"line": 587,
							"col": 75,
							"offset": 65651
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=139&selection=50,0,50,17",
					"original": "[page](Второй_мозг.pdf#page=139&selection=50,0,50,17)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 589,
							"col": 20,
							"offset": 65673
						},
						"end": {
							"line": 589,
							"col": 73,
							"offset": 65726
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=140&selection=4,0,6,5",
					"original": "[p.140](Второй_мозг.pdf#page=140&selection=4,0,6,5)",
					"displayText": "p.140",
					"position": {
						"start": {
							"line": 591,
							"col": 120,
							"offset": 65848
						},
						"end": {
							"line": 591,
							"col": 171,
							"offset": 65899
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=142&selection=70,0,71,26",
					"original": "[page](Второй_мозг.pdf#page=142&selection=70,0,71,26)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 593,
							"col": 45,
							"offset": 65946
						},
						"end": {
							"line": 593,
							"col": 98,
							"offset": 65999
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=145&selection=11,0,28,31",
					"original": "[p.145](Второй_мозг.pdf#page=145&selection=11,0,28,31)",
					"displayText": "p.145",
					"position": {
						"start": {
							"line": 595,
							"col": 312,
							"offset": 66313
						},
						"end": {
							"line": 595,
							"col": 366,
							"offset": 66367
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=145&selection=31,23,32,28",
					"original": "[p.145](Второй_мозг.pdf#page=145&selection=31,23,32,28)",
					"displayText": "p.145",
					"position": {
						"start": {
							"line": 597,
							"col": 66,
							"offset": 66435
						},
						"end": {
							"line": 597,
							"col": 121,
							"offset": 66490
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=145&selection=32,29,33,36",
					"original": "[p.145](Второй_мозг.pdf#page=145&selection=32,29,33,36)",
					"displayText": "p.145",
					"position": {
						"start": {
							"line": 599,
							"col": 68,
							"offset": 66560
						},
						"end": {
							"line": 599,
							"col": 123,
							"offset": 66615
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=145&selection=33,36,34,59",
					"original": "[p.145](Второй_мозг.pdf#page=145&selection=33,36,34,59)",
					"displayText": "p.145",
					"position": {
						"start": {
							"line": 601,
							"col": 82,
							"offset": 66699
						},
						"end": {
							"line": 601,
							"col": 137,
							"offset": 66754
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=145&selection=36,0,37,17",
					"original": "[page](Второй_мозг.pdf#page=145&selection=36,0,37,17)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 603,
							"col": 59,
							"offset": 66815
						},
						"end": {
							"line": 603,
							"col": 112,
							"offset": 66868
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=146&selection=2,0,2,32",
					"original": "[page](Второй_мозг.pdf#page=146&selection=2,0,2,32)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 605,
							"col": 35,
							"offset": 66905
						},
						"end": {
							"line": 605,
							"col": 86,
							"offset": 66956
						}
					}
				},
				{
					"link": "CODE, Capture, Organize, Distill, Express.md",
					"original": "[CODE](CODE,%20Capture,%20Organize,%20Distill,%20Express.md)",
					"displayText": "CODE",
					"position": {
						"start": {
							"line": 609,
							"col": 69,
							"offset": 67086
						},
						"end": {
							"line": 609,
							"col": 129,
							"offset": 67146
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=146&selection=4,0,9,37",
					"original": "[p.146](Второй_мозг.pdf#page=146&selection=4,0,9,37)",
					"displayText": "p.146",
					"position": {
						"start": {
							"line": 609,
							"col": 377,
							"offset": 67394
						},
						"end": {
							"line": 609,
							"col": 429,
							"offset": 67446
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=146&selection=17,0,34,59",
					"original": "[p.146](Второй_мозг.pdf#page=146&selection=17,0,34,59)",
					"displayText": "p.146",
					"position": {
						"start": {
							"line": 611,
							"col": 226,
							"offset": 67674
						},
						"end": {
							"line": 611,
							"col": 280,
							"offset": 67728
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=146&selection=39,0,45,56",
					"original": "[p.146](Второй_мозг.pdf#page=146&selection=39,0,45,56)",
					"displayText": "p.146",
					"position": {
						"start": {
							"line": 613,
							"col": 385,
							"offset": 68115
						},
						"end": {
							"line": 613,
							"col": 439,
							"offset": 68169
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=147&selection=2,0,2,36",
					"original": "[page](Второй_мозг.pdf#page=147&selection=2,0,2,36)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 615,
							"col": 39,
							"offset": 68210
						},
						"end": {
							"line": 615,
							"col": 90,
							"offset": 68261
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=147&selection=5,21,10,1",
					"original": "[p.147](Второй_мозг.pdf#page=147&selection=5,21,10,1)",
					"displayText": "p.147",
					"position": {
						"start": {
							"line": 617,
							"col": 122,
							"offset": 68385
						},
						"end": {
							"line": 617,
							"col": 175,
							"offset": 68438
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=147&selection=13,28,17,16",
					"original": "[p.147](Второй_мозг.pdf#page=147&selection=13,28,17,16)",
					"displayText": "p.147",
					"position": {
						"start": {
							"line": 619,
							"col": 232,
							"offset": 68672
						},
						"end": {
							"line": 619,
							"col": 287,
							"offset": 68727
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=147&selection=26,0,29,39",
					"original": "[p.147](Второй_мозг.pdf#page=147&selection=26,0,29,39)",
					"displayText": "p.147",
					"position": {
						"start": {
							"line": 621,
							"col": 209,
							"offset": 68938
						},
						"end": {
							"line": 621,
							"col": 263,
							"offset": 68992
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=147&selection=33,0,36,52",
					"original": "[p.147](Второй_мозг.pdf#page=147&selection=33,0,36,52)",
					"displayText": "p.147",
					"position": {
						"start": {
							"line": 623,
							"col": 237,
							"offset": 69231
						},
						"end": {
							"line": 623,
							"col": 291,
							"offset": 69285
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=148&selection=35,2,42,33",
					"original": "[p.148](Второй_мозг.pdf#page=148&selection=35,2,42,33)",
					"displayText": "p.148",
					"position": {
						"start": {
							"line": 627,
							"col": 498,
							"offset": 70311
						},
						"end": {
							"line": 627,
							"col": 552,
							"offset": 70365
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=148&selection=13,0,13,21",
					"original": "[page](Второй_мозг.pdf#page=148&selection=13,0,13,21)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 629,
							"col": 24,
							"offset": 70391
						},
						"end": {
							"line": 629,
							"col": 77,
							"offset": 70444
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=148&selection=23,0,29,7",
					"original": "[p.148](Второй_мозг.pdf#page=148&selection=23,0,29,7)",
					"displayText": "p.148",
					"position": {
						"start": {
							"line": 631,
							"col": 137,
							"offset": 70583
						},
						"end": {
							"line": 631,
							"col": 190,
							"offset": 70636
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=149&selection=12,0,14,56",
					"original": "[p.149](Второй_мозг.pdf#page=149&selection=12,0,14,56)",
					"displayText": "p.149",
					"position": {
						"start": {
							"line": 633,
							"col": 166,
							"offset": 70804
						},
						"end": {
							"line": 633,
							"col": 220,
							"offset": 70858
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=149&selection=30,0,30,38",
					"original": "[page](Второй_мозг.pdf#page=149&selection=30,0,30,38)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 637,
							"col": 41,
							"offset": 71138
						},
						"end": {
							"line": 637,
							"col": 94,
							"offset": 71191
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=149&selection=32,0,34,5",
					"original": "[p.149](Второй_мозг.pdf#page=149&selection=32,0,34,5)",
					"displayText": "p.149",
					"position": {
						"start": {
							"line": 639,
							"col": 120,
							"offset": 71313
						},
						"end": {
							"line": 639,
							"col": 173,
							"offset": 71366
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=149&selection=40,36,43,28",
					"original": "[p.149](Второй_мозг.pdf#page=149&selection=40,36,43,28)",
					"displayText": "p.149",
					"position": {
						"start": {
							"line": 641,
							"col": 172,
							"offset": 71540
						},
						"end": {
							"line": 641,
							"col": 227,
							"offset": 71595
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=152&selection=2,0,11,19",
					"original": "[page](Второй_мозг.pdf#page=152&selection=2,0,11,19)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 643,
							"col": 44,
							"offset": 71641
						},
						"end": {
							"line": 643,
							"col": 96,
							"offset": 71693
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=157&selection=9,0,9,37",
					"original": "[page](Второй_мозг.pdf#page=157&selection=9,0,9,37)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 648,
							"col": 40,
							"offset": 71844
						},
						"end": {
							"line": 648,
							"col": 91,
							"offset": 71895
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=157&selection=11,0,12,42",
					"original": "[p.157](Второй_мозг.pdf#page=157&selection=11,0,12,42)",
					"displayText": "p.157",
					"position": {
						"start": {
							"line": 650,
							"col": 98,
							"offset": 71995
						},
						"end": {
							"line": 650,
							"col": 152,
							"offset": 72049
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=157&selection=16,33,19,53",
					"original": "[p.157](Второй_мозг.pdf#page=157&selection=16,33,19,53)",
					"displayText": "p.157",
					"position": {
						"start": {
							"line": 652,
							"col": 189,
							"offset": 72240
						},
						"end": {
							"line": 652,
							"col": 244,
							"offset": 72295
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=157&selection=35,32,38,63",
					"original": "[p.157](Второй_мозг.pdf#page=157&selection=35,32,38,63)",
					"displayText": "p.157",
					"position": {
						"start": {
							"line": 654,
							"col": 207,
							"offset": 72504
						},
						"end": {
							"line": 654,
							"col": 262,
							"offset": 72559
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=158&selection=49,0,50,27",
					"original": "[page](Второй_мозг.pdf#page=158&selection=49,0,50,27)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 656,
							"col": 52,
							"offset": 72613
						},
						"end": {
							"line": 656,
							"col": 105,
							"offset": 72666
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=160&selection=28,0,54,19",
					"original": "[p.160](Второй_мозг.pdf#page=160&selection=28,0,54,19)",
					"displayText": "p.160",
					"position": {
						"start": {
							"line": 661,
							"col": 123,
							"offset": 73206
						},
						"end": {
							"line": 661,
							"col": 177,
							"offset": 73260
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=161&selection=2,1,24,20",
					"original": "[p.161](Второй_мозг.pdf#page=161&selection=2,1,24,20)",
					"displayText": "p.161",
					"position": {
						"start": {
							"line": 664,
							"col": 210,
							"offset": 73598
						},
						"end": {
							"line": 664,
							"col": 263,
							"offset": 73651
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=161&selection=39,13,45,22",
					"original": "[p.161](Второй_мозг.pdf#page=161&selection=39,13,45,22)",
					"displayText": "p.161",
					"position": {
						"start": {
							"line": 666,
							"col": 146,
							"offset": 73799
						},
						"end": {
							"line": 666,
							"col": 201,
							"offset": 73854
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=161&selection=60,0,68,1",
					"original": "[p.161](Второй_мозг.pdf#page=161&selection=60,0,68,1)",
					"displayText": "p.161",
					"position": {
						"start": {
							"line": 668,
							"col": 86,
							"offset": 73942
						},
						"end": {
							"line": 668,
							"col": 139,
							"offset": 73995
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=161",
					"original": "[p.161](Второй_мозг.pdf#page=161)",
					"displayText": "p.161",
					"position": {
						"start": {
							"line": 671,
							"col": 10,
							"offset": 74219
						},
						"end": {
							"line": 671,
							"col": 43,
							"offset": 74252
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=161&selection=69,1,79,10",
					"original": "[p.161](Второй_мозг.pdf#page=161&selection=69,1,79,10)",
					"displayText": "p.161",
					"position": {
						"start": {
							"line": 672,
							"col": 248,
							"offset": 74501
						},
						"end": {
							"line": 672,
							"col": 302,
							"offset": 74555
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=162&selection=4,0,26,19",
					"original": "[p.162](Второй_мозг.pdf#page=162&selection=4,0,26,19)",
					"displayText": "p.162",
					"position": {
						"start": {
							"line": 674,
							"col": 585,
							"offset": 75142
						},
						"end": {
							"line": 674,
							"col": 638,
							"offset": 75195
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=162&selection=27,0,33,33",
					"original": "[p.162](Второй_мозг.pdf#page=162&selection=27,0,33,33)",
					"displayText": "p.162",
					"position": {
						"start": {
							"line": 676,
							"col": 384,
							"offset": 75581
						},
						"end": {
							"line": 676,
							"col": 438,
							"offset": 75635
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=162&selection=36,0,39,5",
					"original": "[p.162](Второй_мозг.pdf#page=162&selection=36,0,39,5)",
					"displayText": "p.162",
					"position": {
						"start": {
							"line": 678,
							"col": 175,
							"offset": 75812
						},
						"end": {
							"line": 678,
							"col": 228,
							"offset": 75865
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=163&selection=4,0,6,33",
					"original": "[p.163](Второй_мозг.pdf#page=163&selection=4,0,6,33)",
					"displayText": "p.163",
					"position": {
						"start": {
							"line": 680,
							"col": 142,
							"offset": 76009
						},
						"end": {
							"line": 680,
							"col": 194,
							"offset": 76061
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=163&selection=15,0,16,32",
					"original": "[page](Второй_мозг.pdf#page=163&selection=15,0,16,32)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 684,
							"col": 67,
							"offset": 76208
						},
						"end": {
							"line": 684,
							"col": 120,
							"offset": 76261
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=163&selection=21,44,49,29",
					"original": "[p.163](Второй_мозг.pdf#page=163&selection=21,44,49,29)",
					"displayText": "p.163",
					"position": {
						"start": {
							"line": 693,
							"col": 82,
							"offset": 76864
						},
						"end": {
							"line": 693,
							"col": 137,
							"offset": 76919
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=164&selection=3,0,9,21",
					"original": "[p.164](Второй_мозг.pdf#page=164&selection=3,0,9,21)",
					"displayText": "p.164",
					"position": {
						"start": {
							"line": 697,
							"col": 4,
							"offset": 77126
						},
						"end": {
							"line": 697,
							"col": 56,
							"offset": 77178
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=165&selection=38,9,52,18",
					"original": "[p.165](Второй_мозг.pdf#page=165&selection=38,9,52,18)",
					"displayText": "p.165",
					"position": {
						"start": {
							"line": 700,
							"col": 4,
							"offset": 77749
						},
						"end": {
							"line": 700,
							"col": 58,
							"offset": 77803
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=166&selection=12,0,13,37",
					"original": "[page](Второй_мозг.pdf#page=166&selection=12,0,13,37)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 702,
							"col": 66,
							"offset": 77871
						},
						"end": {
							"line": 702,
							"col": 119,
							"offset": 77924
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=166&selection=17,37,19,12",
					"original": "[p.166](Второй_мозг.pdf#page=166&selection=17,37,19,12)",
					"displayText": "p.166",
					"position": {
						"start": {
							"line": 705,
							"col": 4,
							"offset": 78018
						},
						"end": {
							"line": 705,
							"col": 59,
							"offset": 78073
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=167&selection=8,23,14,12",
					"original": "[p.167](Второй_мозг.pdf#page=167&selection=8,23,14,12)",
					"displayText": "p.167",
					"position": {
						"start": {
							"line": 707,
							"col": 188,
							"offset": 78263
						},
						"end": {
							"line": 707,
							"col": 242,
							"offset": 78317
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=167&selection=16,0,16,27",
					"original": "[page](Второй_мозг.pdf#page=167&selection=16,0,16,27)",
					"displayText": "page",
					"position": {
						"start": {
							"line": 709,
							"col": 30,
							"offset": 78349
						},
						"end": {
							"line": 709,
							"col": 83,
							"offset": 78402
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=168&selection=0,3,4,60",
					"original": "[p.168](Второй_мозг.pdf#page=168&selection=0,3,4,60)",
					"displayText": "p.168",
					"position": {
						"start": {
							"line": 711,
							"col": 237,
							"offset": 78641
						},
						"end": {
							"line": 711,
							"col": 289,
							"offset": 78693
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=168&selection=10,0,10,38",
					"original": "[p.168](Второй_мозг.pdf#page=168&selection=10,0,10,38)",
					"displayText": "p.168",
					"position": {
						"start": {
							"line": 713,
							"col": 41,
							"offset": 78736
						},
						"end": {
							"line": 713,
							"col": 95,
							"offset": 78790
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=168&selection=36,0,49,0",
					"original": "[p.168](Второй_мозг.pdf#page=168&selection=36,0,49,0)",
					"displayText": "p.168",
					"position": {
						"start": {
							"line": 715,
							"col": 370,
							"offset": 79162
						},
						"end": {
							"line": 715,
							"col": 423,
							"offset": 79215
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=170&selection=0,3,2,26",
					"original": "[p.170](Второй_мозг.pdf#page=170&selection=0,3,2,26)",
					"displayText": "p.170",
					"position": {
						"start": {
							"line": 717,
							"col": 29,
							"offset": 79246
						},
						"end": {
							"line": 717,
							"col": 81,
							"offset": 79298
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=170&selection=7,32,9,41",
					"original": "[p.170](Второй_мозг.pdf#page=170&selection=7,32,9,41)",
					"displayText": "p.170",
					"position": {
						"start": {
							"line": 719,
							"col": 130,
							"offset": 79430
						},
						"end": {
							"line": 719,
							"col": 183,
							"offset": 79483
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=170&selection=9,42,13,42",
					"original": "[p.170](Второй_мозг.pdf#page=170&selection=9,42,13,42)",
					"displayText": "p.170",
					"position": {
						"start": {
							"line": 721,
							"col": 230,
							"offset": 79715
						},
						"end": {
							"line": 721,
							"col": 284,
							"offset": 79769
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=170&selection=24,36,29,59",
					"original": "[p.170](Второй_мозг.pdf#page=170&selection=24,36,29,59)",
					"displayText": "p.170",
					"position": {
						"start": {
							"line": 723,
							"col": 307,
							"offset": 80078
						},
						"end": {
							"line": 723,
							"col": 362,
							"offset": 80133
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=171&selection=1,0,4,38",
					"original": "[p.171](Второй_мозг.pdf#page=171&selection=1,0,4,38)",
					"displayText": "p.171",
					"position": {
						"start": {
							"line": 727,
							"col": 204,
							"offset": 80494
						},
						"end": {
							"line": 727,
							"col": 256,
							"offset": 80546
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=171&selection=12,0,12,30",
					"original": "[p.171](Второй_мозг.pdf#page=171&selection=12,0,12,30)",
					"displayText": "p.171",
					"position": {
						"start": {
							"line": 729,
							"col": 33,
							"offset": 80581
						},
						"end": {
							"line": 729,
							"col": 87,
							"offset": 80635
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=172&selection=4,0,6,42",
					"original": "[p.172](Второй_мозг.pdf#page=172&selection=4,0,6,42)",
					"displayText": "p.172",
					"position": {
						"start": {
							"line": 731,
							"col": 159,
							"offset": 80796
						},
						"end": {
							"line": 731,
							"col": 211,
							"offset": 80848
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=172&selection=15,0,19,27",
					"original": "[p.172](Второй_мозг.pdf#page=172&selection=15,0,19,27)",
					"displayText": "p.172",
					"position": {
						"start": {
							"line": 733,
							"col": 257,
							"offset": 81107
						},
						"end": {
							"line": 733,
							"col": 311,
							"offset": 81161
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=172&selection=26,0,30,26",
					"original": "[p.172](Второй_мозг.pdf#page=172&selection=26,0,30,26)",
					"displayText": "p.172",
					"position": {
						"start": {
							"line": 735,
							"col": 248,
							"offset": 81411
						},
						"end": {
							"line": 735,
							"col": 302,
							"offset": 81465
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=173&selection=8,0,9,40",
					"original": "[p.173](Второй_мозг.pdf#page=173&selection=8,0,9,40)",
					"displayText": "p.173",
					"position": {
						"start": {
							"line": 737,
							"col": 65,
							"offset": 81532
						},
						"end": {
							"line": 737,
							"col": 117,
							"offset": 81584
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=173&selection=18,0,18,45",
					"original": "[p.173](Второй_мозг.pdf#page=173&selection=18,0,18,45)",
					"displayText": "p.173",
					"position": {
						"start": {
							"line": 739,
							"col": 43,
							"offset": 81629
						},
						"end": {
							"line": 739,
							"col": 97,
							"offset": 81683
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=174&selection=7,0,12,10",
					"original": "[p.174](Второй_мозг.pdf#page=174&selection=7,0,12,10)",
					"displayText": "p.174",
					"position": {
						"start": {
							"line": 742,
							"col": 298,
							"offset": 82031
						},
						"end": {
							"line": 742,
							"col": 351,
							"offset": 82084
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=174&selection=14,0,15,51",
					"original": "[p.174](Второй_мозг.pdf#page=174&selection=14,0,15,51)",
					"displayText": "p.174",
					"position": {
						"start": {
							"line": 744,
							"col": 63,
							"offset": 82149
						},
						"end": {
							"line": 744,
							"col": 117,
							"offset": 82203
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=175&selection=1,34,4,61",
					"original": "[p.175](Второй_мозг.pdf#page=175&selection=1,34,4,61)",
					"displayText": "p.175",
					"position": {
						"start": {
							"line": 746,
							"col": 213,
							"offset": 82418
						},
						"end": {
							"line": 746,
							"col": 266,
							"offset": 82471
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=175&selection=24,0,25,48",
					"original": "[p.175](Второй_мозг.pdf#page=175&selection=24,0,25,48)",
					"displayText": "p.175",
					"position": {
						"start": {
							"line": 748,
							"col": 61,
							"offset": 82534
						},
						"end": {
							"line": 748,
							"col": 115,
							"offset": 82588
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=176&selection=20,0,20,37",
					"original": "[p.176](Второй_мозг.pdf#page=176&selection=20,0,20,37)",
					"displayText": "p.176",
					"position": {
						"start": {
							"line": 750,
							"col": 40,
							"offset": 82630
						},
						"end": {
							"line": 750,
							"col": 94,
							"offset": 82684
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=177&selection=28,23,33,7",
					"original": "[p.177](Второй_мозг.pdf#page=177&selection=28,23,33,7)",
					"displayText": "p.177",
					"position": {
						"start": {
							"line": 754,
							"col": 263,
							"offset": 83154
						},
						"end": {
							"line": 754,
							"col": 317,
							"offset": 83208
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=178&selection=12,0,12,15",
					"original": "[p.178](Второй_мозг.pdf#page=178&selection=12,0,12,15)",
					"displayText": "p.178",
					"position": {
						"start": {
							"line": 756,
							"col": 18,
							"offset": 83229
						},
						"end": {
							"line": 756,
							"col": 72,
							"offset": 83283
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=178&selection=14,0,17,15",
					"original": "[p.178](Второй_мозг.pdf#page=178&selection=14,0,17,15)",
					"displayText": "p.178",
					"position": {
						"start": {
							"line": 758,
							"col": 185,
							"offset": 83471
						},
						"end": {
							"line": 758,
							"col": 239,
							"offset": 83525
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=178&selection=18,0,20,19",
					"original": "[p.178](Второй_мозг.pdf#page=178&selection=18,0,20,19)",
					"displayText": "p.178",
					"position": {
						"start": {
							"line": 760,
							"col": 126,
							"offset": 83654
						},
						"end": {
							"line": 760,
							"col": 180,
							"offset": 83708
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=179&selection=26,18,40,23",
					"original": "[p.179](Второй_мозг.pdf#page=179&selection=26,18,40,23)",
					"displayText": "p.179",
					"position": {
						"start": {
							"line": 762,
							"col": 236,
							"offset": 83947
						},
						"end": {
							"line": 762,
							"col": 291,
							"offset": 84002
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=180&selection=8,0,9,29",
					"original": "[p.180](Второй_мозг.pdf#page=180&selection=8,0,9,29)",
					"displayText": "p.180",
					"position": {
						"start": {
							"line": 764,
							"col": 46,
							"offset": 84051
						},
						"end": {
							"line": 764,
							"col": 98,
							"offset": 84103
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=180&selection=11,0,16,59",
					"original": "[p.180](Второй_мозг.pdf#page=180&selection=11,0,16,59)",
					"displayText": "p.180",
					"position": {
						"start": {
							"line": 766,
							"col": 176,
							"offset": 84282
						},
						"end": {
							"line": 766,
							"col": 230,
							"offset": 84336
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=182&selection=0,0,3,9&color=red",
					"original": "[p.182](Второй_мозг.pdf#page=182&selection=0,0,3,9&color=red)",
					"displayText": "p.182",
					"position": {
						"start": {
							"line": 768,
							"col": 32,
							"offset": 84371
						},
						"end": {
							"line": 768,
							"col": 93,
							"offset": 84432
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=183&selection=2,0,5,22&color=h2",
					"original": "[p.183](Второй_мозг.pdf#page=183&selection=2,0,5,22&color=h2)",
					"displayText": "p.183",
					"position": {
						"start": {
							"line": 770,
							"col": 44,
							"offset": 84478
						},
						"end": {
							"line": 770,
							"col": 105,
							"offset": 84539
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=183&selection=7,0,12,33&color=note",
					"original": "[p.183](Второй_мозг.pdf#page=183&selection=7,0,12,33&color=note)",
					"displayText": "p.183",
					"position": {
						"start": {
							"line": 772,
							"col": 195,
							"offset": 84736
						},
						"end": {
							"line": 772,
							"col": 259,
							"offset": 84800
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=184&selection=3,0,7,7&color=note",
					"original": "[p.184](Второй_мозг.pdf#page=184&selection=3,0,7,7&color=note)",
					"displayText": "p.184",
					"position": {
						"start": {
							"line": 774,
							"col": 240,
							"offset": 85042
						},
						"end": {
							"line": 774,
							"col": 302,
							"offset": 85104
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=185&selection=12,0,18,47",
					"original": "[p.185](Второй_мозг.pdf#page=185&selection=12,0,18,47)",
					"displayText": "p.185",
					"position": {
						"start": {
							"line": 776,
							"col": 160,
							"offset": 85266
						},
						"end": {
							"line": 776,
							"col": 214,
							"offset": 85320
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=185&selection=25,0,29,22",
					"original": "[p.185](Второй_мозг.pdf#page=185&selection=25,0,29,22)",
					"displayText": "p.185",
					"position": {
						"start": {
							"line": 778,
							"col": 246,
							"offset": 85569
						},
						"end": {
							"line": 778,
							"col": 300,
							"offset": 85623
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=186&selection=20,0,20,45&color=h3",
					"original": "[p.186](Второй_мозг.pdf#page=186&selection=20,0,20,45&color=h3)",
					"displayText": "p.186",
					"position": {
						"start": {
							"line": 780,
							"col": 50,
							"offset": 85675
						},
						"end": {
							"line": 780,
							"col": 113,
							"offset": 85738
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=187&selection=19,33,25,18&color=note",
					"original": "[p.187](Второй_мозг.pdf#page=187&selection=19,33,25,18&color=note)",
					"displayText": "p.187",
					"position": {
						"start": {
							"line": 784,
							"col": 110,
							"offset": 85907
						},
						"end": {
							"line": 784,
							"col": 176,
							"offset": 85973
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=187&selection=26,0,51,42",
					"original": "[p.187](Второй_мозг.pdf#page=187&selection=26,0,51,42)",
					"displayText": "p.187",
					"position": {
						"start": {
							"line": 786,
							"col": 204,
							"offset": 86180
						},
						"end": {
							"line": 786,
							"col": 258,
							"offset": 86234
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=187&selection=51,44,63,14",
					"original": "[p.187](Второй_мозг.pdf#page=187&selection=51,44,63,14)",
					"displayText": "p.187",
					"position": {
						"start": {
							"line": 788,
							"col": 121,
							"offset": 86358
						},
						"end": {
							"line": 788,
							"col": 176,
							"offset": 86413
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=187&selection=65,53,66,26",
					"original": "[p.187](Второй_мозг.pdf#page=187&selection=65,53,66,26)",
					"displayText": "p.187",
					"position": {
						"start": {
							"line": 790,
							"col": 34,
							"offset": 86450
						},
						"end": {
							"line": 790,
							"col": 89,
							"offset": 86505
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=187&selection=78,0,81,59",
					"original": "[p.187](Второй_мозг.pdf#page=187&selection=78,0,81,59)",
					"displayText": "p.187",
					"position": {
						"start": {
							"line": 792,
							"col": 232,
							"offset": 86740
						},
						"end": {
							"line": 792,
							"col": 286,
							"offset": 86794
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=187&selection=82,0,83,26",
					"original": "[p.187](Второй_мозг.pdf#page=187&selection=82,0,83,26)",
					"displayText": "p.187",
					"position": {
						"start": {
							"line": 794,
							"col": 85,
							"offset": 86882
						},
						"end": {
							"line": 794,
							"col": 139,
							"offset": 86936
						}
					}
				},
				{
					"link": "Дивергенция",
					"original": "[[Дивергенция|Дивергенция]]",
					"displayText": "Дивергенция",
					"position": {
						"start": {
							"line": 796,
							"col": 3,
							"offset": 86941
						},
						"end": {
							"line": 796,
							"col": 30,
							"offset": 86968
						}
					}
				},
				{
					"link": "Конвергенция",
					"original": "[[Конвергенция|Конвергенция]]",
					"displayText": "Конвергенция",
					"position": {
						"start": {
							"line": 796,
							"col": 33,
							"offset": 86971
						},
						"end": {
							"line": 796,
							"col": 62,
							"offset": 87000
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=188&selection=4,0,4,23",
					"original": "[p.188](Второй_мозг.pdf#page=188&selection=4,0,4,23)",
					"displayText": "p.188",
					"position": {
						"start": {
							"line": 798,
							"col": 26,
							"offset": 87049
						},
						"end": {
							"line": 798,
							"col": 78,
							"offset": 87101
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=188&selection=9,0,9,23",
					"original": "[p.188](Второй_мозг.pdf#page=188&selection=9,0,9,23)",
					"displayText": "p.188",
					"position": {
						"start": {
							"line": 800,
							"col": 26,
							"offset": 87130
						},
						"end": {
							"line": 800,
							"col": 78,
							"offset": 87182
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=188&selection=14,0,14,34",
					"original": "[p.188](Второй_мозг.pdf#page=188&selection=14,0,14,34)",
					"displayText": "p.188",
					"position": {
						"start": {
							"line": 802,
							"col": 37,
							"offset": 87222
						},
						"end": {
							"line": 802,
							"col": 91,
							"offset": 87276
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=188&selection=19,9,19,39",
					"original": "[p.188](Второй_мозг.pdf#page=188&selection=19,9,19,39)",
					"displayText": "p.188",
					"position": {
						"start": {
							"line": 804,
							"col": 33,
							"offset": 87312
						},
						"end": {
							"line": 804,
							"col": 87,
							"offset": 87366
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=189&selection=10,0,11,19&color=h3",
					"original": "[p.189](Второй_мозг.pdf#page=189&selection=10,0,11,19&color=h3)",
					"displayText": "p.189",
					"position": {
						"start": {
							"line": 808,
							"col": 64,
							"offset": 87488
						},
						"end": {
							"line": 808,
							"col": 127,
							"offset": 87551
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=189&selection=21,0,22,53&color=note",
					"original": "[p.189](Второй_мозг.pdf#page=189&selection=21,0,22,53&color=note)",
					"displayText": "p.189",
					"position": {
						"start": {
							"line": 810,
							"col": 109,
							"offset": 87663
						},
						"end": {
							"line": 810,
							"col": 174,
							"offset": 87728
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=189&selection=23,37,27,48&color=note",
					"original": "[p.189](Второй_мозг.pdf#page=189&selection=23,37,27,48&color=note)",
					"displayText": "p.189",
					"position": {
						"start": {
							"line": 812,
							"col": 238,
							"offset": 87970
						},
						"end": {
							"line": 812,
							"col": 304,
							"offset": 88036
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=189&selection=27,48,31,29&color=note",
					"original": "[p.189](Второй_мозг.pdf#page=189&selection=27,48,31,29&color=note)",
					"displayText": "p.189",
					"position": {
						"start": {
							"line": 814,
							"col": 206,
							"offset": 88245
						},
						"end": {
							"line": 814,
							"col": 272,
							"offset": 88311
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=189&selection=34,0,35,24",
					"original": "[p.189](Второй_мозг.pdf#page=189&selection=34,0,35,24)",
					"displayText": "p.189",
					"position": {
						"start": {
							"line": 816,
							"col": 86,
							"offset": 88400
						},
						"end": {
							"line": 816,
							"col": 140,
							"offset": 88454
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=190&selection=11,47,22,50&color=note",
					"original": "[p.190](Второй_мозг.pdf#page=190&selection=11,47,22,50&color=note)",
					"displayText": "p.190",
					"position": {
						"start": {
							"line": 818,
							"col": 317,
							"offset": 88774
						},
						"end": {
							"line": 818,
							"col": 383,
							"offset": 88840
						}
					}
				},
				{
					"link": "2402630666_00009_Форте_Т_Создай_свой«второй_мозг»!_Популярная_психология_для_бизнеса.pdf#page=190&selection=32,0,32,33&color=h3",
					"original": "[[2402630666_00009_Форте_Т_Создай_свой«второй_мозг»!_Популярная_психология_для_бизнеса.pdf#page=190&selection=32,0,32,33&color=h3|p.19[p.190](Второй_мозг.pdf#page=190)[p.190](Второй_мозг.pdf#page=190)[p.194](Второй_мозг.pdf#page=194)[p.195](Второй_мозг.pdf#page=195)0]]",
					"displayText": "p.19[p.190](Второй_мозг.pdf#page=190)[p.190](Второй_мозг.pdf#page=190)[p.194](Второй_мозг.pdf#page=194)[p.195](Второй_мозг.pdf#page=195)0",
					"position": {
						"start": {
							"line": 820,
							"col": 38,
							"offset": 88881
						},
						"end": {
							"line": 820,
							"col": 307,
							"offset": 89150
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=191&selection=10,0,12,19&color=defeniton",
					"original": "[p.191](Второй_мозг.pdf#page=191&selection=10,0,12,19&color=defeniton)",
					"displayText": "p.191",
					"position": {
						"start": {
							"line": 822,
							"col": 130,
							"offset": 89283
						},
						"end": {
							"line": 822,
							"col": 200,
							"offset": 89353
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=191&selection=15,0,23,40",
					"original": "[p.191](Второй_мозг.pdf#page=191&selection=15,0,23,40)",
					"displayText": "p.191",
					"position": {
						"start": {
							"line": 824,
							"col": 323,
							"offset": 89679
						},
						"end": {
							"line": 824,
							"col": 377,
							"offset": 89733
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=192&selection=40,0,42,17",
					"original": "[p.192](Второй_мозг.pdf#page=192&selection=40,0,42,17)",
					"displayText": "p.192",
					"position": {
						"start": {
							"line": 826,
							"col": 126,
							"offset": 89862
						},
						"end": {
							"line": 826,
							"col": 180,
							"offset": 89916
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=208&selection=4,47,7,30",
					"original": "[p.208](Второй_мозг.pdf#page=208&selection=4,47,7,30)",
					"displayText": "p.208",
					"position": {
						"start": {
							"line": 829,
							"col": 155,
							"offset": 90184
						},
						"end": {
							"line": 829,
							"col": 208,
							"offset": 90237
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=208&selection=7,32,11,4",
					"original": "[p.208](Второй_мозг.pdf#page=208&selection=7,32,11,4)",
					"displayText": "p.208",
					"position": {
						"start": {
							"line": 831,
							"col": 197,
							"offset": 90437
						},
						"end": {
							"line": 831,
							"col": 250,
							"offset": 90490
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=208&selection=15,0,15,44&color=h3",
					"original": "[p.208](Второй_мозг.pdf#page=208&selection=15,0,15,44&color=h3)",
					"displayText": "p.208",
					"position": {
						"start": {
							"line": 833,
							"col": 47,
							"offset": 90540
						},
						"end": {
							"line": 833,
							"col": 110,
							"offset": 90603
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=208&selection=30,0,38,5",
					"original": "[p.208](Второй_мозг.pdf#page=208&selection=30,0,38,5)",
					"displayText": "p.208",
					"position": {
						"start": {
							"line": 837,
							"col": 286,
							"offset": 91065
						},
						"end": {
							"line": 837,
							"col": 339,
							"offset": 91118
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=209&selection=1,43,6,1",
					"original": "[p.209](Второй_мозг.pdf#page=209&selection=1,43,6,1)",
					"displayText": "p.209",
					"position": {
						"start": {
							"line": 839,
							"col": 93,
							"offset": 91214
						},
						"end": {
							"line": 839,
							"col": 145,
							"offset": 91266
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=209&selection=7,0,13,30",
					"original": "[p.209](Второй_мозг.pdf#page=209&selection=7,0,13,30)",
					"displayText": "p.209",
					"position": {
						"start": {
							"line": 841,
							"col": 380,
							"offset": 91649
						},
						"end": {
							"line": 841,
							"col": 433,
							"offset": 91702
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=209&selection=14,0,18,2",
					"original": "[p.209](Второй_мозг.pdf#page=209&selection=14,0,18,2)",
					"displayText": "p.209",
					"position": {
						"start": {
							"line": 843,
							"col": 137,
							"offset": 91842
						},
						"end": {
							"line": 843,
							"col": 190,
							"offset": 91895
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=209&selection=29,0,40,50",
					"original": "[p.209](Второй_мозг.pdf#page=209&selection=29,0,40,50)",
					"displayText": "p.209",
					"position": {
						"start": {
							"line": 845,
							"col": 104,
							"offset": 92002
						},
						"end": {
							"line": 845,
							"col": 158,
							"offset": 92056
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=210&selection=5,0,12,47",
					"original": "[p.210](Второй_мозг.pdf#page=210&selection=5,0,12,47)",
					"displayText": "p.210",
					"position": {
						"start": {
							"line": 847,
							"col": 211,
							"offset": 92270
						},
						"end": {
							"line": 847,
							"col": 264,
							"offset": 92323
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=210&selection=22,46,23,47",
					"original": "[p.210](Второй_мозг.pdf#page=210&selection=22,46,23,47)",
					"displayText": "p.210",
					"position": {
						"start": {
							"line": 849,
							"col": 62,
							"offset": 92387
						},
						"end": {
							"line": 849,
							"col": 117,
							"offset": 92442
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=210&selection=34,0,37,29",
					"original": "[p.210](Второй_мозг.pdf#page=210&selection=34,0,37,29)",
					"displayText": "p.210",
					"position": {
						"start": {
							"line": 853,
							"col": 125,
							"offset": 92789
						},
						"end": {
							"line": 853,
							"col": 179,
							"offset": 92843
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=210&selection=41,0,45,23",
					"original": "[p.210](Второй_мозг.pdf#page=210&selection=41,0,45,23)",
					"displayText": "p.210",
					"position": {
						"start": {
							"line": 855,
							"col": 171,
							"offset": 93017
						},
						"end": {
							"line": 855,
							"col": 225,
							"offset": 93071
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=211&selection=5,0,6,37&color=h3",
					"original": "[p.211](Второй_мозг.pdf#page=211&selection=5,0,6,37&color=h3)",
					"displayText": "p.211",
					"position": {
						"start": {
							"line": 857,
							"col": 60,
							"offset": 93134
						},
						"end": {
							"line": 857,
							"col": 121,
							"offset": 93195
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=211&selection=17,1,19,58",
					"original": "[p.211](Второй_мозг.pdf#page=211&selection=17,1,19,58)",
					"displayText": "p.211",
					"position": {
						"start": {
							"line": 861,
							"col": 169,
							"offset": 93422
						},
						"end": {
							"line": 861,
							"col": 223,
							"offset": 93476
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=211&selection=17,0,19,58",
					"original": "[p.211](Второй_мозг.pdf#page=211&selection=17,0,19,58)",
					"displayText": "p.211",
					"position": {
						"start": {
							"line": 865,
							"col": 170,
							"offset": 93704
						},
						"end": {
							"line": 865,
							"col": 224,
							"offset": 93758
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=212&selection=9,3,16,25",
					"original": "[p.212](Второй_мозг.pdf#page=212&selection=9,3,16,25)",
					"displayText": "p.212",
					"position": {
						"start": {
							"line": 867,
							"col": 365,
							"offset": 94126
						},
						"end": {
							"line": 867,
							"col": 418,
							"offset": 94179
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=212&selection=30,0,30,28&color=h4",
					"original": "[p.212](Второй_мозг.pdf#page=212&selection=30,0,30,28&color=h4)",
					"displayText": "p.212",
					"position": {
						"start": {
							"line": 869,
							"col": 85,
							"offset": 94267
						},
						"end": {
							"line": 869,
							"col": 148,
							"offset": 94330
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=213&selection=14,27,58,7",
					"original": "[p.213](Второй_мозг.pdf#page=213&selection=14,27,58,7)",
					"displayText": "p.213",
					"position": {
						"start": {
							"line": 876,
							"col": 62,
							"offset": 94713
						},
						"end": {
							"line": 876,
							"col": 116,
							"offset": 94767
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=213&selection=60,0,69,38",
					"original": "[p.213](Второй_мозг.pdf#page=213&selection=60,0,69,38)",
					"displayText": "p.213",
					"position": {
						"start": {
							"line": 878,
							"col": 389,
							"offset": 95159
						},
						"end": {
							"line": 878,
							"col": 443,
							"offset": 95213
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=214&selection=3,0,21,5",
					"original": "[p.214](Второй_мозг.pdf#page=214&selection=3,0,21,5)",
					"displayText": "p.214",
					"position": {
						"start": {
							"line": 885,
							"col": 61,
							"offset": 95576
						},
						"end": {
							"line": 885,
							"col": 113,
							"offset": 95628
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=214&selection=27,0,36,21",
					"original": "[p.214](Второй_мозг.pdf#page=214&selection=27,0,36,21)",
					"displayText": "p.214",
					"position": {
						"start": {
							"line": 887,
							"col": 71,
							"offset": 95702
						},
						"end": {
							"line": 887,
							"col": 125,
							"offset": 95756
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=214&selection=37,1,42,6",
					"original": "[p.214](Второй_мозг.pdf#page=214&selection=37,1,42,6)",
					"displayText": "p.214",
					"position": {
						"start": {
							"line": 889,
							"col": 209,
							"offset": 95968
						},
						"end": {
							"line": 889,
							"col": 262,
							"offset": 96021
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=214&selection=53,0,58,0",
					"original": "[p.214](Второй_мозг.pdf#page=214&selection=53,0,58,0)",
					"displayText": "p.214",
					"position": {
						"start": {
							"line": 891,
							"col": 60,
							"offset": 96084
						},
						"end": {
							"line": 891,
							"col": 113,
							"offset": 96137
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=215&selection=3,0,10,60",
					"original": "[p.215](Второй_мозг.pdf#page=215&selection=3,0,10,60)",
					"displayText": "p.215",
					"position": {
						"start": {
							"line": 893,
							"col": 457,
							"offset": 96597
						},
						"end": {
							"line": 893,
							"col": 510,
							"offset": 96650
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=215&selection=18,0,21,17",
					"original": "[p.215](Второй_мозг.pdf#page=215&selection=18,0,21,17)",
					"displayText": "p.215",
					"position": {
						"start": {
							"line": 895,
							"col": 75,
							"offset": 96728
						},
						"end": {
							"line": 895,
							"col": 129,
							"offset": 96782
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=215&selection=22,1,28,43",
					"original": "[p.215](Второй_мозг.pdf#page=215&selection=22,1,28,43)",
					"displayText": "p.215",
					"position": {
						"start": {
							"line": 897,
							"col": 320,
							"offset": 97105
						},
						"end": {
							"line": 897,
							"col": 374,
							"offset": 97159
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=215&selection=32,0,34,0",
					"original": "[p.215](Второй_мозг.pdf#page=215&selection=32,0,34,0)",
					"displayText": "p.215",
					"position": {
						"start": {
							"line": 899,
							"col": 64,
							"offset": 97226
						},
						"end": {
							"line": 899,
							"col": 117,
							"offset": 97279
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=215&selection=33,12,39,49",
					"original": "[p.215](Второй_мозг.pdf#page=215&selection=33,12,39,49)",
					"displayText": "p.215",
					"position": {
						"start": {
							"line": 901,
							"col": 269,
							"offset": 97551
						},
						"end": {
							"line": 901,
							"col": 324,
							"offset": 97606
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=216&selection=7,0,12,1",
					"original": "[p.216](Второй_мозг.pdf#page=216&selection=7,0,12,1)",
					"displayText": "p.216",
					"position": {
						"start": {
							"line": 903,
							"col": 148,
							"offset": 97757
						},
						"end": {
							"line": 903,
							"col": 200,
							"offset": 97809
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=216&selection=12,2,15,28",
					"original": "[p.216](Второй_мозг.pdf#page=216&selection=12,2,15,28)",
					"displayText": "p.216",
					"position": {
						"start": {
							"line": 905,
							"col": 173,
							"offset": 97985
						},
						"end": {
							"line": 905,
							"col": 227,
							"offset": 98039
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=216&selection=25,14,45,48",
					"original": "[p.216](Второй_мозг.pdf#page=216&selection=25,14,45,48)",
					"displayText": "p.216",
					"position": {
						"start": {
							"line": 909,
							"col": 147,
							"offset": 98459
						},
						"end": {
							"line": 909,
							"col": 202,
							"offset": 98514
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=217&selection=4,0,24,48",
					"original": "[p.217](Второй_мозг.pdf#page=217&selection=4,0,24,48)",
					"displayText": "p.217",
					"position": {
						"start": {
							"line": 912,
							"col": 304,
							"offset": 99034
						},
						"end": {
							"line": 912,
							"col": 357,
							"offset": 99087
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=217&selection=26,0,26,32",
					"original": "[p.217](Второй_мозг.pdf#page=217&selection=26,0,26,32)",
					"displayText": "p.217",
					"position": {
						"start": {
							"line": 914,
							"col": 35,
							"offset": 99125
						},
						"end": {
							"line": 914,
							"col": 89,
							"offset": 99179
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=218&selection=3,0,24,20",
					"original": "[p.218](Второй_мозг.pdf#page=218&selection=3,0,24,20)",
					"displayText": "p.218",
					"position": {
						"start": {
							"line": 921,
							"col": 130,
							"offset": 99656
						},
						"end": {
							"line": 921,
							"col": 183,
							"offset": 99709
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=218&selection=25,0,28,1",
					"original": "[p.218](Второй_мозг.pdf#page=218&selection=25,0,28,1)",
					"displayText": "p.218",
					"position": {
						"start": {
							"line": 923,
							"col": 36,
							"offset": 99748
						},
						"end": {
							"line": 923,
							"col": 89,
							"offset": 99801
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=218&selection=40,0,44,2",
					"original": "[p.218](Второй_мозг.pdf#page=218&selection=40,0,44,2)",
					"displayText": "p.218",
					"position": {
						"start": {
							"line": 925,
							"col": 84,
							"offset": 99888
						},
						"end": {
							"line": 925,
							"col": 137,
							"offset": 99941
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=218",
					"original": "[p.218](Второй_мозг.pdf#page=218)",
					"displayText": "p.218",
					"position": {
						"start": {
							"line": 927,
							"col": 379,
							"offset": 100323
						},
						"end": {
							"line": 927,
							"col": 412,
							"offset": 100356
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=219&selection=3,0,9,48",
					"original": "[p.219](Второй_мозг.pdf#page=219&selection=3,0,9,48)",
					"displayText": "p.219",
					"position": {
						"start": {
							"line": 929,
							"col": 404,
							"offset": 100763
						},
						"end": {
							"line": 929,
							"col": 456,
							"offset": 100815
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=219&selection=15,0,16,12",
					"original": "[p.219](Второй_мозг.pdf#page=219&selection=15,0,16,12)",
					"displayText": "p.219",
					"position": {
						"start": {
							"line": 931,
							"col": 70,
							"offset": 100888
						},
						"end": {
							"line": 931,
							"col": 124,
							"offset": 100942
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=219&selection=21,0,25,0",
					"original": "[p.219](Второй_мозг.pdf#page=219&selection=21,0,25,0)",
					"displayText": "p.219",
					"position": {
						"start": {
							"line": 933,
							"col": 77,
							"offset": 101022
						},
						"end": {
							"line": 933,
							"col": 130,
							"offset": 101075
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=220&selection=10,0,15,1",
					"original": "[p.220](Второй_мозг.pdf#page=220&selection=10,0,15,1)",
					"displayText": "p.220",
					"position": {
						"start": {
							"line": 935,
							"col": 61,
							"offset": 101139
						},
						"end": {
							"line": 935,
							"col": 114,
							"offset": 101192
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=220&selection=31,0,34,37",
					"original": "[p.220](Второй_мозг.pdf#page=220&selection=31,0,34,37)",
					"displayText": "p.220",
					"position": {
						"start": {
							"line": 937,
							"col": 211,
							"offset": 101406
						},
						"end": {
							"line": 937,
							"col": 265,
							"offset": 101460
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=220&selection=35,0,40,0",
					"original": "[p.220](Второй_мозг.pdf#page=220&selection=35,0,40,0)",
					"displayText": "p.220",
					"position": {
						"start": {
							"line": 939,
							"col": 132,
							"offset": 101595
						},
						"end": {
							"line": 939,
							"col": 185,
							"offset": 101648
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=220&selection=46,0,64,56",
					"original": "[p.220](Второй_мозг.pdf#page=220&selection=46,0,64,56)",
					"displayText": "p.220",
					"position": {
						"start": {
							"line": 941,
							"col": 401,
							"offset": 102052
						},
						"end": {
							"line": 941,
							"col": 455,
							"offset": 102106
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=221&selection=1,0,2,22",
					"original": "[p.221](Второй_мозг.pdf#page=221&selection=1,0,2,22)",
					"displayText": "p.221",
					"position": {
						"start": {
							"line": 943,
							"col": 89,
							"offset": 102198
						},
						"end": {
							"line": 943,
							"col": 141,
							"offset": 102250
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=221&selection=3,0,7,39",
					"original": "[p.221](Второй_мозг.pdf#page=221&selection=3,0,7,39)",
					"displayText": "p.221",
					"position": {
						"start": {
							"line": 945,
							"col": 269,
							"offset": 102522
						},
						"end": {
							"line": 945,
							"col": 321,
							"offset": 102574
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=221&selection=12,0,14,54",
					"original": "[p.221](Второй_мозг.pdf#page=221&selection=12,0,14,54)",
					"displayText": "p.221",
					"position": {
						"start": {
							"line": 947,
							"col": 170,
							"offset": 102747
						},
						"end": {
							"line": 947,
							"col": 224,
							"offset": 102801
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=221&selection=18,0,55,31",
					"original": "[p.221](Второй_мозг.pdf#page=221&selection=18,0,55,31)",
					"displayText": "p.221",
					"position": {
						"start": {
							"line": 952,
							"col": 282,
							"offset": 103536
						},
						"end": {
							"line": 952,
							"col": 336,
							"offset": 103590
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=222&selection=22,0,24,13&color=h3",
					"original": "[p.222](Второй_мозг.pdf#page=222&selection=22,0,24,13&color=h3)",
					"displayText": "p.222",
					"position": {
						"start": {
							"line": 956,
							"col": 87,
							"offset": 103925
						},
						"end": {
							"line": 956,
							"col": 150,
							"offset": 103988
						}
					}
				},
				{
					"link": "Второй_мозгпривести дела в порядок",
					"original": "[[Второй_мозгпривести дела в порядок|Как привести дела в порядок]]",
					"displayText": "Как привести дела в порядок",
					"position": {
						"start": {
							"line": 958,
							"col": 118,
							"offset": 104109
						},
						"end": {
							"line": 958,
							"col": 184,
							"offset": 104175
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=223&selection=7,0,10,4",
					"original": "[p.223](Второй_мозг.pdf#page=223&selection=7,0,10,4)",
					"displayText": "p.223",
					"position": {
						"start": {
							"line": 960,
							"col": 177,
							"offset": 104426
						},
						"end": {
							"line": 960,
							"col": 229,
							"offset": 104478
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=223&selection=19,0,20,39&color=h4",
					"original": "[p.223](Второй_мозг.pdf#page=223&selection=19,0,20,39&color=h4)",
					"displayText": "p.223",
					"position": {
						"start": {
							"line": 962,
							"col": 71,
							"offset": 104552
						},
						"end": {
							"line": 962,
							"col": 134,
							"offset": 104615
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=196",
					"original": "[p.196](Второй_мозг.pdf#page=196)",
					"displayText": "p.196",
					"position": {
						"start": {
							"line": 965,
							"col": 18,
							"offset": 104749
						},
						"end": {
							"line": 965,
							"col": 51,
							"offset": 104782
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=197",
					"original": "[p.197](Второй_мозг.pdf#page=197)",
					"displayText": "p.197",
					"position": {
						"start": {
							"line": 968,
							"col": 11,
							"offset": 104890
						},
						"end": {
							"line": 968,
							"col": 44,
							"offset": 104923
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=223&selection=39,46,57,25&color=h4",
					"original": "[p.223](Второй_мозг.pdf#page=223&selection=39,46,57,25&color=h4)",
					"displayText": "p.223",
					"position": {
						"start": {
							"line": 969,
							"col": 29,
							"offset": 105005
						},
						"end": {
							"line": 969,
							"col": 93,
							"offset": 105069
						}
					}
				},
				{
					"link": "Чек-лист.md",
					"original": "[Чек-лист](Чек-лист.md)",
					"displayText": "Чек-лист",
					"position": {
						"start": {
							"line": 969,
							"col": 96,
							"offset": 105072
						},
						"end": {
							"line": 969,
							"col": 119,
							"offset": 105095
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=226&selection=22,0,37,29&color=note",
					"original": "[p.226](Второй_мозг.pdf#page=226&selection=22,0,37,29&color=note)",
					"displayText": "p.226",
					"position": {
						"start": {
							"line": 978,
							"col": 33,
							"offset": 105466
						},
						"end": {
							"line": 978,
							"col": 98,
							"offset": 105531
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=226&selection=38,0,41,1&color=note",
					"original": "[p.226](Второй_мозг.pdf#page=226&selection=38,0,41,1&color=note)",
					"displayText": "p.226",
					"position": {
						"start": {
							"line": 980,
							"col": 34,
							"offset": 105568
						},
						"end": {
							"line": 980,
							"col": 98,
							"offset": 105632
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=226&selection=48,0,51,0&color=note",
					"original": "[p.226](Второй_мозг.pdf#page=226&selection=48,0,51,0&color=note)",
					"displayText": "p.226",
					"position": {
						"start": {
							"line": 982,
							"col": 44,
							"offset": 105679
						},
						"end": {
							"line": 982,
							"col": 108,
							"offset": 105743
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=227&selection=4,0,7,1&color=note",
					"original": "[p.227](Второй_мозг.pdf#page=227&selection=4,0,7,1&color=note)",
					"displayText": "p.227",
					"position": {
						"start": {
							"line": 984,
							"col": 43,
							"offset": 105789
						},
						"end": {
							"line": 984,
							"col": 105,
							"offset": 105851
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=227&selection=21,0,25,0&color=note",
					"original": "[p.227](Второй_мозг.pdf#page=227&selection=21,0,25,0&color=note)",
					"displayText": "p.227",
					"position": {
						"start": {
							"line": 986,
							"col": 57,
							"offset": 105911
						},
						"end": {
							"line": 986,
							"col": 121,
							"offset": 105975
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=228&selection=1,0,4,0&color=note",
					"original": "[p.228](Второй_мозг.pdf#page=228&selection=1,0,4,0&color=note)",
					"displayText": "p.228",
					"position": {
						"start": {
							"line": 988,
							"col": 34,
							"offset": 106012
						},
						"end": {
							"line": 988,
							"col": 96,
							"offset": 106074
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=228&selection=13,0,14,27&color=note",
					"original": "[p.228](Второй_мозг.pdf#page=228&selection=13,0,14,27&color=note)",
					"displayText": "p.228",
					"position": {
						"start": {
							"line": 990,
							"col": 75,
							"offset": 106152
						},
						"end": {
							"line": 990,
							"col": 140,
							"offset": 106217
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=228&selection=19,45,23,22&color=note",
					"original": "[p.228](Второй_мозг.pdf#page=228&selection=19,45,23,22&color=note)",
					"displayText": "p.228",
					"position": {
						"start": {
							"line": 992,
							"col": 209,
							"offset": 106429
						},
						"end": {
							"line": 992,
							"col": 275,
							"offset": 106495
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=228&selection=23,21,48,50&color=note",
					"original": "[p.228](Второй_мозг.pdf#page=228&selection=23,21,48,50&color=note)",
					"displayText": "p.228",
					"position": {
						"start": {
							"line": 999,
							"col": 152,
							"offset": 107214
						},
						"end": {
							"line": 999,
							"col": 218,
							"offset": 107280
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=229&selection=3,0,11,17&color=note",
					"original": "[p.229](Второй_мозг.pdf#page=229&selection=3,0,11,17&color=note)",
					"displayText": "p.229",
					"position": {
						"start": {
							"line": 1002,
							"col": 172,
							"offset": 107572
						},
						"end": {
							"line": 1002,
							"col": 236,
							"offset": 107636
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=231&selection=17,0,18,38&color=h3",
					"original": "[p.231](Второй_мозг.pdf#page=231&selection=17,0,18,38&color=h3)",
					"displayText": "p.231",
					"position": {
						"start": {
							"line": 1004,
							"col": 76,
							"offset": 107715
						},
						"end": {
							"line": 1004,
							"col": 139,
							"offset": 107778
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=232&selection=2,30,7,19&color=h4",
					"original": "[p.232](Второй_мозг.pdf#page=232&selection=2,30,7,19&color=h4)",
					"displayText": "p.232",
					"position": {
						"start": {
							"line": 1006,
							"col": 284,
							"offset": 108065
						},
						"end": {
							"line": 1006,
							"col": 346,
							"offset": 108127
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=232&selection=8,0,28,17&color=h4",
					"original": "[p.232](Второй_мозг.pdf#page=232&selection=8,0,28,17&color=h4)",
					"displayText": "p.232",
					"position": {
						"start": {
							"line": 1012,
							"col": 173,
							"offset": 108697
						},
						"end": {
							"line": 1012,
							"col": 235,
							"offset": 108759
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=207&selection=2,0,5,22&color=h2",
					"original": "[p.207](Второй_мозг.pdf#page=207&selection=2,0,5,22&color=h2)",
					"displayText": "p.207",
					"position": {
						"start": {
							"line": 1014,
							"col": 50,
							"offset": 108811
						},
						"end": {
							"line": 1014,
							"col": 111,
							"offset": 108872
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=207&selection=7,0,13,34",
					"original": "[p.207](Второй_мозг.pdf#page=207&selection=7,0,13,34)",
					"displayText": "p.207",
					"position": {
						"start": {
							"line": 1016,
							"col": 281,
							"offset": 109155
						},
						"end": {
							"line": 1016,
							"col": 334,
							"offset": 109208
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=207&selection=15,0,16,36",
					"original": "[p.207](Второй_мозг.pdf#page=207&selection=15,0,16,36)",
					"displayText": "p.207",
					"position": {
						"start": {
							"line": 1018,
							"col": 96,
							"offset": 109307
						},
						"end": {
							"line": 1018,
							"col": 150,
							"offset": 109361
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=208&selection=3,0,4,46",
					"original": "[p.208](Второй_мозг.pdf#page=208&selection=3,0,4,46)",
					"displayText": "p.208",
					"position": {
						"start": {
							"line": 1020,
							"col": 100,
							"offset": 109463
						},
						"end": {
							"line": 1020,
							"col": 152,
							"offset": 109515
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=233&selection=2,0,4,21&color=h2",
					"original": "[p.233](Второй_мозг.pdf#page=233&selection=2,0,4,21&color=h2)",
					"displayText": "p.233",
					"position": {
						"start": {
							"line": 1021,
							"col": 34,
							"offset": 109550
						},
						"end": {
							"line": 1021,
							"col": 95,
							"offset": 109611
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=233&selection=6,0,13,1&color=defeniton",
					"original": "[p.233](Второй_мозг.pdf#page=233&selection=6,0,13,1&color=defeniton)",
					"displayText": "p.233",
					"position": {
						"start": {
							"line": 1023,
							"col": 163,
							"offset": 109777
						},
						"end": {
							"line": 1023,
							"col": 231,
							"offset": 109845
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=234&selection=6,0,12,5",
					"original": "[p.234](Второй_мозг.pdf#page=234&selection=6,0,12,5)",
					"displayText": "p.234",
					"position": {
						"start": {
							"line": 1025,
							"col": 363,
							"offset": 110211
						},
						"end": {
							"line": 1025,
							"col": 415,
							"offset": 110263
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=234&selection=15,0,16,31&color=h3",
					"original": "[p.234](Второй_мозг.pdf#page=234&selection=15,0,16,31&color=h3)",
					"displayText": "p.234",
					"position": {
						"start": {
							"line": 1027,
							"col": 72,
							"offset": 110338
						},
						"end": {
							"line": 1027,
							"col": 135,
							"offset": 110401
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=234&selection=33,0,35,18",
					"original": "[p.234](Второй_мозг.pdf#page=234&selection=33,0,35,18)",
					"displayText": "p.234",
					"position": {
						"start": {
							"line": 1029,
							"col": 130,
							"offset": 110534
						},
						"end": {
							"line": 1029,
							"col": 184,
							"offset": 110588
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=235&selection=50,0,50,41&color=h3",
					"original": "[p.235](Второй_мозг.pdf#page=235&selection=50,0,50,41&color=h3)",
					"displayText": "p.235",
					"position": {
						"start": {
							"line": 1031,
							"col": 46,
							"offset": 110637
						},
						"end": {
							"line": 1031,
							"col": 109,
							"offset": 110700
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=236&selection=1,12,5,53",
					"original": "[p.236](Второй_мозг.pdf#page=236&selection=1,12,5,53)",
					"displayText": "p.236",
					"position": {
						"start": {
							"line": 1033,
							"col": 276,
							"offset": 110979
						},
						"end": {
							"line": 1033,
							"col": 329,
							"offset": 111032
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=237&selection=41,0,41,31&color=h3",
					"original": "[p.237](Второй_мозг.pdf#page=237&selection=41,0,41,31&color=h3)",
					"displayText": "p.237",
					"position": {
						"start": {
							"line": 1035,
							"col": 36,
							"offset": 111071
						},
						"end": {
							"line": 1035,
							"col": 99,
							"offset": 111134
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=239&selection=16,0,16,22&color=h3",
					"original": "[p.239](Второй_мозг.pdf#page=239&selection=16,0,16,22&color=h3)",
					"displayText": "p.239",
					"position": {
						"start": {
							"line": 1037,
							"col": 27,
							"offset": 111164
						},
						"end": {
							"line": 1037,
							"col": 90,
							"offset": 111227
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=240&selection=7,52,14,41",
					"original": "[p.240](Второй_мозг.pdf#page=240&selection=7,52,14,41)",
					"displayText": "p.240",
					"position": {
						"start": {
							"line": 1039,
							"col": 396,
							"offset": 111626
						},
						"end": {
							"line": 1039,
							"col": 450,
							"offset": 111680
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=241&selection=9,0,9,25&color=h3",
					"original": "[p.241](Второй_мозг.pdf#page=241&selection=9,0,9,25&color=h3)",
					"displayText": "p.241",
					"position": {
						"start": {
							"line": 1041,
							"col": 30,
							"offset": 111713
						},
						"end": {
							"line": 1041,
							"col": 91,
							"offset": 111774
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=243&selection=5,0,5,26&color=h3",
					"original": "[p.243](Второй_мозг.pdf#page=243&selection=5,0,5,26&color=h3)",
					"displayText": "p.243",
					"position": {
						"start": {
							"line": 1043,
							"col": 31,
							"offset": 111808
						},
						"end": {
							"line": 1043,
							"col": 92,
							"offset": 111869
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=245&selection=0,3,3,13&color=h3",
					"original": "[p.245](Второй_мозг.pdf#page=245&selection=0,3,3,13&color=h3)",
					"displayText": "p.245",
					"position": {
						"start": {
							"line": 1047,
							"col": 57,
							"offset": 112258
						},
						"end": {
							"line": 1047,
							"col": 118,
							"offset": 112319
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=246&selection=24,0,24,33&color=h3",
					"original": "[p.246](Второй_мозг.pdf#page=246&selection=24,0,24,33&color=h3)",
					"displayText": "p.246",
					"position": {
						"start": {
							"line": 1049,
							"col": 38,
							"offset": 112360
						},
						"end": {
							"line": 1049,
							"col": 101,
							"offset": 112423
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=247&selection=30,0,30,31&color=h3",
					"original": "[p.247](Второй_мозг.pdf#page=247&selection=30,0,30,31&color=h3)",
					"displayText": "p.247",
					"position": {
						"start": {
							"line": 1051,
							"col": 36,
							"offset": 112462
						},
						"end": {
							"line": 1051,
							"col": 99,
							"offset": 112525
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=249&selection=2,31,35,51",
					"original": "[p.249](Второй_мозг.pdf#page=249&selection=2,31,35,51)",
					"displayText": "p.249",
					"position": {
						"start": {
							"line": 1056,
							"col": 256,
							"offset": 113368
						},
						"end": {
							"line": 1056,
							"col": 310,
							"offset": 113422
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=249&selection=36,0,39,40",
					"original": "[p.249](Второй_мозг.pdf#page=249&selection=36,0,39,40)",
					"displayText": "p.249",
					"position": {
						"start": {
							"line": 1058,
							"col": 210,
							"offset": 113635
						},
						"end": {
							"line": 1058,
							"col": 264,
							"offset": 113689
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=249&selection=43,0,61,48",
					"original": "[p.249](Второй_мозг.pdf#page=249&selection=43,0,61,48)",
					"displayText": "p.249",
					"position": {
						"start": {
							"line": 1060,
							"col": 557,
							"offset": 114249
						},
						"end": {
							"line": 1060,
							"col": 611,
							"offset": 114303
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=250&selection=4,0,101,52",
					"original": "[p.250](Второй_мозг.pdf#page=250&selection=4,0,101,52)",
					"displayText": "p.250",
					"position": {
						"start": {
							"line": 1062,
							"col": 1669,
							"offset": 115975
						},
						"end": {
							"line": 1062,
							"col": 1723,
							"offset": 116029
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=251&selection=1,0,80,31",
					"original": "[p.251](Второй_мозг.pdf#page=251&selection=1,0,80,31)",
					"displayText": "p.251",
					"position": {
						"start": {
							"line": 1064,
							"col": 1689,
							"offset": 117721
						},
						"end": {
							"line": 1064,
							"col": 1742,
							"offset": 117774
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=253&selection=2,0,5,13&color=h2",
					"original": "[p.253](Второй_мозг.pdf#page=253&selection=2,0,5,13&color=h2)",
					"displayText": "p.253",
					"position": {
						"start": {
							"line": 1066,
							"col": 43,
							"offset": 117820
						},
						"end": {
							"line": 1066,
							"col": 104,
							"offset": 117881
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=254&selection=4,0,5,15",
					"original": "[p.254](Второй_мозг.pdf#page=254&selection=4,0,5,15)",
					"displayText": "p.254",
					"position": {
						"start": {
							"line": 1068,
							"col": 76,
							"offset": 117960
						},
						"end": {
							"line": 1068,
							"col": 128,
							"offset": 118012
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=255&selection=2,0,2,13&color=h2",
					"original": "[p.255](Второй_мозг.pdf#page=255&selection=2,0,2,13&color=h2)",
					"displayText": "p.255",
					"position": {
						"start": {
							"line": 1070,
							"col": 17,
							"offset": 118032
						},
						"end": {
							"line": 1070,
							"col": 78,
							"offset": 118093
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=259&selection=2,0,3,12&color=h2",
					"original": "[p.259](Второй_мозг.pdf#page=259&selection=2,0,3,12&color=h2)",
					"displayText": "p.259",
					"position": {
						"start": {
							"line": 1072,
							"col": 39,
							"offset": 118135
						},
						"end": {
							"line": 1072,
							"col": 100,
							"offset": 118196
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=260&selection=2,0,2,18",
					"original": "[p.260](Второй_мозг.pdf#page=260&selection=2,0,2,18)",
					"displayText": "p.260",
					"position": {
						"start": {
							"line": 1074,
							"col": 22,
							"offset": 118221
						},
						"end": {
							"line": 1074,
							"col": 74,
							"offset": 118273
						}
					}
				}
			],
			"embeds": [
				{
					"link": "Building a Second Brain - Tiago Forte 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1.jpg",
					"original": "![[Building a Second Brain - Tiago Forte 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1.jpg|200]]",
					"displayText": "200",
					"position": {
						"start": {
							"line": 31,
							"col": 0,
							"offset": 2170
						},
						"end": {
							"line": 31,
							"col": 98,
							"offset": 2268
						}
					}
				},
				{
					"link": "Второй_мозгФорте, Создай свой \"Второй мозг\"",
					"original": "![[Второй_мозгФорте, Создай свой \"Второй мозг\"|Тьяго Форте, Создай свой \"Второй мозг\"]]",
					"displayText": "Тьяго Форте, Создай свой \"Второй мозг\"",
					"position": {
						"start": {
							"line": 46,
							"col": 0,
							"offset": 2363
						},
						"end": {
							"line": 46,
							"col": 87,
							"offset": 2450
						}
					}
				},
				{
					"link": "Тьяго Форте",
					"original": "![[Тьяго Форте]]",
					"displayText": "Тьяго Форте",
					"position": {
						"start": {
							"line": 47,
							"col": 0,
							"offset": 2451
						},
						"end": {
							"line": 47,
							"col": 16,
							"offset": 2467
						}
					}
				},
				{
					"link": "Pasted image 20241031113720.png",
					"original": "![Pasted image 20241031113720.png](Pasted%20image%2020241031113720.png)",
					"displayText": "Pasted image 20241031113720.png",
					"position": {
						"start": {
							"line": 184,
							"col": 0,
							"offset": 17954
						},
						"end": {
							"line": 184,
							"col": 71,
							"offset": 18025
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=94&rect=60,72,335,220",
					"original": "![p.94](Второй_мозг.pdf#page=94&rect=60,72,335,220)",
					"displayText": "p.94",
					"position": {
						"start": {
							"line": 456,
							"col": 0,
							"offset": 49295
						},
						"end": {
							"line": 456,
							"col": 51,
							"offset": 49346
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=126&rect=62,228,337,414",
					"original": "![p.126](Второй_мозг.pdf#page=126&rect=62,228,337,414)",
					"displayText": "p.126",
					"position": {
						"start": {
							"line": 557,
							"col": 3,
							"offset": 61337
						},
						"end": {
							"line": 557,
							"col": 57,
							"offset": 61391
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=132&rect=45,62,352,555",
					"original": "![p.132](Второй_мозг.pdf#page=132&rect=45,62,352,555)",
					"displayText": "p.132",
					"position": {
						"start": {
							"line": 569,
							"col": 3,
							"offset": 63786
						},
						"end": {
							"line": 569,
							"col": 56,
							"offset": 63839
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=186&rect=65,179,336,313",
					"original": "![p.186](Второй_мозг.pdf#page=186&rect=65,179,336,313)",
					"displayText": "p.186",
					"position": {
						"start": {
							"line": 782,
							"col": 0,
							"offset": 85741
						},
						"end": {
							"line": 782,
							"col": 54,
							"offset": 85795
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=188&rect=72,57,317,168",
					"original": "![p.188](Второй_мозг.pdf#page=188&rect=72,57,317,168)",
					"displayText": "p.188",
					"position": {
						"start": {
							"line": 806,
							"col": 0,
							"offset": 87369
						},
						"end": {
							"line": 806,
							"col": 53,
							"offset": 87422
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=191&rect=45,64,354,208",
					"original": "![p.191](Второй_мозг.pdf#page=191&rect=45,64,354,208)",
					"displayText": "p.191",
					"position": {
						"start": {
							"line": 826,
							"col": 181,
							"offset": 89917
						},
						"end": {
							"line": 826,
							"col": 234,
							"offset": 89970
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=192&rect=45,303,351,554",
					"original": "![p.192](Второй_мозг.pdf#page=192&rect=45,303,351,554)",
					"displayText": "p.192",
					"position": {
						"start": {
							"line": 827,
							"col": 2,
							"offset": 89973
						},
						"end": {
							"line": 827,
							"col": 56,
							"offset": 90027
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=211&rect=60,311,336,397",
					"original": "![p.211](Второй_мозг.pdf#page=211&rect=60,311,336,397)",
					"displayText": "p.211",
					"position": {
						"start": {
							"line": 859,
							"col": 0,
							"offset": 93197
						},
						"end": {
							"line": 859,
							"col": 54,
							"offset": 93251
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=211&rect=59,55,342,200",
					"original": "![p.211](Второй_мозг.pdf#page=211&rect=59,55,342,200)",
					"displayText": "p.211",
					"position": {
						"start": {
							"line": 863,
							"col": 0,
							"offset": 93479
						},
						"end": {
							"line": 863,
							"col": 53,
							"offset": 93532
						}
					}
				},
				{
					"link": "Второй_мозг.pdf#page=212&rect=57,183,337,324",
					"original": "![p.212](Второй_мозг.pdf#page=212&rect=57,183,337,324)",
					"displayText": "p.212",
					"position": {
						"start": {
							"line": 869,
							"col": 0,
							"offset": 94182
						},
						"end": {
							"line": 869,
							"col": 54,
							"offset": 94236
						}
					}
				}
			],
			"tags": [
				{
					"tag": "#think",
					"position": {
						"start": {
							"line": 77,
							"col": 122,
							"offset": 5098
						},
						"end": {
							"line": 77,
							"col": 128,
							"offset": 5104
						}
					}
				},
				{
					"tag": "#bookmark",
					"position": {
						"start": {
							"line": 163,
							"col": 45,
							"offset": 15360
						},
						"end": {
							"line": 163,
							"col": 54,
							"offset": 15369
						}
					}
				},
				{
					"tag": "#think/my",
					"position": {
						"start": {
							"line": 241,
							"col": 304,
							"offset": 23765
						},
						"end": {
							"line": 241,
							"col": 313,
							"offset": 23774
						}
					}
				},
				{
					"tag": "#book/mention",
					"position": {
						"start": {
							"line": 408,
							"col": 298,
							"offset": 43924
						},
						"end": {
							"line": 408,
							"col": 311,
							"offset": 43937
						}
					}
				},
				{
					"tag": "#PKM",
					"position": {
						"start": {
							"line": 1064,
							"col": 1433,
							"offset": 117465
						},
						"end": {
							"line": 1064,
							"col": 1437,
							"offset": 117469
						}
					}
				},
				{
					"tag": "#SecondBrain",
					"position": {
						"start": {
							"line": 1064,
							"col": 1439,
							"offset": 117471
						},
						"end": {
							"line": 1064,
							"col": 1451,
							"offset": 117483
						}
					}
				},
				{
					"tag": "#BASB",
					"position": {
						"start": {
							"line": 1064,
							"col": 1453,
							"offset": 117485
						},
						"end": {
							"line": 1064,
							"col": 1458,
							"offset": 117490
						}
					}
				},
				{
					"tag": "#toolsforthought",
					"position": {
						"start": {
							"line": 1064,
							"col": 1463,
							"offset": 117495
						},
						"end": {
							"line": 1064,
							"col": 1479,
							"offset": 117511
						}
					}
				}
			],
			"headings": [
				{
					"heading": "How I Manage Books and Summaries in Obsidian",
					"level": 1,
					"position": {
						"start": {
							"line": 27,
							"col": 0,
							"offset": 2088
						},
						"end": {
							"line": 27,
							"col": 46,
							"offset": 2134
						}
					}
				},
				{
					"heading": "Brief Description",
					"level": 1,
					"position": {
						"start": {
							"line": 33,
							"col": 0,
							"offset": 2270
						},
						"end": {
							"line": 33,
							"col": 19,
							"offset": 2289
						}
					}
				},
				{
					"heading": "Key Quotes",
					"level": 1,
					"position": {
						"start": {
							"line": 35,
							"col": 0,
							"offset": 2291
						},
						"end": {
							"line": 35,
							"col": 12,
							"offset": 2303
						}
					}
				},
				{
					"heading": "Key Ideas",
					"level": 1,
					"position": {
						"start": {
							"line": 38,
							"col": 0,
							"offset": 2312
						},
						"end": {
							"line": 38,
							"col": 11,
							"offset": 2323
						}
					}
				},
				{
					"heading": "Chapter 1: ...",
					"level": 1,
					"position": {
						"start": {
							"line": 41,
							"col": 0,
							"offset": 2329
						},
						"end": {
							"line": 41,
							"col": 16,
							"offset": 2345
						}
					}
				},
				{
					"heading": "Заметки",
					"level": 2,
					"position": {
						"start": {
							"line": 44,
							"col": 0,
							"offset": 2351
						},
						"end": {
							"line": 44,
							"col": 10,
							"offset": 2361
						}
					}
				},
				{
					"heading": "Task",
					"level": 1,
					"position": {
						"start": {
							"line": 49,
							"col": 0,
							"offset": 2469
						},
						"end": {
							"line": 49,
							"col": 6,
							"offset": 2475
						}
					}
				},
				{
					"heading": "Мост Хаменгуея",
					"level": 2,
					"position": {
						"start": {
							"line": 52,
							"col": 0,
							"offset": 2645
						},
						"end": {
							"line": 52,
							"col": 17,
							"offset": 2662
						}
					}
				},
				{
					"heading": "[Building a Second Brain - Tiago Forte. ЗМКН.Создай свой \"Второй мозг\"](Building%20a%20Second%20Brain%20-%20Tiago%20Forte.%20ЗМКН.Создай%20свой%20\"Второй%20мозг\".md)",
					"level": 3,
					"position": {
						"start": {
							"line": 54,
							"col": 0,
							"offset": 2664
						},
						"end": {
							"line": 54,
							"col": 169,
							"offset": 2833
						}
					}
				},
				{
					"heading": "ВВЕДЕНИЕ. Что Обещает Эта Книга? [page](Второй_мозг.pdf#page=5&selection=2,0,4,22&color=yellow)",
					"level": 1,
					"position": {
						"start": {
							"line": 62,
							"col": 0,
							"offset": 3360
						},
						"end": {
							"line": 62,
							"col": 97,
							"offset": 3457
						}
					}
				},
				{
					"heading": "ЧАСТЬ I. Фундамент. Осознаём Пределы Возможного [page](Второй_мозг.pdf#page=10&selection=0,7,3,27)",
					"level": 1,
					"position": {
						"start": {
							"line": 69,
							"col": 0,
							"offset": 4325
						},
						"end": {
							"line": 69,
							"col": 100,
							"offset": 4425
						}
					}
				},
				{
					"heading": "ГЛАВА 1. С Чего Все Началось [p.11](Второй_мозг.pdf#page=11&selection=2,0,4,19&color=yellow)",
					"level": 2,
					"position": {
						"start": {
							"line": 71,
							"col": 0,
							"offset": 4427
						},
						"end": {
							"line": 71,
							"col": 95,
							"offset": 4522
						}
					}
				},
				{
					"heading": "ГЛАВА 2. Что Такое «второй мозг»? [page](Второй_мозг.pdf#page=20&selection=2,0,4,24&color=yellow)",
					"level": 2,
					"position": {
						"start": {
							"line": 82,
							"col": 0,
							"offset": 5303
						},
						"end": {
							"line": 82,
							"col": 100,
							"offset": 5403
						}
					}
				},
				{
					"heading": "ГЛАВА 3. Как Работает «второй мозг» [page](Второй_мозг.pdf#page=36&selection=0,2,11,23&color=yellow)",
					"level": 2,
					"position": {
						"start": {
							"line": 118,
							"col": 0,
							"offset": 10027
						},
						"end": {
							"line": 118,
							"col": 103,
							"offset": 10130
						}
					}
				},
				{
					"heading": "Суперсилы «второго мозга» [p.37](Второй_мозг.pdf#page=37&selection=4,0,4,25&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 123,
							"col": 0,
							"offset": 10296
						},
						"end": {
							"line": 123,
							"col": 89,
							"offset": 10385
						}
					}
				},
				{
					"heading": "Суперсила «второго мозга» № 1: Конкретизируем Свои Идеи [page](Второй_мозг.pdf#page=37&selection=22,0,23,24&color=yellow)",
					"level": 4,
					"position": {
						"start": {
							"line": 131,
							"col": 0,
							"offset": 10745
						},
						"end": {
							"line": 131,
							"col": 126,
							"offset": 10871
						}
					}
				},
				{
					"heading": "Суперсила «второго мозга» № 2: Выявляем Новые Ассоциации Между Идеями [page](Второй_мозг.pdf#page=38&selection=26,0,27,38&color=yellow)",
					"level": 4,
					"position": {
						"start": {
							"line": 137,
							"col": 0,
							"offset": 11470
						},
						"end": {
							"line": 137,
							"col": 140,
							"offset": 11610
						}
					}
				},
				{
					"heading": "Суперсила «второго мозга» № 3: Сохраняем Идеи И Развиваем Их Со Временем [page](Второй_мозг.pdf#page=39&selection=15,0,16,41&color=yellow)",
					"level": 4,
					"position": {
						"start": {
							"line": 143,
							"col": 0,
							"offset": 12283
						},
						"end": {
							"line": 143,
							"col": 143,
							"offset": 12426
						}
					}
				},
				{
					"heading": "Суперсила «второго мозга» № 4: Шлифуем Уникальность Наших Точек Зрения [page](Второй_мозг.pdf#page=40&selection=9,0,10,39&color=yellow)",
					"level": 4,
					"position": {
						"start": {
							"line": 149,
							"col": 0,
							"offset": 13044
						},
						"end": {
							"line": 149,
							"col": 140,
							"offset": 13184
						}
					}
				},
				{
					"heading": "Выбираем Приложение Для Ведения Заметок: Нейронный Центр Вашего «второго мозга» [page](Второй_мозг.pdf#page=41&selection=19,0,20,38)",
					"level": 3,
					"position": {
						"start": {
							"line": 155,
							"col": 0,
							"offset": 13624
						},
						"end": {
							"line": 155,
							"col": 136,
							"offset": 13760
						}
					}
				},
				{
					"heading": "Запоминай, Соединяй, Создавай: Три Стадии Управления Личными Знаниями [page](Второй_мозг.pdf#page=44&selection=12,0,13,38)",
					"level": 3,
					"position": {
						"start": {
							"line": 169,
							"col": 0,
							"offset": 16123
						},
						"end": {
							"line": 169,
							"col": 126,
							"offset": 16249
						}
					}
				},
				{
					"heading": "Введение В Метод CODE: Четыре Шага К Запоминанию Важного [page](Второй_мозг.pdf#page=46&selection=13,0,14,33)",
					"level": 3,
					"position": {
						"start": {
							"line": 181,
							"col": 0,
							"offset": 17507
						},
						"end": {
							"line": 181,
							"col": 113,
							"offset": 17620
						}
					}
				},
				{
					"heading": "Шаг 1. Capture: Удерживаем То, Что Вызывает У Вас Отклик [page](Второй_мозг.pdf#page=47&selection=34,0,35,40&color=yellow)",
					"level": 4,
					"position": {
						"start": {
							"line": 186,
							"col": 0,
							"offset": 18028
						},
						"end": {
							"line": 186,
							"col": 127,
							"offset": 18155
						}
					}
				},
				{
					"heading": "Шаг 2. Organize: Применяем Сохраненные Данные На Практике [page](Второй_мозг.pdf#page=49&selection=25,0,26,40)",
					"level": 4,
					"position": {
						"start": {
							"line": 198,
							"col": 0,
							"offset": 19507
						},
						"end": {
							"line": 198,
							"col": 115,
							"offset": 19622
						}
					}
				},
				{
					"heading": "Шаг 3. Distill: Извлекаем Суть [page](Второй_мозг.pdf#page=50&selection=30,0,30,30)",
					"level": 4,
					"position": {
						"start": {
							"line": 206,
							"col": 0,
							"offset": 20106
						},
						"end": {
							"line": 206,
							"col": 88,
							"offset": 20194
						}
					}
				},
				{
					"heading": "Шаг 4. Express: Демонстрируем Свою Работу [page](Второй_мозг.pdf#page=52&selection=2,0,2,41&color=red)",
					"level": 4,
					"position": {
						"start": {
							"line": 220,
							"col": 0,
							"offset": 21659
						},
						"end": {
							"line": 220,
							"col": 107,
							"offset": 21766
						}
					}
				},
				{
					"heading": "ЧАСТЬ II. Четыре Шага Метода CODE [page](Второй_мозг.pdf#page=55&selection=0,0,2,11)",
					"level": 1,
					"position": {
						"start": {
							"line": 232,
							"col": 0,
							"offset": 22924
						},
						"end": {
							"line": 232,
							"col": 86,
							"offset": 23010
						}
					}
				},
				{
					"heading": "ГЛАВА 4. Шаг 1. Сохраняем То, Что Вызвало Наш Отклик [page](Второй_мозг.pdf#page=56&selection=0,2,5,22)",
					"level": 2,
					"position": {
						"start": {
							"line": 234,
							"col": 0,
							"offset": 23012
						},
						"end": {
							"line": 234,
							"col": 106,
							"offset": 23118
						}
					}
				},
				{
					"heading": "Создание Личной Коллекции Знаний [page](Второй_мозг.pdf#page=57&selection=16,0,16,32)",
					"level": 3,
					"position": {
						"start": {
							"line": 243,
							"col": 0,
							"offset": 23778
						},
						"end": {
							"line": 243,
							"col": 89,
							"offset": 23867
						}
					}
				},
				{
					"heading": "Создание Банка Знаний: Как Постоянно «получать проценты» От Своих Мыслей [page](Второй_мозг.pdf#page=60&selection=2,0,4,15)",
					"level": 3,
					"position": {
						"start": {
							"line": 253,
							"col": 0,
							"offset": 25005
						},
						"end": {
							"line": 253,
							"col": 127,
							"offset": 25132
						}
					}
				},
				{
					"heading": "Что Не Нужно Сохранять [page](Второй_мозг.pdf#page=63&selection=24,0,28,9)",
					"level": 3,
					"position": {
						"start": {
							"line": 278,
							"col": 0,
							"offset": 27661
						},
						"end": {
							"line": 278,
							"col": 78,
							"offset": 27739
						}
					}
				},
				{
					"heading": "Двенадцать Любимых Вопросов: Метод Сохранения Информации От Нобелевского Лауреата [page](Второй_мозг.pdf#page=64&selection=37,0,39,24)",
					"level": 3,
					"position": {
						"start": {
							"line": 287,
							"col": 0,
							"offset": 29250
						},
						"end": {
							"line": 287,
							"col": 138,
							"offset": 29388
						}
					}
				},
				{
					"heading": "Критерии Сохранения Информации: Как Не Сохранить Слишком Много (или Слишком мало) [page](Второй_мозг.pdf#page=69&selection=31,0,33,18)",
					"level": 3,
					"position": {
						"start": {
							"line": 290,
							"col": 0,
							"offset": 29439
						},
						"end": {
							"line": 290,
							"col": 138,
							"offset": 29577
						}
					}
				},
				{
					"heading": "Критерий Сохранения № 1: Информация Меня Вдохновляет? [page](Второй_мозг.pdf#page=71&selection=29,0,29,53)",
					"level": 4,
					"position": {
						"start": {
							"line": 310,
							"col": 0,
							"offset": 31735
						},
						"end": {
							"line": 310,
							"col": 111,
							"offset": 31846
						}
					}
				},
				{
					"heading": "Критерий Сохранения № 2: Полезна Ли Информация? [page](Второй_мозг.pdf#page=72&selection=6,0,6,47)",
					"level": 4,
					"position": {
						"start": {
							"line": 316,
							"col": 0,
							"offset": 32411
						},
						"end": {
							"line": 316,
							"col": 103,
							"offset": 32514
						}
					}
				},
				{
					"heading": "Критерий Сохранения № 3: Личная Ли Информация? [page](Второй_мозг.pdf#page=72&selection=25,0,25,46)",
					"level": 4,
					"position": {
						"start": {
							"line": 320,
							"col": 0,
							"offset": 32877
						},
						"end": {
							"line": 320,
							"col": 104,
							"offset": 32981
						}
					}
				},
				{
					"heading": "Критерий Сохранения № 4: Удивляет Ли Вас Эта Информация? [page](Второй_мозг.pdf#page=73&selection=10,0,11,31)",
					"level": 4,
					"position": {
						"start": {
							"line": 326,
							"col": 0,
							"offset": 33798
						},
						"end": {
							"line": 326,
							"col": 114,
							"offset": 33912
						}
					}
				},
				{
					"heading": "Вывод: Сохраняйте То, Что Вызывает Отклик [page](Второй_мозг.pdf#page=74&selection=15,0,15,41)",
					"level": 3,
					"position": {
						"start": {
							"line": 337,
							"col": 0,
							"offset": 35193
						},
						"end": {
							"line": 337,
							"col": 98,
							"offset": 35291
						}
					}
				},
				{
					"heading": "Не Приложениями Едиными: Выбираем Инструменты Для Сохранения Информации [page](Второй_мозг.pdf#page=76&selection=22,0,23,46)",
					"level": 3,
					"position": {
						"start": {
							"line": 366,
							"col": 0,
							"offset": 37575
						},
						"end": {
							"line": 366,
							"col": 128,
							"offset": 37703
						}
					}
				},
				{
					"heading": "Удивительные Преимущества Записывания Наших Мыслей [page](Второй_мозг.pdf#page=80&selection=49,0,50,24)",
					"level": 3,
					"position": {
						"start": {
							"line": 377,
							"col": 0,
							"offset": 40317
						},
						"end": {
							"line": 377,
							"col": 107,
							"offset": 40424
						}
					}
				},
				{
					"heading": "Ваша Очередь: Как Бы Это Выглядело, Если Бы Было Просто? [page](Второй_мозг.pdf#page=82&selection=38,0,39,20)",
					"level": 3,
					"position": {
						"start": {
							"line": 395,
							"col": 0,
							"offset": 42514
						},
						"end": {
							"line": 395,
							"col": 113,
							"offset": 42627
						}
					}
				},
				{
					"heading": "ГЛАВА 5 Шаг 2. Организация Данных Для Применения На Практике [page](Второй_мозг.pdf#page=85&selection=0,2,5,26)",
					"level": 2,
					"position": {
						"start": {
							"line": 403,
							"col": 0,
							"offset": 43302
						},
						"end": {
							"line": 403,
							"col": 114,
							"offset": 43416
						}
					}
				},
				{
					"heading": "Эффект Собора: Проектируем Пространство Для Своих Идей [page](Второй_мозг.pdf#page=88&selection=36,0,37,39)",
					"level": 3,
					"position": {
						"start": {
							"line": 421,
							"col": 0,
							"offset": 45904
						},
						"end": {
							"line": 421,
							"col": 111,
							"offset": 46015
						}
					}
				},
				{
					"heading": "В Какой Ступор Впадают 99 % Людей, Ведущих Заметки, И Как Этого Избежать [page](Второй_мозг.pdf#page=90&selection=7,0,8,37)",
					"level": 3,
					"position": {
						"start": {
							"line": 435,
							"col": 0,
							"offset": 47534
						},
						"end": {
							"line": 435,
							"col": 127,
							"offset": 47661
						}
					}
				},
				{
					"heading": "Итог",
					"level": 4,
					"position": {
						"start": {
							"line": 443,
							"col": 0,
							"offset": 48368
						},
						"end": {
							"line": 443,
							"col": 9,
							"offset": 48377
						}
					}
				},
				{
					"heading": "Система [PARA](PARA.md): Готовим Разум (и заметки) К Действию [page](Второй_мозг.pdf#page=94&selection=10,0,11,36)",
					"level": 3,
					"position": {
						"start": {
							"line": 447,
							"col": 0,
							"offset": 48588
						},
						"end": {
							"line": 447,
							"col": 118,
							"offset": 48706
						}
					}
				},
				{
					"heading": "Проекты: Над Чем Я Работаю Прямо Сейчас [page](Второй_мозг.pdf#page=95&selection=2,0,2,39)",
					"level": 3,
					"position": {
						"start": {
							"line": 458,
							"col": 0,
							"offset": 49348
						},
						"end": {
							"line": 458,
							"col": 94,
							"offset": 49442
						}
					}
				},
				{
					"heading": "Сферы Жизни: Долгосрочные Интересы [page](Второй_мозг.pdf#page=96&selection=19,0,19,34)",
					"level": 3,
					"position": {
						"start": {
							"line": 465,
							"col": 0,
							"offset": 50177
						},
						"end": {
							"line": 465,
							"col": 91,
							"offset": 50268
						}
					}
				},
				{
					"heading": "Ресурсы: Что Пригодится В Будущем [page](Второй_мозг.pdf#page=99&selection=2,0,2,33) [01.Entities/PARA \\> Ресурсы](PARA.md#Ресурсы)",
					"level": 3,
					"position": {
						"start": {
							"line": 471,
							"col": 0,
							"offset": 50931
						},
						"end": {
							"line": 471,
							"col": 135,
							"offset": 51066
						}
					}
				},
				{
					"heading": "Архивы: Завершенное Или Отложенное [page](Второй_мозг.pdf#page=99&selection=46,0,46,34)",
					"level": 3,
					"position": {
						"start": {
							"line": 477,
							"col": 0,
							"offset": 51515
						},
						"end": {
							"line": 477,
							"col": 91,
							"offset": 51606
						}
					}
				},
				{
					"heading": "Определяемся, Куда Сохранять Отдельные Заметки [page](Второй_мозг.pdf#page=107&selection=62,0,63,17&color=yellow)",
					"level": 3,
					"position": {
						"start": {
							"line": 488,
							"col": 0,
							"offset": 52440
						},
						"end": {
							"line": 488,
							"col": 117,
							"offset": 52557
						}
					}
				},
				{
					"heading": "Организация Информации Подобна Кухне — Что Я Готовлю? [page](Второй_мозг.pdf#page=110&selection=2,0,3,14&color=yellow)",
					"level": 3,
					"position": {
						"start": {
							"line": 500,
							"col": 0,
							"offset": 54184
						},
						"end": {
							"line": 500,
							"col": 122,
							"offset": 54306
						}
					}
				},
				{
					"heading": "Завершенные Проекты — Кислород Для Вашего «второго мозга» [page](Второй_мозг.pdf#page=112&selection=5,0,6,26&color=yellow)",
					"level": 3,
					"position": {
						"start": {
							"line": 504,
							"col": 0,
							"offset": 54610
						},
						"end": {
							"line": 504,
							"col": 126,
							"offset": 54736
						}
					}
				},
				{
					"heading": "Ваша Очередь: Двигайтесь Быстро, Но Маленькими Шажками [page](Второй_мозг.pdf#page=115&selection=6,0,7,21&color=yellow)",
					"level": 3,
					"position": {
						"start": {
							"line": 514,
							"col": 0,
							"offset": 56321
						},
						"end": {
							"line": 514,
							"col": 123,
							"offset": 56444
						}
					}
				},
				{
					"heading": "ГЛАВА 6 Шаг 3. Извлекаем Суть [page](Второй_мозг.pdf#page=118&selection=2,0,10,7&color=yellow)",
					"level": 2,
					"position": {
						"start": {
							"line": 533,
							"col": 0,
							"offset": 59109
						},
						"end": {
							"line": 533,
							"col": 97,
							"offset": 59206
						}
					}
				},
				{
					"heading": "Квантовое Ведение Заметок: Как Создать Заметки В Неясное Будущее [page](Второй_мозг.pdf#page=122&selection=2,0,3,37&color=yellow)",
					"level": 1,
					"position": {
						"start": {
							"line": 540,
							"col": 0,
							"offset": 59457
						},
						"end": {
							"line": 540,
							"col": 131,
							"offset": 59588
						}
					}
				},
				{
					"heading": "Легкость Поиска — Недостающее Звено В Полезности Заметок [page](Второй_мозг.pdf#page=123&selection=27,0,28,20)",
					"level": 1,
					"position": {
						"start": {
							"line": 546,
							"col": 0,
							"offset": 60005
						},
						"end": {
							"line": 546,
							"col": 112,
							"offset": 60117
						}
					}
				},
				{
					"heading": "Выделение Текста 2.0: Техника Прогрессивного Обобщения [page](Второй_мозг.pdf#page=125&selection=40,0,41,32)",
					"level": 2,
					"position": {
						"start": {
							"line": 554,
							"col": 0,
							"offset": 60954
						},
						"end": {
							"line": 554,
							"col": 111,
							"offset": 61065
						}
					}
				},
				{
					"heading": "Масштабы Вашей Карты Знаний [page](Второй_мозг.pdf#page=133&selection=2,0,2,27)",
					"level": 1,
					"position": {
						"start": {
							"line": 571,
							"col": 0,
							"offset": 63896
						},
						"end": {
							"line": 571,
							"col": 81,
							"offset": 63977
						}
					}
				},
				{
					"heading": "Четыре Примера Прогрессивного Обобщения [page](Второй_мозг.pdf#page=134&selection=32,0,32,39)",
					"level": 1,
					"position": {
						"start": {
							"line": 577,
							"col": 0,
							"offset": 64723
						},
						"end": {
							"line": 577,
							"col": 95,
							"offset": 64818
						}
					}
				},
				{
					"heading": "Статьи Из Википедии [page](Второй_мозг.pdf#page=135&selection=20,0,20,19)",
					"level": 1,
					"position": {
						"start": {
							"line": 579,
							"col": 0,
							"offset": 64820
						},
						"end": {
							"line": 579,
							"col": 75,
							"offset": 64895
						}
					}
				},
				{
					"heading": "Онлайн-статьи [page](Второй_мозг.pdf#page=136&selection=31,0,31,13)",
					"level": 1,
					"position": {
						"start": {
							"line": 583,
							"col": 0,
							"offset": 65143
						},
						"end": {
							"line": 583,
							"col": 69,
							"offset": 65212
						}
					}
				},
				{
					"heading": "Подкасты И Аудиофайлы [page](Второй_мозг.pdf#page=138&selection=5,0,5,21)",
					"level": 1,
					"position": {
						"start": {
							"line": 587,
							"col": 0,
							"offset": 65576
						},
						"end": {
							"line": 587,
							"col": 75,
							"offset": 65651
						}
					}
				},
				{
					"heading": "Заметки Со Встреч [page](Второй_мозг.pdf#page=139&selection=50,0,50,17)",
					"level": 1,
					"position": {
						"start": {
							"line": 589,
							"col": 0,
							"offset": 65653
						},
						"end": {
							"line": 589,
							"col": 73,
							"offset": 65726
						}
					}
				},
				{
					"heading": "Секрет Пикассо: Хорошее — Не Враг Великого [page](Второй_мозг.pdf#page=142&selection=70,0,71,26)",
					"level": 1,
					"position": {
						"start": {
							"line": 593,
							"col": 0,
							"offset": 65901
						},
						"end": {
							"line": 593,
							"col": 98,
							"offset": 65999
						}
					}
				},
				{
					"heading": "Самые Распространенные Ошибки Новичков В Ведении Заметок [page](Второй_мозг.pdf#page=145&selection=36,0,37,17)",
					"level": 1,
					"position": {
						"start": {
							"line": 603,
							"col": 0,
							"offset": 66756
						},
						"end": {
							"line": 603,
							"col": 112,
							"offset": 66868
						}
					}
				},
				{
					"heading": "Ошибка № 1: Слишком Много Текста [page](Второй_мозг.pdf#page=146&selection=2,0,2,32)",
					"level": 1,
					"position": {
						"start": {
							"line": 605,
							"col": 0,
							"offset": 66870
						},
						"end": {
							"line": 605,
							"col": 86,
							"offset": 66956
						}
					}
				},
				{
					"heading": "Ошибка № 2: Выделять Текст Бесцельно [page](Второй_мозг.pdf#page=147&selection=2,0,2,36)",
					"level": 1,
					"position": {
						"start": {
							"line": 615,
							"col": 0,
							"offset": 68171
						},
						"end": {
							"line": 615,
							"col": 90,
							"offset": 68261
						}
					}
				},
				{
					"heading": "Ошибка № 3: Усложнять [page](Второй_мозг.pdf#page=148&selection=13,0,13,21)",
					"level": 1,
					"position": {
						"start": {
							"line": 629,
							"col": 0,
							"offset": 70367
						},
						"end": {
							"line": 629,
							"col": 77,
							"offset": 70444
						}
					}
				},
				{
					"heading": "Ваша Очередь: Помните О Себе В Будущем [page](Второй_мозг.pdf#page=149&selection=30,0,30,38)",
					"level": 1,
					"position": {
						"start": {
							"line": 637,
							"col": 0,
							"offset": 71097
						},
						"end": {
							"line": 637,
							"col": 94,
							"offset": 71191
						}
					}
				},
				{
					"heading": "ГЛАВА 7. Шаг 4. Демонстрируем Свою Работу [page](Второй_мозг.pdf#page=152&selection=2,0,11,19)",
					"level": 1,
					"position": {
						"start": {
							"line": 643,
							"col": 0,
							"offset": 71597
						},
						"end": {
							"line": 643,
							"col": 96,
							"offset": 71693
						}
					}
				},
				{
					"heading": "Как Защитить Свой Самый Ценный Ресурс [page](Второй_мозг.pdf#page=157&selection=9,0,9,37)",
					"level": 1,
					"position": {
						"start": {
							"line": 648,
							"col": 0,
							"offset": 71804
						},
						"end": {
							"line": 648,
							"col": 91,
							"offset": 71895
						}
					}
				},
				{
					"heading": "Промежуточные Пакеты: Маленькие Шаги Большой Цели [page](Второй_мозг.pdf#page=158&selection=49,0,50,27)",
					"level": 1,
					"position": {
						"start": {
							"line": 656,
							"col": 0,
							"offset": 72561
						},
						"end": {
							"line": 656,
							"col": 105,
							"offset": 72666
						}
					}
				},
				{
					"heading": "Создание Структурных Элементов: Секрет Бесперебойных Результатов [page](Второй_мозг.pdf#page=163&selection=15,0,16,32)",
					"level": 1,
					"position": {
						"start": {
							"line": 684,
							"col": 0,
							"offset": 76141
						},
						"end": {
							"line": 684,
							"col": 120,
							"offset": 76261
						}
					}
				},
				{
					"heading": "Повторение — Мать Учения: Старая Работа Снова Может Пригодиться [page](Второй_мозг.pdf#page=166&selection=12,0,13,37)",
					"level": 1,
					"position": {
						"start": {
							"line": 702,
							"col": 0,
							"offset": 77805
						},
						"end": {
							"line": 702,
							"col": 119,
							"offset": 77924
						}
					}
				},
				{
					"heading": "Метод Извлечения № 1: Поиск [page](Второй_мозг.pdf#page=167&selection=16,0,16,27)",
					"level": 1,
					"position": {
						"start": {
							"line": 709,
							"col": 0,
							"offset": 78319
						},
						"end": {
							"line": 709,
							"col": 83,
							"offset": 78402
						}
					}
				},
				{
					"heading": "ГЛАВА 8 Искусство Творческого Исполнения [p.183](Второй_мозг.pdf#page=183&selection=2,0,5,22&color=h2)",
					"level": 2,
					"position": {
						"start": {
							"line": 770,
							"col": 0,
							"offset": 84434
						},
						"end": {
							"line": 770,
							"col": 105,
							"offset": 84539
						}
					}
				},
				{
					"heading": "Дивергенция И Конвергенция: Творческий Баланс [p.186](Второй_мозг.pdf#page=186&selection=20,0,20,45&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 780,
							"col": 0,
							"offset": 85625
						},
						"end": {
							"line": 780,
							"col": 113,
							"offset": 85738
						}
					}
				},
				{
					"heading": "Три Стратегии По Преодолению Сложностей В Творческой Работе [p.189](Второй_мозг.pdf#page=189&selection=10,0,11,19&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 808,
							"col": 0,
							"offset": 87424
						},
						"end": {
							"line": 808,
							"col": 127,
							"offset": 87551
						}
					}
				},
				{
					"heading": "1. Архипелаг Идей: Стелим Соломку [[2402630666_00009_Форте_Т_Создай_свой«второй_мозг»!_Популярная_психология_для_бизнеса.pdf#page=190&selection=32,0,32,33&color=h3|p.19[p.190](Второй_мозг.pdf#page=190)[p.190](Второй_мозг.pdf#page=190)[p.194](Второй_мозг.pdf#page=194)[p.195](Второй_мозг.pdf#page=195)0]]",
					"level": 3,
					"position": {
						"start": {
							"line": 820,
							"col": 0,
							"offset": 88843
						},
						"end": {
							"line": 820,
							"col": 307,
							"offset": 89150
						}
					}
				},
				{
					"heading": "Привычка Делать Обзоры: Почему Заметки Следует Анализировать Пакетно (и Как часто) [p.222](Второй_мозг.pdf#page=222&selection=22,0,24,13&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 956,
							"col": 0,
							"offset": 103838
						},
						"end": {
							"line": 956,
							"col": 150,
							"offset": 103988
						}
					}
				},
				{
					"heading": "Шаблон Ежемесячного Обзора: Достигаем Ясности И Контроля [p.226](Второй_мозг.pdf#page=226&selection=2,0,3,28&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 971,
							"col": 0,
							"offset": 105098
						},
						"end": {
							"line": 971,
							"col": 122,
							"offset": 105220
						}
					}
				},
				{
					"heading": "Ваша Очередь: Идеальная Система, Которой Вы Не Пользуетесь, Не Идеальна [p.231](Второй_мозг.pdf#page=231&selection=17,0,18,38&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1004,
							"col": 0,
							"offset": 107639
						},
						"end": {
							"line": 1004,
							"col": 139,
							"offset": 107778
						}
					}
				},
				{
					"heading": "ГЛАВА 10 Путь К Самореализации [p.233](Второй_мозг.pdf#page=233&selection=2,0,4,21&color=h2)",
					"level": 2,
					"position": {
						"start": {
							"line": 1021,
							"col": 0,
							"offset": 109516
						},
						"end": {
							"line": 1021,
							"col": 95,
							"offset": 109611
						}
					}
				},
				{
					"heading": "Образ Мышления Важнее Инструментов: В Поисках Идеального Приложения [p.234](Второй_мозг.pdf#page=234&selection=15,0,16,31&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1027,
							"col": 0,
							"offset": 110266
						},
						"end": {
							"line": 1027,
							"col": 135,
							"offset": 110401
						}
					}
				},
				{
					"heading": "Страх: Нашего Ума Может Быть Недостаточно [p.235](Второй_мозг.pdf#page=235&selection=50,0,50,41&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1031,
							"col": 0,
							"offset": 110591
						},
						"end": {
							"line": 1031,
							"col": 109,
							"offset": 110700
						}
					}
				},
				{
					"heading": "Ищем Новую Работу Первому Мозгу [p.237](Второй_мозг.pdf#page=237&selection=41,0,41,31&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1035,
							"col": 0,
							"offset": 111035
						},
						"end": {
							"line": 1035,
							"col": 99,
							"offset": 111134
						}
					}
				},
				{
					"heading": "От Дефицита К Изобилию [p.239](Второй_мозг.pdf#page=239&selection=16,0,16,22&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1037,
							"col": 0,
							"offset": 111137
						},
						"end": {
							"line": 1037,
							"col": 90,
							"offset": 111227
						}
					}
				},
				{
					"heading": "От Обязательства К Службе [p.241](Второй_мозг.pdf#page=241&selection=9,0,9,25&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1041,
							"col": 0,
							"offset": 111683
						},
						"end": {
							"line": 1041,
							"col": 91,
							"offset": 111774
						}
					}
				},
				{
					"heading": "От Потребления К Созиданию [p.243](Второй_мозг.pdf#page=243&selection=5,0,5,26&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1043,
							"col": 0,
							"offset": 111777
						},
						"end": {
							"line": 1043,
							"col": 92,
							"offset": 111869
						}
					}
				},
				{
					"heading": "251 Наша Фундаментальная Потребность — Самовыражение [p.245](Второй_мозг.pdf#page=245&selection=0,3,3,13&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1047,
							"col": 0,
							"offset": 112201
						},
						"end": {
							"line": 1047,
							"col": 118,
							"offset": 112319
						}
					}
				},
				{
					"heading": "Ваша Очередь: Не Бойтесь Делиться [p.246](Второй_мозг.pdf#page=246&selection=24,0,24,33&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1049,
							"col": 0,
							"offset": 112322
						},
						"end": {
							"line": 1049,
							"col": 101,
							"offset": 112423
						}
					}
				},
				{
					"heading": "Напоследок: У Вас Все Получится [p.247](Второй_мозг.pdf#page=247&selection=30,0,30,31&color=h3)",
					"level": 3,
					"position": {
						"start": {
							"line": 1051,
							"col": 0,
							"offset": 112426
						},
						"end": {
							"line": 1051,
							"col": 99,
							"offset": 112525
						}
					}
				},
				{
					"heading": "БОНУС Как Создать Рабочую Систему Тегов [p.253](Второй_мозг.pdf#page=253&selection=2,0,5,13&color=h2)",
					"level": 2,
					"position": {
						"start": {
							"line": 1066,
							"col": 0,
							"offset": 117777
						},
						"end": {
							"line": 1066,
							"col": 104,
							"offset": 117881
						}
					}
				},
				{
					"heading": "Благодарности [p.255](Второй_мозг.pdf#page=255&selection=2,0,2,13&color=h2)",
					"level": 2,
					"position": {
						"start": {
							"line": 1070,
							"col": 0,
							"offset": 118015
						},
						"end": {
							"line": 1070,
							"col": 78,
							"offset": 118093
						}
					}
				},
				{
					"heading": "Дополнительные Ресурсы И Инструкции [p.259](Второй_мозг.pdf#page=259&selection=2,0,3,12&color=h2)",
					"level": 2,
					"position": {
						"start": {
							"line": 1072,
							"col": 0,
							"offset": 118096
						},
						"end": {
							"line": 1072,
							"col": 100,
							"offset": 118196
						}
					}
				},
				{
					"heading": "Источники И Ссылки [p.260](Второй_мозг.pdf#page=260&selection=2,0,2,18)",
					"level": 2,
					"position": {
						"start": {
							"line": 1074,
							"col": 0,
							"offset": 118199
						},
						"end": {
							"line": 1074,
							"col": 74,
							"offset": 118273
						}
					}
				}
			],
			"sections": [
				{
					"type": "yaml",
					"position": {
						"start": {
							"line": 0,
							"col": 0,
							"offset": 0
						},
						"end": {
							"line": 25,
							"col": 3,
							"offset": 2086
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 27,
							"col": 0,
							"offset": 2088
						},
						"end": {
							"line": 27,
							"col": 46,
							"offset": 2134
						}
					}
				},
				{
					"type": "list",
					"position": {
						"start": {
							"line": 28,
							"col": 0,
							"offset": 2135
						},
						"end": {
							"line": 29,
							"col": 8,
							"offset": 2168
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 31,
							"col": 0,
							"offset": 2170
						},
						"end": {
							"line": 31,
							"col": 98,
							"offset": 2268
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 33,
							"col": 0,
							"offset": 2270
						},
						"end": {
							"line": 33,
							"col": 19,
							"offset": 2289
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 35,
							"col": 0,
							"offset": 2291
						},
						"end": {
							"line": 35,
							"col": 12,
							"offset": 2303
						}
					}
				},
				{
					"type": "code",
					"position": {
						"start": {
							"line": 36,
							"col": 0,
							"offset": 2304
						},
						"end": {
							"line": 36,
							"col": 6,
							"offset": 2310
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 38,
							"col": 0,
							"offset": 2312
						},
						"end": {
							"line": 38,
							"col": 11,
							"offset": 2323
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 39,
							"col": 0,
							"offset": 2324
						},
						"end": {
							"line": 39,
							"col": 3,
							"offset": 2327
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 41,
							"col": 0,
							"offset": 2329
						},
						"end": {
							"line": 41,
							"col": 16,
							"offset": 2345
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 42,
							"col": 0,
							"offset": 2346
						},
						"end": {
							"line": 42,
							"col": 3,
							"offset": 2349
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 44,
							"col": 0,
							"offset": 2351
						},
						"end": {
							"line": 44,
							"col": 10,
							"offset": 2361
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 46,
							"col": 0,
							"offset": 2363
						},
						"end": {
							"line": 47,
							"col": 16,
							"offset": 2467
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 49,
							"col": 0,
							"offset": 2469
						},
						"end": {
							"line": 49,
							"col": 6,
							"offset": 2475
						}
					}
				},
				{
					"type": "list",
					"position": {
						"start": {
							"line": 50,
							"col": 0,
							"offset": 2476
						},
						"end": {
							"line": 51,
							"col": 69,
							"offset": 2644
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 52,
							"col": 0,
							"offset": 2645
						},
						"end": {
							"line": 52,
							"col": 17,
							"offset": 2662
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 54,
							"col": 0,
							"offset": 2664
						},
						"end": {
							"line": 54,
							"col": 169,
							"offset": 2833
						}
					}
				},
				{
					"type": "list",
					"position": {
						"start": {
							"line": 55,
							"col": 0,
							"offset": 2834
						},
						"end": {
							"line": 58,
							"col": 136,
							"offset": 3350
						}
					}
				},
				{
					"type": "thematicBreak",
					"position": {
						"start": {
							"line": 59,
							"col": 0,
							"offset": 3351
						},
						"end": {
							"line": 59,
							"col": 3,
							"offset": 3354
						}
					}
				},
				{
					"type": "thematicBreak",
					"position": {
						"start": {
							"line": 61,
							"col": 0,
							"offset": 3356
						},
						"end": {
							"line": 61,
							"col": 3,
							"offset": 3359
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 62,
							"col": 0,
							"offset": 3360
						},
						"end": {
							"line": 62,
							"col": 97,
							"offset": 3457
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 64,
							"col": 0,
							"offset": 3459
						},
						"end": {
							"line": 64,
							"col": 137,
							"offset": 3596
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 66,
							"col": 0,
							"offset": 3598
						},
						"end": {
							"line": 68,
							"col": 2,
							"offset": 4324
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 69,
							"col": 0,
							"offset": 4325
						},
						"end": {
							"line": 69,
							"col": 100,
							"offset": 4425
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 71,
							"col": 0,
							"offset": 4427
						},
						"end": {
							"line": 71,
							"col": 95,
							"offset": 4522
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 73,
							"col": 0,
							"offset": 4524
						},
						"end": {
							"line": 73,
							"col": 261,
							"offset": 4785
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 75,
							"col": 0,
							"offset": 4787
						},
						"end": {
							"line": 75,
							"col": 187,
							"offset": 4974
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 77,
							"col": 0,
							"offset": 4976
						},
						"end": {
							"line": 77,
							"col": 129,
							"offset": 5105
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 79,
							"col": 0,
							"offset": 5107
						},
						"end": {
							"line": 80,
							"col": 113,
							"offset": 5301
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 82,
							"col": 0,
							"offset": 5303
						},
						"end": {
							"line": 82,
							"col": 100,
							"offset": 5403
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 84,
							"col": 0,
							"offset": 5405
						},
						"end": {
							"line": 85,
							"col": 223,
							"offset": 5967
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 87,
							"col": 0,
							"offset": 5969
						},
						"end": {
							"line": 87,
							"col": 221,
							"offset": 6190
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 89,
							"col": 0,
							"offset": 6192
						},
						"end": {
							"line": 89,
							"col": 367,
							"offset": 6559
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 91,
							"col": 0,
							"offset": 6561
						},
						"end": {
							"line": 91,
							"col": 322,
							"offset": 6883
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 93,
							"col": 0,
							"offset": 6885
						},
						"end": {
							"line": 93,
							"col": 259,
							"offset": 7144
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 95,
							"col": 0,
							"offset": 7146
						},
						"end": {
							"line": 95,
							"col": 294,
							"offset": 7440
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 97,
							"col": 0,
							"offset": 7442
						},
						"end": {
							"line": 102,
							"col": 185,
							"offset": 8113
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 104,
							"col": 0,
							"offset": 8115
						},
						"end": {
							"line": 104,
							"col": 282,
							"offset": 8397
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 106,
							"col": 0,
							"offset": 8399
						},
						"end": {
							"line": 106,
							"col": 711,
							"offset": 9110
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 108,
							"col": 0,
							"offset": 9112
						},
						"end": {
							"line": 108,
							"col": 249,
							"offset": 9361
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 110,
							"col": 0,
							"offset": 9363
						},
						"end": {
							"line": 110,
							"col": 203,
							"offset": 9566
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 112,
							"col": 0,
							"offset": 9568
						},
						"end": {
							"line": 112,
							"col": 198,
							"offset": 9766
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 114,
							"col": 0,
							"offset": 9768
						},
						"end": {
							"line": 114,
							"col": 86,
							"offset": 9854
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 116,
							"col": 0,
							"offset": 9856
						},
						"end": {
							"line": 116,
							"col": 169,
							"offset": 10025
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 118,
							"col": 0,
							"offset": 10027
						},
						"end": {
							"line": 118,
							"col": 103,
							"offset": 10130
						}
					}
				},
				{
					"type": "callout",
					"position": {
						"start": {
							"line": 120,
							"col": 0,
							"offset": 10132
						},
						"end": {
							"line": 121,
							"col": 54,
							"offset": 10294
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 123,
							"col": 0,
							"offset": 10296
						},
						"end": {
							"line": 123,
							"col": 89,
							"offset": 10385
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 125,
							"col": 0,
							"offset": 10387
						},
						"end": {
							"line": 129,
							"col": 113,
							"offset": 10743
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 131,
							"col": 0,
							"offset": 10745
						},
						"end": {
							"line": 131,
							"col": 126,
							"offset": 10871
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 133,
							"col": 0,
							"offset": 10873
						},
						"end": {
							"line": 133,
							"col": 266,
							"offset": 11139
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 135,
							"col": 0,
							"offset": 11141
						},
						"end": {
							"line": 135,
							"col": 327,
							"offset": 11468
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 137,
							"col": 0,
							"offset": 11470
						},
						"end": {
							"line": 137,
							"col": 140,
							"offset": 11610
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 139,
							"col": 0,
							"offset": 11612
						},
						"end": {
							"line": 139,
							"col": 179,
							"offset": 11791
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 143,
							"col": 0,
							"offset": 12283
						},
						"end": {
							"line": 143,
							"col": 143,
							"offset": 12426
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 145,
							"col": 0,
							"offset": 12428
						},
						"end": {
							"line": 145,
							"col": 285,
							"offset": 12713
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 147,
							"col": 0,
							"offset": 12715
						},
						"end": {
							"line": 147,
							"col": 327,
							"offset": 13042
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 149,
							"col": 0,
							"offset": 13044
						},
						"end": {
							"line": 149,
							"col": 140,
							"offset": 13184
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 151,
							"col": 0,
							"offset": 13186
						},
						"end": {
							"line": 151,
							"col": 189,
							"offset": 13375
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 153,
							"col": 0,
							"offset": 13377
						},
						"end": {
							"line": 153,
							"col": 245,
							"offset": 13622
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 155,
							"col": 0,
							"offset": 13624
						},
						"end": {
							"line": 155,
							"col": 136,
							"offset": 13760
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 157,
							"col": 0,
							"offset": 13762
						},
						"end": {
							"line": 161,
							"col": 350,
							"offset": 15313
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 163,
							"col": 0,
							"offset": 15315
						},
						"end": {
							"line": 163,
							"col": 86,
							"offset": 15401
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 165,
							"col": 0,
							"offset": 15403
						},
						"end": {
							"line": 167,
							"col": 408,
							"offset": 16121
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 169,
							"col": 0,
							"offset": 16123
						},
						"end": {
							"line": 169,
							"col": 126,
							"offset": 16249
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 171,
							"col": 0,
							"offset": 16251
						},
						"end": {
							"line": 171,
							"col": 209,
							"offset": 16460
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 173,
							"col": 0,
							"offset": 16462
						},
						"end": {
							"line": 173,
							"col": 297,
							"offset": 16759
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 175,
							"col": 0,
							"offset": 16761
						},
						"end": {
							"line": 175,
							"col": 202,
							"offset": 16963
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 177,
							"col": 0,
							"offset": 16965
						},
						"end": {
							"line": 177,
							"col": 109,
							"offset": 17074
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 179,
							"col": 0,
							"offset": 17076
						},
						"end": {
							"line": 179,
							"col": 429,
							"offset": 17505
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 181,
							"col": 0,
							"offset": 17507
						},
						"end": {
							"line": 181,
							"col": 113,
							"offset": 17620
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 183,
							"col": 0,
							"offset": 17622
						},
						"end": {
							"line": 184,
							"col": 72,
							"offset": 18026
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 186,
							"col": 0,
							"offset": 18028
						},
						"end": {
							"line": 186,
							"col": 127,
							"offset": 18155
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 188,
							"col": 0,
							"offset": 18157
						},
						"end": {
							"line": 188,
							"col": 334,
							"offset": 18491
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 190,
							"col": 0,
							"offset": 18493
						},
						"end": {
							"line": 190,
							"col": 207,
							"offset": 18700
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 192,
							"col": 0,
							"offset": 18702
						},
						"end": {
							"line": 192,
							"col": 233,
							"offset": 18935
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 194,
							"col": 0,
							"offset": 18937
						},
						"end": {
							"line": 194,
							"col": 431,
							"offset": 19368
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 196,
							"col": 0,
							"offset": 19370
						},
						"end": {
							"line": 196,
							"col": 135,
							"offset": 19505
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 198,
							"col": 0,
							"offset": 19507
						},
						"end": {
							"line": 198,
							"col": 115,
							"offset": 19622
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 200,
							"col": 0,
							"offset": 19624
						},
						"end": {
							"line": 200,
							"col": 209,
							"offset": 19833
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 202,
							"col": 0,
							"offset": 19835
						},
						"end": {
							"line": 202,
							"col": 203,
							"offset": 20038
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 204,
							"col": 0,
							"offset": 20040
						},
						"end": {
							"line": 204,
							"col": 64,
							"offset": 20104
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 206,
							"col": 0,
							"offset": 20106
						},
						"end": {
							"line": 206,
							"col": 88,
							"offset": 20194
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 207,
							"col": 0,
							"offset": 20195
						},
						"end": {
							"line": 207,
							"col": 27,
							"offset": 20222
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 209,
							"col": 0,
							"offset": 20224
						},
						"end": {
							"line": 209,
							"col": 162,
							"offset": 20386
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 211,
							"col": 0,
							"offset": 20388
						},
						"end": {
							"line": 211,
							"col": 297,
							"offset": 20685
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 213,
							"col": 0,
							"offset": 20687
						},
						"end": {
							"line": 213,
							"col": 350,
							"offset": 21037
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 215,
							"col": 0,
							"offset": 21039
						},
						"end": {
							"line": 215,
							"col": 375,
							"offset": 21414
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 217,
							"col": 0,
							"offset": 21416
						},
						"end": {
							"line": 218,
							"col": 114,
							"offset": 21657
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 220,
							"col": 0,
							"offset": 21659
						},
						"end": {
							"line": 220,
							"col": 107,
							"offset": 21766
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 222,
							"col": 0,
							"offset": 21768
						},
						"end": {
							"line": 222,
							"col": 337,
							"offset": 22105
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 224,
							"col": 0,
							"offset": 22107
						},
						"end": {
							"line": 224,
							"col": 345,
							"offset": 22452
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 226,
							"col": 0,
							"offset": 22454
						},
						"end": {
							"line": 226,
							"col": 182,
							"offset": 22636
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 228,
							"col": 0,
							"offset": 22638
						},
						"end": {
							"line": 228,
							"col": 139,
							"offset": 22777
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 230,
							"col": 0,
							"offset": 22779
						},
						"end": {
							"line": 230,
							"col": 143,
							"offset": 22922
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 232,
							"col": 0,
							"offset": 22924
						},
						"end": {
							"line": 232,
							"col": 86,
							"offset": 23010
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 234,
							"col": 0,
							"offset": 23012
						},
						"end": {
							"line": 234,
							"col": 106,
							"offset": 23118
						}
					}
				},
				{
					"type": "callout",
					"position": {
						"start": {
							"line": 236,
							"col": 0,
							"offset": 23120
						},
						"end": {
							"line": 237,
							"col": 66,
							"offset": 23237
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 239,
							"col": 0,
							"offset": 23239
						},
						"end": {
							"line": 239,
							"col": 220,
							"offset": 23459
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 241,
							"col": 0,
							"offset": 23461
						},
						"end": {
							"line": 241,
							"col": 315,
							"offset": 23776
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 243,
							"col": 0,
							"offset": 23778
						},
						"end": {
							"line": 243,
							"col": 89,
							"offset": 23867
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 245,
							"col": 0,
							"offset": 23869
						},
						"end": {
							"line": 245,
							"col": 336,
							"offset": 24205
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 247,
							"col": 0,
							"offset": 24207
						},
						"end": {
							"line": 247,
							"col": 266,
							"offset": 24473
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 249,
							"col": 0,
							"offset": 24475
						},
						"end": {
							"line": 249,
							"col": 424,
							"offset": 24899
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 251,
							"col": 0,
							"offset": 24901
						},
						"end": {
							"line": 251,
							"col": 102,
							"offset": 25003
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 253,
							"col": 0,
							"offset": 25005
						},
						"end": {
							"line": 253,
							"col": 127,
							"offset": 25132
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 257,
							"col": 0,
							"offset": 25309
						},
						"end": {
							"line": 257,
							"col": 554,
							"offset": 25863
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 259,
							"col": 0,
							"offset": 25865
						},
						"end": {
							"line": 259,
							"col": 67,
							"offset": 25932
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 261,
							"col": 0,
							"offset": 25934
						},
						"end": {
							"line": 261,
							"col": 371,
							"offset": 26305
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 263,
							"col": 0,
							"offset": 26307
						},
						"end": {
							"line": 269,
							"col": 161,
							"offset": 27055
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 271,
							"col": 0,
							"offset": 27057
						},
						"end": {
							"line": 276,
							"col": 145,
							"offset": 27659
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 278,
							"col": 0,
							"offset": 27661
						},
						"end": {
							"line": 278,
							"col": 78,
							"offset": 27739
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 280,
							"col": 0,
							"offset": 27741
						},
						"end": {
							"line": 285,
							"col": 190,
							"offset": 29248
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 287,
							"col": 0,
							"offset": 29250
						},
						"end": {
							"line": 287,
							"col": 138,
							"offset": 29388
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 288,
							"col": 0,
							"offset": 29389
						},
						"end": {
							"line": 288,
							"col": 48,
							"offset": 29437
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 290,
							"col": 0,
							"offset": 29439
						},
						"end": {
							"line": 290,
							"col": 138,
							"offset": 29577
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 292,
							"col": 0,
							"offset": 29579
						},
						"end": {
							"line": 292,
							"col": 442,
							"offset": 30021
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 294,
							"col": 0,
							"offset": 30023
						},
						"end": {
							"line": 294,
							"col": 233,
							"offset": 30256
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 296,
							"col": 0,
							"offset": 30258
						},
						"end": {
							"line": 296,
							"col": 204,
							"offset": 30462
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 298,
							"col": 0,
							"offset": 30464
						},
						"end": {
							"line": 298,
							"col": 140,
							"offset": 30604
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 300,
							"col": 0,
							"offset": 30606
						},
						"end": {
							"line": 300,
							"col": 216,
							"offset": 30822
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 302,
							"col": 0,
							"offset": 30824
						},
						"end": {
							"line": 302,
							"col": 188,
							"offset": 31012
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 304,
							"col": 0,
							"offset": 31014
						},
						"end": {
							"line": 304,
							"col": 359,
							"offset": 31373
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 306,
							"col": 0,
							"offset": 31375
						},
						"end": {
							"line": 306,
							"col": 246,
							"offset": 31621
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 308,
							"col": 0,
							"offset": 31623
						},
						"end": {
							"line": 308,
							"col": 110,
							"offset": 31733
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 310,
							"col": 0,
							"offset": 31735
						},
						"end": {
							"line": 310,
							"col": 111,
							"offset": 31846
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 312,
							"col": 0,
							"offset": 31848
						},
						"end": {
							"line": 312,
							"col": 262,
							"offset": 32110
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 314,
							"col": 0,
							"offset": 32112
						},
						"end": {
							"line": 314,
							"col": 297,
							"offset": 32409
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 316,
							"col": 0,
							"offset": 32411
						},
						"end": {
							"line": 316,
							"col": 103,
							"offset": 32514
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 318,
							"col": 0,
							"offset": 32516
						},
						"end": {
							"line": 318,
							"col": 359,
							"offset": 32875
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 320,
							"col": 0,
							"offset": 32877
						},
						"end": {
							"line": 320,
							"col": 104,
							"offset": 32981
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 322,
							"col": 0,
							"offset": 32983
						},
						"end": {
							"line": 322,
							"col": 406,
							"offset": 33389
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 324,
							"col": 0,
							"offset": 33391
						},
						"end": {
							"line": 324,
							"col": 405,
							"offset": 33796
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 326,
							"col": 0,
							"offset": 33798
						},
						"end": {
							"line": 326,
							"col": 114,
							"offset": 33912
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 328,
							"col": 0,
							"offset": 33914
						},
						"end": {
							"line": 328,
							"col": 232,
							"offset": 34146
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 330,
							"col": 0,
							"offset": 34148
						},
						"end": {
							"line": 330,
							"col": 419,
							"offset": 34567
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 332,
							"col": 0,
							"offset": 34569
						},
						"end": {
							"line": 332,
							"col": 144,
							"offset": 34713
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 334,
							"col": 0,
							"offset": 34715
						},
						"end": {
							"line": 334,
							"col": 329,
							"offset": 35044
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 336,
							"col": 0,
							"offset": 35046
						},
						"end": {
							"line": 336,
							"col": 146,
							"offset": 35192
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 337,
							"col": 0,
							"offset": 35193
						},
						"end": {
							"line": 337,
							"col": 98,
							"offset": 35291
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 339,
							"col": 0,
							"offset": 35293
						},
						"end": {
							"line": 339,
							"col": 155,
							"offset": 35448
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 341,
							"col": 0,
							"offset": 35450
						},
						"end": {
							"line": 345,
							"col": 219,
							"offset": 35912
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 347,
							"col": 0,
							"offset": 35914
						},
						"end": {
							"line": 347,
							"col": 288,
							"offset": 36202
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 349,
							"col": 0,
							"offset": 36204
						},
						"end": {
							"line": 349,
							"col": 167,
							"offset": 36371
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 351,
							"col": 0,
							"offset": 36373
						},
						"end": {
							"line": 351,
							"col": 153,
							"offset": 36526
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 353,
							"col": 0,
							"offset": 36528
						},
						"end": {
							"line": 353,
							"col": 166,
							"offset": 36694
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 355,
							"col": 0,
							"offset": 36696
						},
						"end": {
							"line": 355,
							"col": 145,
							"offset": 36841
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 357,
							"col": 0,
							"offset": 36843
						},
						"end": {
							"line": 357,
							"col": 215,
							"offset": 37058
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 359,
							"col": 0,
							"offset": 37060
						},
						"end": {
							"line": 364,
							"col": 347,
							"offset": 37573
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 366,
							"col": 0,
							"offset": 37575
						},
						"end": {
							"line": 366,
							"col": 128,
							"offset": 37703
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 368,
							"col": 0,
							"offset": 37705
						},
						"end": {
							"line": 375,
							"col": 384,
							"offset": 40315
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 377,
							"col": 0,
							"offset": 40317
						},
						"end": {
							"line": 377,
							"col": 107,
							"offset": 40424
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 379,
							"col": 0,
							"offset": 40426
						},
						"end": {
							"line": 379,
							"col": 544,
							"offset": 40970
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 381,
							"col": 0,
							"offset": 40972
						},
						"end": {
							"line": 381,
							"col": 227,
							"offset": 41199
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 383,
							"col": 0,
							"offset": 41201
						},
						"end": {
							"line": 383,
							"col": 213,
							"offset": 41414
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 385,
							"col": 0,
							"offset": 41416
						},
						"end": {
							"line": 385,
							"col": 241,
							"offset": 41657
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 387,
							"col": 0,
							"offset": 41659
						},
						"end": {
							"line": 387,
							"col": 246,
							"offset": 41905
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 389,
							"col": 0,
							"offset": 41907
						},
						"end": {
							"line": 389,
							"col": 332,
							"offset": 42239
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 391,
							"col": 0,
							"offset": 42241
						},
						"end": {
							"line": 391,
							"col": 132,
							"offset": 42373
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 393,
							"col": 0,
							"offset": 42375
						},
						"end": {
							"line": 393,
							"col": 137,
							"offset": 42512
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 397,
							"col": 0,
							"offset": 42629
						},
						"end": {
							"line": 397,
							"col": 180,
							"offset": 42809
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 399,
							"col": 0,
							"offset": 42811
						},
						"end": {
							"line": 399,
							"col": 321,
							"offset": 43132
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 401,
							"col": 0,
							"offset": 43134
						},
						"end": {
							"line": 401,
							"col": 166,
							"offset": 43300
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 403,
							"col": 0,
							"offset": 43302
						},
						"end": {
							"line": 403,
							"col": 114,
							"offset": 43416
						}
					}
				},
				{
					"type": "callout",
					"position": {
						"start": {
							"line": 405,
							"col": 0,
							"offset": 43418
						},
						"end": {
							"line": 406,
							"col": 90,
							"offset": 43624
						}
					}
				},
				{
					"type": "callout",
					"position": {
						"start": {
							"line": 408,
							"col": 0,
							"offset": 43626
						},
						"end": {
							"line": 408,
							"col": 311,
							"offset": 43937
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 410,
							"col": 0,
							"offset": 43939
						},
						"end": {
							"line": 411,
							"col": 369,
							"offset": 44392
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 413,
							"col": 0,
							"offset": 44394
						},
						"end": {
							"line": 413,
							"col": 29,
							"offset": 44423
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 415,
							"col": 0,
							"offset": 44425
						},
						"end": {
							"line": 415,
							"col": 471,
							"offset": 44896
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 417,
							"col": 0,
							"offset": 44898
						},
						"end": {
							"line": 417,
							"col": 329,
							"offset": 45227
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 419,
							"col": 0,
							"offset": 45229
						},
						"end": {
							"line": 419,
							"col": 673,
							"offset": 45902
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 421,
							"col": 0,
							"offset": 45904
						},
						"end": {
							"line": 421,
							"col": 111,
							"offset": 46015
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 423,
							"col": 0,
							"offset": 46017
						},
						"end": {
							"line": 423,
							"col": 177,
							"offset": 46194
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 425,
							"col": 0,
							"offset": 46196
						},
						"end": {
							"line": 425,
							"col": 528,
							"offset": 46724
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 427,
							"col": 0,
							"offset": 46726
						},
						"end": {
							"line": 427,
							"col": 98,
							"offset": 46824
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 429,
							"col": 0,
							"offset": 46826
						},
						"end": {
							"line": 429,
							"col": 308,
							"offset": 47134
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 431,
							"col": 0,
							"offset": 47136
						},
						"end": {
							"line": 431,
							"col": 225,
							"offset": 47361
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 433,
							"col": 0,
							"offset": 47363
						},
						"end": {
							"line": 433,
							"col": 169,
							"offset": 47532
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 435,
							"col": 0,
							"offset": 47534
						},
						"end": {
							"line": 435,
							"col": 127,
							"offset": 47661
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 437,
							"col": 0,
							"offset": 47663
						},
						"end": {
							"line": 437,
							"col": 141,
							"offset": 47804
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 439,
							"col": 0,
							"offset": 47806
						},
						"end": {
							"line": 439,
							"col": 392,
							"offset": 48198
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 441,
							"col": 0,
							"offset": 48200
						},
						"end": {
							"line": 441,
							"col": 166,
							"offset": 48366
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 443,
							"col": 0,
							"offset": 48368
						},
						"end": {
							"line": 443,
							"col": 9,
							"offset": 48377
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 444,
							"col": 0,
							"offset": 48378
						},
						"end": {
							"line": 445,
							"col": 117,
							"offset": 48586
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 447,
							"col": 0,
							"offset": 48588
						},
						"end": {
							"line": 447,
							"col": 118,
							"offset": 48706
						}
					}
				},
				{
					"type": "list",
					"position": {
						"start": {
							"line": 448,
							"col": 0,
							"offset": 48707
						},
						"end": {
							"line": 448,
							"col": 31,
							"offset": 48738
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 450,
							"col": 0,
							"offset": 48740
						},
						"end": {
							"line": 454,
							"col": 118,
							"offset": 49293
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 456,
							"col": 0,
							"offset": 49295
						},
						"end": {
							"line": 456,
							"col": 51,
							"offset": 49346
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 458,
							"col": 0,
							"offset": 49348
						},
						"end": {
							"line": 458,
							"col": 94,
							"offset": 49442
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 460,
							"col": 0,
							"offset": 49444
						},
						"end": {
							"line": 460,
							"col": 399,
							"offset": 49843
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 462,
							"col": 0,
							"offset": 49845
						},
						"end": {
							"line": 463,
							"col": 76,
							"offset": 50175
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 465,
							"col": 0,
							"offset": 50177
						},
						"end": {
							"line": 465,
							"col": 91,
							"offset": 50268
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 467,
							"col": 0,
							"offset": 50270
						},
						"end": {
							"line": 467,
							"col": 320,
							"offset": 50590
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 469,
							"col": 0,
							"offset": 50593
						},
						"end": {
							"line": 469,
							"col": 336,
							"offset": 50929
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 471,
							"col": 0,
							"offset": 50931
						},
						"end": {
							"line": 471,
							"col": 135,
							"offset": 51066
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 473,
							"col": 0,
							"offset": 51068
						},
						"end": {
							"line": 473,
							"col": 236,
							"offset": 51304
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 475,
							"col": 0,
							"offset": 51306
						},
						"end": {
							"line": 475,
							"col": 207,
							"offset": 51513
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 477,
							"col": 0,
							"offset": 51515
						},
						"end": {
							"line": 477,
							"col": 91,
							"offset": 51606
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 479,
							"col": 0,
							"offset": 51608
						},
						"end": {
							"line": 482,
							"col": 129,
							"offset": 52064
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 484,
							"col": 0,
							"offset": 52066
						},
						"end": {
							"line": 484,
							"col": 261,
							"offset": 52327
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 486,
							"col": 0,
							"offset": 52329
						},
						"end": {
							"line": 486,
							"col": 109,
							"offset": 52438
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 488,
							"col": 0,
							"offset": 52440
						},
						"end": {
							"line": 488,
							"col": 117,
							"offset": 52557
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 490,
							"col": 0,
							"offset": 52559
						},
						"end": {
							"line": 490,
							"col": 559,
							"offset": 53118
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 492,
							"col": 0,
							"offset": 53120
						},
						"end": {
							"line": 496,
							"col": 119,
							"offset": 53760
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 498,
							"col": 0,
							"offset": 53762
						},
						"end": {
							"line": 498,
							"col": 420,
							"offset": 54182
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 500,
							"col": 0,
							"offset": 54184
						},
						"end": {
							"line": 500,
							"col": 122,
							"offset": 54306
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 502,
							"col": 0,
							"offset": 54308
						},
						"end": {
							"line": 502,
							"col": 300,
							"offset": 54608
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 504,
							"col": 0,
							"offset": 54610
						},
						"end": {
							"line": 504,
							"col": 126,
							"offset": 54736
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 506,
							"col": 0,
							"offset": 54738
						},
						"end": {
							"line": 506,
							"col": 232,
							"offset": 54970
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 508,
							"col": 0,
							"offset": 54972
						},
						"end": {
							"line": 508,
							"col": 468,
							"offset": 55440
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 510,
							"col": 0,
							"offset": 55442
						},
						"end": {
							"line": 510,
							"col": 423,
							"offset": 55865
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 512,
							"col": 0,
							"offset": 55867
						},
						"end": {
							"line": 512,
							"col": 452,
							"offset": 56319
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 514,
							"col": 0,
							"offset": 56321
						},
						"end": {
							"line": 514,
							"col": 123,
							"offset": 56444
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 516,
							"col": 0,
							"offset": 56446
						},
						"end": {
							"line": 516,
							"col": 182,
							"offset": 56628
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 518,
							"col": 0,
							"offset": 56630
						},
						"end": {
							"line": 518,
							"col": 294,
							"offset": 56924
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 520,
							"col": 0,
							"offset": 56926
						},
						"end": {
							"line": 520,
							"col": 440,
							"offset": 57366
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 522,
							"col": 0,
							"offset": 57368
						},
						"end": {
							"line": 522,
							"col": 176,
							"offset": 57544
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 524,
							"col": 0,
							"offset": 57546
						},
						"end": {
							"line": 527,
							"col": 285,
							"offset": 58322
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 529,
							"col": 0,
							"offset": 58324
						},
						"end": {
							"line": 529,
							"col": 373,
							"offset": 58697
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 531,
							"col": 0,
							"offset": 58699
						},
						"end": {
							"line": 531,
							"col": 408,
							"offset": 59107
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 533,
							"col": 0,
							"offset": 59109
						},
						"end": {
							"line": 533,
							"col": 97,
							"offset": 59206
						}
					}
				},
				{
					"type": "callout",
					"position": {
						"start": {
							"line": 535,
							"col": 0,
							"offset": 59208
						},
						"end": {
							"line": 536,
							"col": 38,
							"offset": 59334
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 538,
							"col": 0,
							"offset": 59336
						},
						"end": {
							"line": 538,
							"col": 119,
							"offset": 59455
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 540,
							"col": 0,
							"offset": 59457
						},
						"end": {
							"line": 540,
							"col": 131,
							"offset": 59588
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 542,
							"col": 0,
							"offset": 59590
						},
						"end": {
							"line": 542,
							"col": 241,
							"offset": 59831
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 544,
							"col": 0,
							"offset": 59833
						},
						"end": {
							"line": 544,
							"col": 170,
							"offset": 60003
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 546,
							"col": 0,
							"offset": 60005
						},
						"end": {
							"line": 546,
							"col": 112,
							"offset": 60117
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 548,
							"col": 0,
							"offset": 60119
						},
						"end": {
							"line": 548,
							"col": 247,
							"offset": 60366
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 550,
							"col": 0,
							"offset": 60368
						},
						"end": {
							"line": 550,
							"col": 167,
							"offset": 60535
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 552,
							"col": 0,
							"offset": 60537
						},
						"end": {
							"line": 552,
							"col": 415,
							"offset": 60952
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 554,
							"col": 0,
							"offset": 60954
						},
						"end": {
							"line": 554,
							"col": 111,
							"offset": 61065
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 556,
							"col": 0,
							"offset": 61067
						},
						"end": {
							"line": 557,
							"col": 110,
							"offset": 61444
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 559,
							"col": 0,
							"offset": 61446
						},
						"end": {
							"line": 559,
							"col": 468,
							"offset": 61914
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 561,
							"col": 0,
							"offset": 61916
						},
						"end": {
							"line": 562,
							"col": 108,
							"offset": 62806
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 564,
							"col": 0,
							"offset": 62808
						},
						"end": {
							"line": 564,
							"col": 310,
							"offset": 63118
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 566,
							"col": 0,
							"offset": 63120
						},
						"end": {
							"line": 566,
							"col": 415,
							"offset": 63535
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 568,
							"col": 0,
							"offset": 63537
						},
						"end": {
							"line": 569,
							"col": 111,
							"offset": 63894
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 571,
							"col": 0,
							"offset": 63896
						},
						"end": {
							"line": 571,
							"col": 81,
							"offset": 63977
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 573,
							"col": 0,
							"offset": 63979
						},
						"end": {
							"line": 573,
							"col": 273,
							"offset": 64252
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 575,
							"col": 0,
							"offset": 64254
						},
						"end": {
							"line": 575,
							"col": 467,
							"offset": 64721
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 577,
							"col": 0,
							"offset": 64723
						},
						"end": {
							"line": 577,
							"col": 95,
							"offset": 64818
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 579,
							"col": 0,
							"offset": 64820
						},
						"end": {
							"line": 579,
							"col": 75,
							"offset": 64895
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 581,
							"col": 0,
							"offset": 64897
						},
						"end": {
							"line": 581,
							"col": 244,
							"offset": 65141
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 583,
							"col": 0,
							"offset": 65143
						},
						"end": {
							"line": 583,
							"col": 69,
							"offset": 65212
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 585,
							"col": 0,
							"offset": 65214
						},
						"end": {
							"line": 585,
							"col": 360,
							"offset": 65574
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 587,
							"col": 0,
							"offset": 65576
						},
						"end": {
							"line": 587,
							"col": 75,
							"offset": 65651
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 589,
							"col": 0,
							"offset": 65653
						},
						"end": {
							"line": 589,
							"col": 73,
							"offset": 65726
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 591,
							"col": 0,
							"offset": 65728
						},
						"end": {
							"line": 591,
							"col": 171,
							"offset": 65899
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 593,
							"col": 0,
							"offset": 65901
						},
						"end": {
							"line": 593,
							"col": 98,
							"offset": 65999
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 595,
							"col": 0,
							"offset": 66001
						},
						"end": {
							"line": 595,
							"col": 366,
							"offset": 66367
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 597,
							"col": 0,
							"offset": 66369
						},
						"end": {
							"line": 597,
							"col": 121,
							"offset": 66490
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 599,
							"col": 0,
							"offset": 66492
						},
						"end": {
							"line": 599,
							"col": 123,
							"offset": 66615
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 601,
							"col": 0,
							"offset": 66617
						},
						"end": {
							"line": 601,
							"col": 137,
							"offset": 66754
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 603,
							"col": 0,
							"offset": 66756
						},
						"end": {
							"line": 603,
							"col": 112,
							"offset": 66868
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 605,
							"col": 0,
							"offset": 66870
						},
						"end": {
							"line": 605,
							"col": 86,
							"offset": 66956
						}
					}
				},
				{
					"type": "list",
					"position": {
						"start": {
							"line": 606,
							"col": 0,
							"offset": 66957
						},
						"end": {
							"line": 607,
							"col": 29,
							"offset": 67015
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 609,
							"col": 0,
							"offset": 67017
						},
						"end": {
							"line": 609,
							"col": 429,
							"offset": 67446
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 611,
							"col": 0,
							"offset": 67448
						},
						"end": {
							"line": 611,
							"col": 280,
							"offset": 67728
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 613,
							"col": 0,
							"offset": 67730
						},
						"end": {
							"line": 613,
							"col": 439,
							"offset": 68169
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 615,
							"col": 0,
							"offset": 68171
						},
						"end": {
							"line": 615,
							"col": 90,
							"offset": 68261
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 617,
							"col": 0,
							"offset": 68263
						},
						"end": {
							"line": 617,
							"col": 175,
							"offset": 68438
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 619,
							"col": 0,
							"offset": 68440
						},
						"end": {
							"line": 619,
							"col": 287,
							"offset": 68727
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 621,
							"col": 0,
							"offset": 68729
						},
						"end": {
							"line": 621,
							"col": 263,
							"offset": 68992
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 623,
							"col": 0,
							"offset": 68994
						},
						"end": {
							"line": 623,
							"col": 291,
							"offset": 69285
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 629,
							"col": 0,
							"offset": 70367
						},
						"end": {
							"line": 629,
							"col": 77,
							"offset": 70444
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 633,
							"col": 0,
							"offset": 70638
						},
						"end": {
							"line": 633,
							"col": 220,
							"offset": 70858
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 635,
							"col": 0,
							"offset": 70860
						},
						"end": {
							"line": 635,
							"col": 235,
							"offset": 71095
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 637,
							"col": 0,
							"offset": 71097
						},
						"end": {
							"line": 637,
							"col": 94,
							"offset": 71191
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 639,
							"col": 0,
							"offset": 71193
						},
						"end": {
							"line": 639,
							"col": 173,
							"offset": 71366
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 641,
							"col": 0,
							"offset": 71368
						},
						"end": {
							"line": 641,
							"col": 227,
							"offset": 71595
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 643,
							"col": 0,
							"offset": 71597
						},
						"end": {
							"line": 643,
							"col": 96,
							"offset": 71693
						}
					}
				},
				{
					"type": "callout",
					"position": {
						"start": {
							"line": 645,
							"col": 0,
							"offset": 71695
						},
						"end": {
							"line": 646,
							"col": 42,
							"offset": 71802
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 648,
							"col": 0,
							"offset": 71804
						},
						"end": {
							"line": 648,
							"col": 91,
							"offset": 71895
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 650,
							"col": 0,
							"offset": 71897
						},
						"end": {
							"line": 650,
							"col": 152,
							"offset": 72049
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 652,
							"col": 0,
							"offset": 72051
						},
						"end": {
							"line": 652,
							"col": 244,
							"offset": 72295
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 654,
							"col": 0,
							"offset": 72297
						},
						"end": {
							"line": 654,
							"col": 262,
							"offset": 72559
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 656,
							"col": 0,
							"offset": 72561
						},
						"end": {
							"line": 656,
							"col": 105,
							"offset": 72666
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 658,
							"col": 0,
							"offset": 72668
						},
						"end": {
							"line": 661,
							"col": 177,
							"offset": 73260
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 663,
							"col": 0,
							"offset": 73262
						},
						"end": {
							"line": 664,
							"col": 263,
							"offset": 73651
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 666,
							"col": 0,
							"offset": 73653
						},
						"end": {
							"line": 666,
							"col": 201,
							"offset": 73854
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 668,
							"col": 0,
							"offset": 73856
						},
						"end": {
							"line": 668,
							"col": 139,
							"offset": 73995
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 670,
							"col": 0,
							"offset": 73997
						},
						"end": {
							"line": 672,
							"col": 302,
							"offset": 74555
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 674,
							"col": 0,
							"offset": 74557
						},
						"end": {
							"line": 674,
							"col": 638,
							"offset": 75195
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 676,
							"col": 0,
							"offset": 75197
						},
						"end": {
							"line": 676,
							"col": 438,
							"offset": 75635
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 678,
							"col": 0,
							"offset": 75637
						},
						"end": {
							"line": 678,
							"col": 228,
							"offset": 75865
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 680,
							"col": 0,
							"offset": 75867
						},
						"end": {
							"line": 680,
							"col": 194,
							"offset": 76061
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 682,
							"col": 0,
							"offset": 76063
						},
						"end": {
							"line": 682,
							"col": 76,
							"offset": 76139
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 684,
							"col": 0,
							"offset": 76141
						},
						"end": {
							"line": 684,
							"col": 120,
							"offset": 76261
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 686,
							"col": 0,
							"offset": 76263
						},
						"end": {
							"line": 693,
							"col": 137,
							"offset": 76919
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 695,
							"col": 0,
							"offset": 76921
						},
						"end": {
							"line": 697,
							"col": 56,
							"offset": 77178
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 699,
							"col": 0,
							"offset": 77180
						},
						"end": {
							"line": 700,
							"col": 58,
							"offset": 77803
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 702,
							"col": 0,
							"offset": 77805
						},
						"end": {
							"line": 702,
							"col": 119,
							"offset": 77924
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 704,
							"col": 0,
							"offset": 77926
						},
						"end": {
							"line": 705,
							"col": 59,
							"offset": 78073
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 707,
							"col": 0,
							"offset": 78075
						},
						"end": {
							"line": 707,
							"col": 242,
							"offset": 78317
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 709,
							"col": 0,
							"offset": 78319
						},
						"end": {
							"line": 709,
							"col": 83,
							"offset": 78402
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 711,
							"col": 0,
							"offset": 78404
						},
						"end": {
							"line": 711,
							"col": 289,
							"offset": 78693
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 713,
							"col": 0,
							"offset": 78695
						},
						"end": {
							"line": 713,
							"col": 95,
							"offset": 78790
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 715,
							"col": 0,
							"offset": 78792
						},
						"end": {
							"line": 715,
							"col": 423,
							"offset": 79215
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 717,
							"col": 0,
							"offset": 79217
						},
						"end": {
							"line": 717,
							"col": 81,
							"offset": 79298
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 719,
							"col": 0,
							"offset": 79300
						},
						"end": {
							"line": 719,
							"col": 183,
							"offset": 79483
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 721,
							"col": 0,
							"offset": 79485
						},
						"end": {
							"line": 721,
							"col": 284,
							"offset": 79769
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 723,
							"col": 0,
							"offset": 79771
						},
						"end": {
							"line": 723,
							"col": 362,
							"offset": 80133
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 725,
							"col": 0,
							"offset": 80135
						},
						"end": {
							"line": 725,
							"col": 153,
							"offset": 80288
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 727,
							"col": 0,
							"offset": 80290
						},
						"end": {
							"line": 727,
							"col": 256,
							"offset": 80546
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 729,
							"col": 0,
							"offset": 80548
						},
						"end": {
							"line": 729,
							"col": 87,
							"offset": 80635
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 731,
							"col": 0,
							"offset": 80637
						},
						"end": {
							"line": 731,
							"col": 211,
							"offset": 80848
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 733,
							"col": 0,
							"offset": 80850
						},
						"end": {
							"line": 733,
							"col": 311,
							"offset": 81161
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 735,
							"col": 0,
							"offset": 81163
						},
						"end": {
							"line": 735,
							"col": 302,
							"offset": 81465
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 737,
							"col": 0,
							"offset": 81467
						},
						"end": {
							"line": 737,
							"col": 117,
							"offset": 81584
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 739,
							"col": 0,
							"offset": 81586
						},
						"end": {
							"line": 739,
							"col": 97,
							"offset": 81683
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 740,
							"col": 0,
							"offset": 81684
						},
						"end": {
							"line": 740,
							"col": 47,
							"offset": 81731
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 742,
							"col": 0,
							"offset": 81733
						},
						"end": {
							"line": 742,
							"col": 351,
							"offset": 82084
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 744,
							"col": 0,
							"offset": 82086
						},
						"end": {
							"line": 744,
							"col": 117,
							"offset": 82203
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 746,
							"col": 0,
							"offset": 82205
						},
						"end": {
							"line": 746,
							"col": 266,
							"offset": 82471
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 748,
							"col": 0,
							"offset": 82473
						},
						"end": {
							"line": 748,
							"col": 115,
							"offset": 82588
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 750,
							"col": 0,
							"offset": 82590
						},
						"end": {
							"line": 750,
							"col": 94,
							"offset": 82684
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 752,
							"col": 0,
							"offset": 82686
						},
						"end": {
							"line": 752,
							"col": 202,
							"offset": 82888
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 754,
							"col": 0,
							"offset": 82891
						},
						"end": {
							"line": 754,
							"col": 317,
							"offset": 83208
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 756,
							"col": 0,
							"offset": 83211
						},
						"end": {
							"line": 756,
							"col": 72,
							"offset": 83283
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 758,
							"col": 0,
							"offset": 83286
						},
						"end": {
							"line": 758,
							"col": 239,
							"offset": 83525
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 760,
							"col": 0,
							"offset": 83528
						},
						"end": {
							"line": 760,
							"col": 180,
							"offset": 83708
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 762,
							"col": 0,
							"offset": 83711
						},
						"end": {
							"line": 762,
							"col": 291,
							"offset": 84002
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 764,
							"col": 0,
							"offset": 84005
						},
						"end": {
							"line": 764,
							"col": 98,
							"offset": 84103
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 766,
							"col": 0,
							"offset": 84106
						},
						"end": {
							"line": 766,
							"col": 230,
							"offset": 84336
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 768,
							"col": 0,
							"offset": 84339
						},
						"end": {
							"line": 768,
							"col": 93,
							"offset": 84432
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 770,
							"col": 0,
							"offset": 84434
						},
						"end": {
							"line": 770,
							"col": 105,
							"offset": 84539
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 772,
							"col": 0,
							"offset": 84541
						},
						"end": {
							"line": 772,
							"col": 259,
							"offset": 84800
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 774,
							"col": 0,
							"offset": 84802
						},
						"end": {
							"line": 774,
							"col": 302,
							"offset": 85104
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 776,
							"col": 0,
							"offset": 85106
						},
						"end": {
							"line": 776,
							"col": 214,
							"offset": 85320
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 778,
							"col": 0,
							"offset": 85323
						},
						"end": {
							"line": 778,
							"col": 300,
							"offset": 85623
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 780,
							"col": 0,
							"offset": 85625
						},
						"end": {
							"line": 780,
							"col": 113,
							"offset": 85738
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 782,
							"col": 0,
							"offset": 85741
						},
						"end": {
							"line": 782,
							"col": 54,
							"offset": 85795
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 784,
							"col": 0,
							"offset": 85797
						},
						"end": {
							"line": 784,
							"col": 176,
							"offset": 85973
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 786,
							"col": 0,
							"offset": 85976
						},
						"end": {
							"line": 786,
							"col": 258,
							"offset": 86234
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 788,
							"col": 0,
							"offset": 86237
						},
						"end": {
							"line": 788,
							"col": 176,
							"offset": 86413
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 790,
							"col": 0,
							"offset": 86416
						},
						"end": {
							"line": 790,
							"col": 89,
							"offset": 86505
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 792,
							"col": 0,
							"offset": 86508
						},
						"end": {
							"line": 792,
							"col": 286,
							"offset": 86794
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 794,
							"col": 0,
							"offset": 86797
						},
						"end": {
							"line": 794,
							"col": 139,
							"offset": 86936
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 796,
							"col": 0,
							"offset": 86938
						},
						"end": {
							"line": 796,
							"col": 83,
							"offset": 87021
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 798,
							"col": 0,
							"offset": 87023
						},
						"end": {
							"line": 798,
							"col": 78,
							"offset": 87101
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 800,
							"col": 0,
							"offset": 87104
						},
						"end": {
							"line": 800,
							"col": 78,
							"offset": 87182
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 802,
							"col": 0,
							"offset": 87185
						},
						"end": {
							"line": 802,
							"col": 91,
							"offset": 87276
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 804,
							"col": 0,
							"offset": 87279
						},
						"end": {
							"line": 804,
							"col": 87,
							"offset": 87366
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 806,
							"col": 0,
							"offset": 87369
						},
						"end": {
							"line": 806,
							"col": 53,
							"offset": 87422
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 808,
							"col": 0,
							"offset": 87424
						},
						"end": {
							"line": 808,
							"col": 127,
							"offset": 87551
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 810,
							"col": 0,
							"offset": 87554
						},
						"end": {
							"line": 810,
							"col": 175,
							"offset": 87729
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 812,
							"col": 0,
							"offset": 87732
						},
						"end": {
							"line": 812,
							"col": 304,
							"offset": 88036
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 814,
							"col": 0,
							"offset": 88039
						},
						"end": {
							"line": 814,
							"col": 272,
							"offset": 88311
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 816,
							"col": 0,
							"offset": 88314
						},
						"end": {
							"line": 816,
							"col": 140,
							"offset": 88454
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 818,
							"col": 0,
							"offset": 88457
						},
						"end": {
							"line": 818,
							"col": 383,
							"offset": 88840
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 820,
							"col": 0,
							"offset": 88843
						},
						"end": {
							"line": 820,
							"col": 307,
							"offset": 89150
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 822,
							"col": 0,
							"offset": 89153
						},
						"end": {
							"line": 822,
							"col": 200,
							"offset": 89353
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 824,
							"col": 0,
							"offset": 89356
						},
						"end": {
							"line": 824,
							"col": 377,
							"offset": 89733
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 826,
							"col": 0,
							"offset": 89736
						},
						"end": {
							"line": 827,
							"col": 56,
							"offset": 90027
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 829,
							"col": 0,
							"offset": 90029
						},
						"end": {
							"line": 829,
							"col": 208,
							"offset": 90237
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 831,
							"col": 0,
							"offset": 90240
						},
						"end": {
							"line": 831,
							"col": 250,
							"offset": 90490
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 833,
							"col": 0,
							"offset": 90493
						},
						"end": {
							"line": 833,
							"col": 110,
							"offset": 90603
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 835,
							"col": 0,
							"offset": 90606
						},
						"end": {
							"line": 835,
							"col": 170,
							"offset": 90776
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 837,
							"col": 0,
							"offset": 90779
						},
						"end": {
							"line": 837,
							"col": 339,
							"offset": 91118
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 839,
							"col": 0,
							"offset": 91121
						},
						"end": {
							"line": 839,
							"col": 145,
							"offset": 91266
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 841,
							"col": 0,
							"offset": 91269
						},
						"end": {
							"line": 841,
							"col": 433,
							"offset": 91702
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 843,
							"col": 0,
							"offset": 91705
						},
						"end": {
							"line": 843,
							"col": 190,
							"offset": 91895
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 845,
							"col": 0,
							"offset": 91898
						},
						"end": {
							"line": 845,
							"col": 158,
							"offset": 92056
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 847,
							"col": 0,
							"offset": 92059
						},
						"end": {
							"line": 847,
							"col": 264,
							"offset": 92323
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 849,
							"col": 0,
							"offset": 92325
						},
						"end": {
							"line": 849,
							"col": 117,
							"offset": 92442
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 851,
							"col": 0,
							"offset": 92445
						},
						"end": {
							"line": 851,
							"col": 216,
							"offset": 92661
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 853,
							"col": 0,
							"offset": 92664
						},
						"end": {
							"line": 853,
							"col": 179,
							"offset": 92843
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 855,
							"col": 0,
							"offset": 92846
						},
						"end": {
							"line": 855,
							"col": 225,
							"offset": 93071
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 857,
							"col": 0,
							"offset": 93074
						},
						"end": {
							"line": 857,
							"col": 121,
							"offset": 93195
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 859,
							"col": 0,
							"offset": 93197
						},
						"end": {
							"line": 859,
							"col": 54,
							"offset": 93251
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 861,
							"col": 0,
							"offset": 93253
						},
						"end": {
							"line": 861,
							"col": 223,
							"offset": 93476
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 863,
							"col": 0,
							"offset": 93479
						},
						"end": {
							"line": 863,
							"col": 53,
							"offset": 93532
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 865,
							"col": 0,
							"offset": 93534
						},
						"end": {
							"line": 865,
							"col": 224,
							"offset": 93758
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 867,
							"col": 0,
							"offset": 93761
						},
						"end": {
							"line": 867,
							"col": 418,
							"offset": 94179
						}
					}
				},
				{
					"type": "paragraph",
					"position": {
						"start": {
							"line": 869,
							"col": 0,
							"offset": 94182
						},
						"end": {
							"line": 869,
							"col": 148,
							"offset": 94330
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 871,
							"col": 0,
							"offset": 94333
						},
						"end": {
							"line": 876,
							"col": 116,
							"offset": 94767
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 878,
							"col": 0,
							"offset": 94770
						},
						"end": {
							"line": 878,
							"col": 443,
							"offset": 95213
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 880,
							"col": 0,
							"offset": 95216
						},
						"end": {
							"line": 885,
							"col": 113,
							"offset": 95628
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 887,
							"col": 0,
							"offset": 95631
						},
						"end": {
							"line": 887,
							"col": 125,
							"offset": 95756
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 889,
							"col": 0,
							"offset": 95759
						},
						"end": {
							"line": 889,
							"col": 262,
							"offset": 96021
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 891,
							"col": 0,
							"offset": 96024
						},
						"end": {
							"line": 891,
							"col": 113,
							"offset": 96137
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 893,
							"col": 0,
							"offset": 96140
						},
						"end": {
							"line": 893,
							"col": 510,
							"offset": 96650
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 895,
							"col": 0,
							"offset": 96653
						},
						"end": {
							"line": 895,
							"col": 129,
							"offset": 96782
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 897,
							"col": 0,
							"offset": 96785
						},
						"end": {
							"line": 897,
							"col": 374,
							"offset": 97159
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 899,
							"col": 0,
							"offset": 97162
						},
						"end": {
							"line": 899,
							"col": 117,
							"offset": 97279
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 901,
							"col": 0,
							"offset": 97282
						},
						"end": {
							"line": 901,
							"col": 324,
							"offset": 97606
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 903,
							"col": 0,
							"offset": 97609
						},
						"end": {
							"line": 903,
							"col": 200,
							"offset": 97809
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 905,
							"col": 0,
							"offset": 97812
						},
						"end": {
							"line": 905,
							"col": 227,
							"offset": 98039
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 907,
							"col": 0,
							"offset": 98042
						},
						"end": {
							"line": 909,
							"col": 202,
							"offset": 98514
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 911,
							"col": 0,
							"offset": 98517
						},
						"end": {
							"line": 912,
							"col": 357,
							"offset": 99087
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 914,
							"col": 0,
							"offset": 99090
						},
						"end": {
							"line": 914,
							"col": 89,
							"offset": 99179
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 916,
							"col": 0,
							"offset": 99182
						},
						"end": {
							"line": 921,
							"col": 183,
							"offset": 99709
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 923,
							"col": 0,
							"offset": 99712
						},
						"end": {
							"line": 923,
							"col": 89,
							"offset": 99801
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 925,
							"col": 0,
							"offset": 99804
						},
						"end": {
							"line": 925,
							"col": 137,
							"offset": 99941
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 927,
							"col": 0,
							"offset": 99944
						},
						"end": {
							"line": 927,
							"col": 412,
							"offset": 100356
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 929,
							"col": 0,
							"offset": 100359
						},
						"end": {
							"line": 929,
							"col": 456,
							"offset": 100815
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 931,
							"col": 0,
							"offset": 100818
						},
						"end": {
							"line": 931,
							"col": 124,
							"offset": 100942
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 933,
							"col": 0,
							"offset": 100945
						},
						"end": {
							"line": 933,
							"col": 130,
							"offset": 101075
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 935,
							"col": 0,
							"offset": 101078
						},
						"end": {
							"line": 935,
							"col": 114,
							"offset": 101192
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 937,
							"col": 0,
							"offset": 101195
						},
						"end": {
							"line": 937,
							"col": 265,
							"offset": 101460
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 939,
							"col": 0,
							"offset": 101463
						},
						"end": {
							"line": 939,
							"col": 185,
							"offset": 101648
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 941,
							"col": 0,
							"offset": 101651
						},
						"end": {
							"line": 941,
							"col": 455,
							"offset": 102106
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 943,
							"col": 0,
							"offset": 102109
						},
						"end": {
							"line": 943,
							"col": 141,
							"offset": 102250
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 945,
							"col": 0,
							"offset": 102253
						},
						"end": {
							"line": 945,
							"col": 321,
							"offset": 102574
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 947,
							"col": 0,
							"offset": 102577
						},
						"end": {
							"line": 947,
							"col": 224,
							"offset": 102801
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 949,
							"col": 0,
							"offset": 102804
						},
						"end": {
							"line": 952,
							"col": 336,
							"offset": 103590
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 954,
							"col": 0,
							"offset": 103593
						},
						"end": {
							"line": 954,
							"col": 242,
							"offset": 103835
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 956,
							"col": 0,
							"offset": 103838
						},
						"end": {
							"line": 956,
							"col": 150,
							"offset": 103988
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 958,
							"col": 0,
							"offset": 103991
						},
						"end": {
							"line": 958,
							"col": 255,
							"offset": 104246
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 960,
							"col": 0,
							"offset": 104249
						},
						"end": {
							"line": 960,
							"col": 229,
							"offset": 104478
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 962,
							"col": 0,
							"offset": 104481
						},
						"end": {
							"line": 962,
							"col": 134,
							"offset": 104615
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 964,
							"col": 0,
							"offset": 104618
						},
						"end": {
							"line": 969,
							"col": 119,
							"offset": 105095
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 971,
							"col": 0,
							"offset": 105098
						},
						"end": {
							"line": 971,
							"col": 122,
							"offset": 105220
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1008,
							"col": 0,
							"offset": 108130
						},
						"end": {
							"line": 1012,
							"col": 235,
							"offset": 108759
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1014,
							"col": 0,
							"offset": 108761
						},
						"end": {
							"line": 1014,
							"col": 111,
							"offset": 108872
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1016,
							"col": 0,
							"offset": 108874
						},
						"end": {
							"line": 1016,
							"col": 335,
							"offset": 109209
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1018,
							"col": 0,
							"offset": 109211
						},
						"end": {
							"line": 1018,
							"col": 150,
							"offset": 109361
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1020,
							"col": 0,
							"offset": 109363
						},
						"end": {
							"line": 1020,
							"col": 152,
							"offset": 109515
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1021,
							"col": 0,
							"offset": 109516
						},
						"end": {
							"line": 1021,
							"col": 95,
							"offset": 109611
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1023,
							"col": 0,
							"offset": 109614
						},
						"end": {
							"line": 1023,
							"col": 231,
							"offset": 109845
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1025,
							"col": 0,
							"offset": 109848
						},
						"end": {
							"line": 1025,
							"col": 415,
							"offset": 110263
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1027,
							"col": 0,
							"offset": 110266
						},
						"end": {
							"line": 1027,
							"col": 135,
							"offset": 110401
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1029,
							"col": 0,
							"offset": 110404
						},
						"end": {
							"line": 1029,
							"col": 184,
							"offset": 110588
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1031,
							"col": 0,
							"offset": 110591
						},
						"end": {
							"line": 1031,
							"col": 109,
							"offset": 110700
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1033,
							"col": 0,
							"offset": 110703
						},
						"end": {
							"line": 1033,
							"col": 329,
							"offset": 111032
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1035,
							"col": 0,
							"offset": 111035
						},
						"end": {
							"line": 1035,
							"col": 99,
							"offset": 111134
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1037,
							"col": 0,
							"offset": 111137
						},
						"end": {
							"line": 1037,
							"col": 90,
							"offset": 111227
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1039,
							"col": 0,
							"offset": 111230
						},
						"end": {
							"line": 1039,
							"col": 450,
							"offset": 111680
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1041,
							"col": 0,
							"offset": 111683
						},
						"end": {
							"line": 1041,
							"col": 91,
							"offset": 111774
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1043,
							"col": 0,
							"offset": 111777
						},
						"end": {
							"line": 1043,
							"col": 92,
							"offset": 111869
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1045,
							"col": 0,
							"offset": 111872
						},
						"end": {
							"line": 1045,
							"col": 326,
							"offset": 112198
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1047,
							"col": 0,
							"offset": 112201
						},
						"end": {
							"line": 1047,
							"col": 118,
							"offset": 112319
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1049,
							"col": 0,
							"offset": 112322
						},
						"end": {
							"line": 1049,
							"col": 101,
							"offset": 112423
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1051,
							"col": 0,
							"offset": 112426
						},
						"end": {
							"line": 1051,
							"col": 99,
							"offset": 112525
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1053,
							"col": 0,
							"offset": 112528
						},
						"end": {
							"line": 1056,
							"col": 310,
							"offset": 113422
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1058,
							"col": 0,
							"offset": 113425
						},
						"end": {
							"line": 1058,
							"col": 264,
							"offset": 113689
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1060,
							"col": 0,
							"offset": 113692
						},
						"end": {
							"line": 1060,
							"col": 611,
							"offset": 114303
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1062,
							"col": 0,
							"offset": 114306
						},
						"end": {
							"line": 1062,
							"col": 1723,
							"offset": 116029
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1064,
							"col": 0,
							"offset": 116032
						},
						"end": {
							"line": 1064,
							"col": 1742,
							"offset": 117774
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1066,
							"col": 0,
							"offset": 117777
						},
						"end": {
							"line": 1066,
							"col": 104,
							"offset": 117881
						}
					}
				},
				{
					"type": "blockquote",
					"position": {
						"start": {
							"line": 1068,
							"col": 0,
							"offset": 117884
						},
						"end": {
							"line": 1068,
							"col": 128,
							"offset": 118012
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1070,
							"col": 0,
							"offset": 118015
						},
						"end": {
							"line": 1070,
							"col": 78,
							"offset": 118093
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1072,
							"col": 0,
							"offset": 118096
						},
						"end": {
							"line": 1072,
							"col": 100,
							"offset": 118196
						}
					}
				},
				{
					"type": "heading",
					"position": {
						"start": {
							"line": 1074,
							"col": 0,
							"offset": 118199
						},
						"end": {
							"line": 1074,
							"col": 74,
							"offset": 118273
						}
					}
				}
			],
			"listItems": [
				{
					"parent": -28,
					"position": {
						"start": {
							"line": 28,
							"col": 0,
							"offset": 2135
						},
						"end": {
							"line": 28,
							"col": 24,
							"offset": 2159
						}
					}
				},
				{
					"parent": -28,
					"position": {
						"start": {
							"line": 29,
							"col": 0,
							"offset": 2160
						},
						"end": {
							"line": 29,
							"col": 8,
							"offset": 2168
						}
					}
				},
				{
					"parent": -50,
					"task": " ",
					"position": {
						"start": {
							"line": 50,
							"col": 0,
							"offset": 2476
						},
						"end": {
							"line": 50,
							"col": 98,
							"offset": 2574
						}
					}
				},
				{
					"parent": -50,
					"task": " ",
					"position": {
						"start": {
							"line": 51,
							"col": 0,
							"offset": 2575
						},
						"end": {
							"line": 51,
							"col": 69,
							"offset": 2644
						}
					}
				},
				{
					"parent": -55,
					"task": " ",
					"position": {
						"start": {
							"line": 55,
							"col": 0,
							"offset": 2834
						},
						"end": {
							"line": 55,
							"col": 109,
							"offset": 2943
						}
					}
				},
				{
					"parent": -55,
					"task": "x",
					"position": {
						"start": {
							"line": 56,
							"col": 0,
							"offset": 2944
						},
						"end": {
							"line": 56,
							"col": 113,
							"offset": 3057
						}
					}
				},
				{
					"parent": -55,
					"task": "x",
					"position": {
						"start": {
							"line": 57,
							"col": 0,
							"offset": 3058
						},
						"end": {
							"line": 57,
							"col": 155,
							"offset": 3213
						}
					}
				},
				{
					"parent": -55,
					"task": "x",
					"position": {
						"start": {
							"line": 58,
							"col": 0,
							"offset": 3214
						},
						"end": {
							"line": 58,
							"col": 136,
							"offset": 3350
						}
					}
				},
				{
					"parent": -126,
					"position": {
						"start": {
							"line": 126,
							"col": 2,
							"offset": 10489
						},
						"end": {
							"line": 126,
							"col": 36,
							"offset": 10523
						}
					}
				},
				{
					"parent": -126,
					"position": {
						"start": {
							"line": 127,
							"col": 2,
							"offset": 10526
						},
						"end": {
							"line": 127,
							"col": 51,
							"offset": 10575
						}
					}
				},
				{
					"parent": -126,
					"position": {
						"start": {
							"line": 128,
							"col": 2,
							"offset": 10578
						},
						"end": {
							"line": 128,
							"col": 53,
							"offset": 10629
						}
					}
				},
				{
					"parent": -126,
					"position": {
						"start": {
							"line": 129,
							"col": 2,
							"offset": 10632
						},
						"end": {
							"line": 129,
							"col": 113,
							"offset": 10743
						}
					}
				},
				{
					"parent": -342,
					"position": {
						"start": {
							"line": 342,
							"col": 2,
							"offset": 35582
						},
						"end": {
							"line": 342,
							"col": 25,
							"offset": 35605
						}
					}
				},
				{
					"parent": -342,
					"position": {
						"start": {
							"line": 343,
							"col": 2,
							"offset": 35608
						},
						"end": {
							"line": 343,
							"col": 24,
							"offset": 35630
						}
					}
				},
				{
					"parent": -342,
					"position": {
						"start": {
							"line": 344,
							"col": 2,
							"offset": 35633
						},
						"end": {
							"line": 345,
							"col": 219,
							"offset": 35912
						}
					}
				},
				{
					"parent": -360,
					"position": {
						"start": {
							"line": 360,
							"col": 2,
							"offset": 37125
						},
						"end": {
							"line": 360,
							"col": 27,
							"offset": 37150
						}
					}
				},
				{
					"parent": -360,
					"position": {
						"start": {
							"line": 361,
							"col": 2,
							"offset": 37153
						},
						"end": {
							"line": 361,
							"col": 20,
							"offset": 37171
						}
					}
				},
				{
					"parent": -360,
					"position": {
						"start": {
							"line": 362,
							"col": 2,
							"offset": 37174
						},
						"end": {
							"line": 362,
							"col": 30,
							"offset": 37202
						}
					}
				},
				{
					"parent": -360,
					"position": {
						"start": {
							"line": 363,
							"col": 2,
							"offset": 37205
						},
						"end": {
							"line": 364,
							"col": 347,
							"offset": 37573
						}
					}
				},
				{
					"parent": -433,
					"task": " ",
					"position": {
						"start": {
							"line": 433,
							"col": 4,
							"offset": 47367
						},
						"end": {
							"line": 433,
							"col": 169,
							"offset": 47532
						}
					}
				},
				{
					"parent": -444,
					"position": {
						"start": {
							"line": 444,
							"col": 2,
							"offset": 48380
						},
						"end": {
							"line": 444,
							"col": 90,
							"offset": 48468
						}
					}
				},
				{
					"parent": -444,
					"position": {
						"start": {
							"line": 445,
							"col": 2,
							"offset": 48471
						},
						"end": {
							"line": 445,
							"col": 117,
							"offset": 48586
						}
					}
				},
				{
					"parent": -448,
					"position": {
						"start": {
							"line": 448,
							"col": 0,
							"offset": 48707
						},
						"end": {
							"line": 448,
							"col": 31,
							"offset": 48738
						}
					}
				},
				{
					"parent": -448,
					"task": " ",
					"position": {
						"start": {
							"line": 448,
							"col": 2,
							"offset": 48709
						},
						"end": {
							"line": 448,
							"col": 31,
							"offset": 48738
						}
					}
				},
				{
					"parent": -606,
					"task": " ",
					"position": {
						"start": {
							"line": 606,
							"col": 0,
							"offset": 66957
						},
						"end": {
							"line": 606,
							"col": 28,
							"offset": 66985
						}
					}
				},
				{
					"parent": -606,
					"task": " ",
					"position": {
						"start": {
							"line": 607,
							"col": 0,
							"offset": 66986
						},
						"end": {
							"line": 607,
							"col": 29,
							"offset": 67015
						}
					}
				},
				{
					"parent": -878,
					"position": {
						"start": {
							"line": 878,
							"col": 2,
							"offset": 94772
						},
						"end": {
							"line": 878,
							"col": 443,
							"offset": 95213
						}
					}
				},
				{
					"parent": -887,
					"position": {
						"start": {
							"line": 887,
							"col": 2,
							"offset": 95633
						},
						"end": {
							"line": 887,
							"col": 125,
							"offset": 95756
						}
					}
				},
				{
					"parent": -891,
					"position": {
						"start": {
							"line": 891,
							"col": 2,
							"offset": 96026
						},
						"end": {
							"line": 891,
							"col": 113,
							"offset": 96137
						}
					}
				},
				{
					"parent": -895,
					"position": {
						"start": {
							"line": 895,
							"col": 2,
							"offset": 96655
						},
						"end": {
							"line": 895,
							"col": 129,
							"offset": 96782
						}
					}
				},
				{
					"parent": -899,
					"position": {
						"start": {
							"line": 899,
							"col": 2,
							"offset": 97164
						},
						"end": {
							"line": 899,
							"col": 117,
							"offset": 97279
						}
					}
				},
				{
					"parent": -923,
					"position": {
						"start": {
							"line": 923,
							"col": 2,
							"offset": 99714
						},
						"end": {
							"line": 923,
							"col": 89,
							"offset": 99801
						}
					}
				},
				{
					"parent": -925,
					"position": {
						"start": {
							"line": 925,
							"col": 2,
							"offset": 99806
						},
						"end": {
							"line": 925,
							"col": 137,
							"offset": 99941
						}
					}
				},
				{
					"parent": -933,
					"position": {
						"start": {
							"line": 933,
							"col": 2,
							"offset": 100947
						},
						"end": {
							"line": 933,
							"col": 130,
							"offset": 101075
						}
					}
				},
				{
					"parent": -935,
					"position": {
						"start": {
							"line": 935,
							"col": 2,
							"offset": 101080
						},
						"end": {
							"line": 935,
							"col": 114,
							"offset": 101192
						}
					}
				},
				{
					"parent": -939,
					"position": {
						"start": {
							"line": 939,
							"col": 2,
							"offset": 101465
						},
						"end": {
							"line": 939,
							"col": 185,
							"offset": 101648
						}
					}
				},
				{
					"parent": -980,
					"position": {
						"start": {
							"line": 980,
							"col": 2,
							"offset": 105536
						},
						"end": {
							"line": 980,
							"col": 98,
							"offset": 105632
						}
					}
				},
				{
					"parent": -982,
					"position": {
						"start": {
							"line": 982,
							"col": 2,
							"offset": 105637
						},
						"end": {
							"line": 982,
							"col": 108,
							"offset": 105743
						}
					}
				},
				{
					"parent": -984,
					"position": {
						"start": {
							"line": 984,
							"col": 2,
							"offset": 105748
						},
						"end": {
							"line": 984,
							"col": 105,
							"offset": 105851
						}
					}
				},
				{
					"parent": -986,
					"position": {
						"start": {
							"line": 986,
							"col": 2,
							"offset": 105856
						},
						"end": {
							"line": 986,
							"col": 121,
							"offset": 105975
						}
					}
				},
				{
					"parent": -988,
					"position": {
						"start": {
							"line": 988,
							"col": 2,
							"offset": 105980
						},
						"end": {
							"line": 988,
							"col": 96,
							"offset": 106074
						}
					}
				}
			],
			"frontmatter": {
				"entity_ParentItem": "[[Чтение]]",
				"book_authors": [
					"Tiago Forte"
				],
				"book_categories": [
					"Business & Economics"
				],
				"book_cover": "http://books.google.com/books/content?id=G5BOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
				"book_description": "“One of my favorite books of the year. It completely reshaped how I think about information and how and why I take notes.” —Daniel Pink, bestselling author of Drive A revolutionary approach to enhancing productivity, creating flow, and vastly increasing your ability to capture, remember, and benefit from the unprecedented amount of information all around us. For the first time in history, we have instantaneous access to the world's knowledge. There has never been a better time to learn, to contribute, and to improve ourselves. Yet, rather than feeling empowered, we are often left feeling overwhelmed by this constant influx of information. The very knowledge that was supposed to set us free has instead led to the paralyzing stress of believing we'll never know or remember enough. Now, this eye-opening and accessible guide shows how you can easily create your own personal system for knowledge management, otherwise known as a Second Brain. As a trusted and organized digital repository of your most valued ideas, notes, and creative work synced across all your devices and platforms, a Second Brain gives you the confidence to tackle your most important projects and ambitious goals. Discover the full potential of your ideas and translate what you know into more powerful, more meaningful improvements in your work and life by Building a Second Brain.",
				"book_isbn": [
					"9781982167400",
					"1982167408"
				],
				"book_link": null,
				"book_local_cover": "/Building a Second Brain - Tiago Forte.jpg",
				"book_pages": "272",
				"book_published_on": "2022-06-14",
				"book_publisher": "Simon and Schuster",
				"book_status": "To Read",
				"book_subtitle": "A Proven Method to Organize Your Digital Life and Unlock Your Creative Potential",
				"book_tags": [
					"book_notes",
					"books",
					"summaries"
				],
				"book_title": "Building a Second Brain",
				"updatedAt": "2025-03-17T14:11:10",
				"createdAt": "2024-12-27T14:13:09"
			},
			"frontmatterLinks": [
				{
					"key": "entity_ParentItem",
					"link": "Чтение",
					"original": "[[Чтение]]",
					"displayText": "Чтение"
				}
			],
			"v": 1,
			"frontmatterPosition": {
				"start": {
					"line": 0,
					"col": 0,
					"offset": 0
				},
				"end": {
					"line": 25,
					"col": 3,
					"offset": 2086
				}
			}
		}),
	},
	vault: {
		getMarkdownFiles: jest.fn().mockReturnValue([]),
		read: jest.fn().mockResolvedValue(''),
		modify: jest.fn().mockResolvedValue(undefined),
		cachedRead: jest.fn().mockResolvedValue(testData),

	},
};
const fileHelper = new FileHelper(mockApp as unknown as App);

describe('FileHelper', () => {

	//

	beforeAll(() => {
		testData = fs.readFileSync(path.join("/Users/artemdvoryadkin/Projects/obsidian-sharpener/src/Helpers/__tests__/", 'testData.md'), 'utf8');
		//mockApp.vault.cachedRead = jest.fn().mockResolvedValue(testData)
		//fileHelper = new FileHelper(mockApp as unknown as App);
	});


	test('getHeadings should return headings from the file cache', () => {

		const activeFile = fileHelper.getActiveTFile();
		if (activeFile instanceof TFile) {
			const headings = fileHelper.getHeadingsExt(activeFile);
			expect(headings).toEqual(expect.any(Array));
			const heading = headings[20]
			const content = fileHelper.getContentBySection(activeFile, headings[20].sections[0])
			const section = headings[20].sections[0]
		}
	});
});


describe.skip('FileHelper_HeadingExt', () => {

	const fileHelper = new FileHelper(mockApp as unknown as App);

	test('getPaterntHeadings', () => {
		const activeFile = fileHelper.getActiveTFile();

		expect(activeFile).toBeInstanceOf(TFile)

		const newLocal = fileHelper.getHeadingsExt(activeFile!)[5];

		const parentHeadings = newLocal.parentHeading;
		expect(parentHeadings).not.toBeNull();
		expect(parentHeadings?.heading).toEqual("Задача");
		expect(parentHeadings?.parentHeading?.heading).toEqual("Kubernetes");
		expect(parentHeadings?.parentHeading?.parentHeading).toBeNull();
	});

	test('lastPosition', () => {
		const activeFile = fileHelper.getActiveTFile();
		expect(activeFile).toBeInstanceOf(TFile)
		const newLocal = fileHelper.getHeadingsExt(activeFile!)[3];
		expect(newLocal.positionContentStartLine).toEqual(93);
		expect(newLocal.positionContentEndLine).toEqual(133);
	});
}); 
