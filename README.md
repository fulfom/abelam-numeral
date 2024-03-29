# Abelam Numeral

## アベラム語の数詞について

アベラム語の数詞体系はチャンクの鎖モデルを用いて下記のように示すことができる．

|      | A      | C\*      | C\+    | C\*     | C\*        |
| ---- | ------ | -------- | ------ | ------- | ---------- |
| 値   |        | 5        | 25     | 5       | 100        |
| 範囲 | 1--(5) | (1)--(5) | 1--(5) | 6--(20) | (1)--(100) |

構造は下記．

- Num > (Var Cons)* Var
- Var > Num | A | ∅
- Cons > C

Atom List

| 値 | 形式          |
| -- | ------------- |
| 1  | nakyrak       |
| 2  | vyndyk        |
| 3  | kymbyk        |
| 4  | vyndyk vyndyk |

Chunk List

| 種別・値 | 形式                        | 由来            |
| -------- | --------------------------- | --------------- |
| C\*5     | tammba                      |                 |
| C+25     | vyndyk vyndyk tammba tammba | < 4 \* 5 + 5    |
| C\*100   | vyndyk vyndyk tammba tammba | < (4 \* 5) \* 5 |

- チャンクの値の範囲は C*5 (6--(20)) を除いて，無標の（典型的な）範囲: (1)--({次のチャンクの値/値}) である．
- 25--29 (=25+A) については，[4 C\*5 C\*5 A] で表される．よくあるケースだと，ここで C\*25 が導入されるのだが，代わりに C+25 が導入され，結局 C*5 の変数の範囲を拡張させた，ように見える．
- C+25 がなくても，25--29を表現するためならば同階層の同チャンクが許される (\*GapLess >> \*SameChunk)，とすれば [4 C\*5 C\*5 A] の表現が最適になる（はず）．したがって C+25 をたてる必要性には議論の余地がある．T: (全体としてあらわされる数) に最も近く，超えない数は，T = 25--29 のとき 20 なので，まず 20 を取る．その後，あまりの数 5--9 を 新たな T とした表現が続く．
- 実装という点では C+25 をたてないでややアドホックに実装している．

## 変換器について

- arabicToAbelam(): 1以上の整数を受け取って，対応するアベラム語の表現を返す
- parseAbelam(): 文字列を受け取って，対応するアベラム語の数表現を可能な複数の解釈分，Digit型の配列で返す
