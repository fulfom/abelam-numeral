export default function Explanation() {
    return (
        <div className="mt-4">
            <p>重要な点</p>
            <ul>
                <li>以下の表現は単語に分解せずに考えた方が規則がシンプルになって良い．</li>
                <ul>
                    <li><i>vyndyk vyndyk tammba tammba</i> の一解釈は「百」を意味する位取りの表現である．</li>
                    <li><i>vyndyk vyndyk tammba tammba</i> のもう一つの解釈は 25 を意味する準位取りの表現である（[5 ×5]全体の代わりに現れる）．</li>
                    <li><i>vyndyk vyndyk</i> は 4 を意味する（非位取りの）表現である．</li>
                </ul>
                <li>曖昧性は <i>vyndyk vyndyk tammba tammba</i> の解釈が2つあることに起因する．</li>
                <li>構造は基本的に「非位取り × 位取り」を繰り返している．</li>
            </ul>
            <hr />
            <p>アベラム語の数詞体系はチャンクの鎖モデルを用いて下記のように示すことができる．</p>
            <table className="table caption-top">
                <caption>アベラム語の数詞体系のチャンクの鎖図</caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>A</th>
                        <th>C*</th>
                        <th>C+</th>
                        <th>C*</th>
                        <th>C*</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>値</td>
                        <td></td>
                        <td>5</td>
                        <td>25</td>
                        <td>5</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>範囲</td>
                        <td>1--(5)</td>
                        <td>(1)--(5)</td>
                        <td>1--(5)</td>
                        <td>6--(20)</td>
                        <td>(1)--(100)</td>
                    </tr>
                </tbody>
            </table>
            <p>構造は下記．</p>
            <ul>
                <li>Num &gt; (Var Cons)* Var</li>
                <li>Var &gt; Num | A | ∅</li>
                <li>Cons &gt; C</li>
            </ul>
            <table className="table caption-top">
                <caption>Atom List</caption>
                <thead>
                    <tr>
                        <th>値</th>
                        <th>形式</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>nakyrak</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>vyndyk</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>kymbyk</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>vyndyk vyndyk</td>
                    </tr>
                </tbody>
            </table>
            <table className="table caption-top">
                <caption>Chunk List</caption>
                <thead>
                    <tr>
                        <th>種別・値</th>
                        <th>形式</th>
                        <th>由来</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>C*5</td>
                        <td>tammba</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>C+25</td>
                        <td>vyndyk vyndyk tammba tammba</td>
                        <td>&lt; 4 * 5 + 5</td>
                    </tr>
                    <tr>
                        <td>C*100</td>
                        <td>vyndyk vyndyk tammba tammba</td>
                        <td>&lt; (4 * 5) * 5</td>
                    </tr>
                </tbody>
            </table>
            <ul>
                <li>チャンクの値の範囲は C*5 (6--(20)) を除いて，無標の（典型的な）範囲: (1)--({"{"}次のチャンクの値 / 値{"}"}) である．</li>
                <li>25--29 (=25+A) については，[4 C*5 C*5 A] で表される．よくあるケースだと，ここで C*25 が導入されるのだが，代わりに C+25 が導入され，結局 C*5 の変数の範囲を拡張させた，ように見える．</li>
                <li>C+25 がなくても，25--29を表現するためならば同階層の同チャンクが許される (*GapLess &gt;&gt; *SameChunk)，とすれば [4 C*5 C*5 A] の表現が最適になる（はず）．したがって C+25 をたてる必要性には議論の余地がある．T: (全体としてあらわされる数) に最も近く，超えない数は，T = 25--29 のとき 20 なので，まず 20 を取る．その後，あまりの数 5--9 を 新たな T とした表現が続く．</li>
                <li>実装という点では C+25 をたてないでややアドホックに実装している．</li>
            </ul>
        </div>
    )
}