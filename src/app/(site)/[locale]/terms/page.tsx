import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Mother Vegetable terms of service. Read our terms and conditions for using mothervegetable.com.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Terms of Service — Mother Vegetable',
    description: 'Mother Vegetable terms of service. Read our terms and conditions for using mothervegetable.com.',
    images: [{ url: '/cdn/products_achieve_10001.png', width: 800, height: 800, alt: 'Mother Vegetable' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — Mother Vegetable',
    description: 'Mother Vegetable terms of service. Read our terms and conditions for using mothervegetable.com.',
  },
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isJa = locale === 'ja';

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1000px] mx-auto px-3" style={{ color: 'white', textAlign: 'justify' }}>
        {isJa ? (
          <>
            <h2 className="font-bold text-2xl md:text-3xl text-[#25C760] mb-2">
              <b>利用規約</b>
            </h2>
            <p className="mb-6" style={{ fontFamily: 'Gilroy, sans-serif' }}>最終更新日: 2025年11月4日</p>

            {/* 1. はじめに */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">1. はじめに</h5>
              <p className="mb-2"><strong>マザーベジタブル</strong>（「当社」、「私たち」）へようこそ。本利用規約（「規約」、「利用規約」）は、<strong>マザーベジタブル</strong>が運営する<strong>https://www.mothervegetable.com</strong>（以下、総称または個別に「サービス」）のご利用を規定するものです。当社のプライバシーポリシーもサービスのご利用を規定し、当社がどのように情報を収集、保護、開示するかを説明しています。</p>
              <p className="mb-2">お客様と当社との合意には、本規約および当社のプライバシーポリシー（「合意事項」）が含まれます。お客様は合意事項を読み、理解し、これらに拘束されることに同意するものとします。</p>
              <p className="mb-2">合意事項に同意しない（または遵守できない）場合は、サービスをご利用いただけませんが、解決策を見つけるために<strong>support@mothervegetable.com</strong>までメールでご連絡ください。本規約は、サービスへのアクセスまたは使用を希望するすべての訪問者、ユーザー、およびその他の方に適用されます。</p>
            </div>

            {/* 2. 通信 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">2. 通信</h5>
              <p className="mb-2">当社のサービスを利用することにより、お客様はニュースレター、マーケティングまたはプロモーション資料、およびその他の情報の受信に同意するものとします。ただし、配信停止リンクに従うか、support@mothervegetable.comにメールすることで、これらの通信の一部またはすべての受信を拒否することができます。</p>
            </div>

            {/* 3. 購入 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">3. 購入</h5>
              <p className="mb-2">サービスを通じて提供される製品またはサービスの購入（「購入」）を希望する場合、クレジットカードまたはデビットカード番号、カードの有効期限、請求先住所、配送情報など、購入に関連する特定の情報の提供を求められる場合があります。</p>
              <p className="mb-2">お客様は以下を表明し保証するものとします：(i) 購入に関連してカードまたはその他の支払い方法を使用する法的権利を有すること、(ii) 当社に提供する情報が真実、正確、かつ完全であること。</p>
              <p className="mb-2">当社は、支払いの促進および購入の完了を目的として、第三者のサービスを利用する場合があります。お客様の情報を提出することにより、当社のプライバシーポリシーに従ってこれらの第三者に情報を提供する権利を当社に付与するものとします。</p>
              <p className="mb-2">当社は、製品やサービスの在庫状況、商品説明や価格の誤り、注文の誤り、その他の理由を含むがこれらに限定されない理由で、いつでもお客様の注文を拒否またはキャンセルする権利を留保します。</p>
              <p className="mb-2">詐欺または不正もしくは違法な取引が疑われる場合、当社はお客様の注文を拒否またはキャンセルする権利を留保します。</p>
            </div>

            {/* 4. コンテスト、懸賞およびプロモーション */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">4. コンテスト、懸賞およびプロモーション</h5>
              <p className="mb-2">サービスを通じて利用可能なコンテスト、懸賞、またはその他のプロモーション（総称して「プロモーション」）は、本利用規約とは別の規則によって規定される場合があります。プロモーションに参加する場合は、該当する規則と当社のプライバシーポリシーをご確認ください。プロモーションの規則が本利用規約と矛盾する場合は、プロモーション規則が適用されます。</p>
            </div>

            {/* 5. サブスクリプション */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">5. サブスクリプション</h5>
              <p className="mb-2">サービスの一部はサブスクリプション方式で課金されます（「サブスクリプション」）。お客様には定期的かつ周期的に前払いで請求されます（「請求サイクル」）。請求サイクルは、サブスクリプション購入時に選択したサブスクリプションプランの種類に応じて設定されます。</p>
              <p className="mb-2">各請求サイクルの終了時に、お客様がキャンセルするか、マザーベジタブルがキャンセルしない限り、サブスクリプションは同一条件で自動的に更新されます。オンラインアカウント管理ページから、またはsupport@mothervegetable.comカスタマーサポートチームに連絡することで、サブスクリプションの更新をキャンセルできます。</p>
              <p className="mb-2">サブスクリプションの支払い処理には有効な支払い方法が必要です。お客様は、氏名、住所、都道府県、郵便番号、電話番号、および有効な支払い方法情報を含む（ただしこれらに限定されない）正確かつ完全な請求情報をマザーベジタブルに提供するものとします。かかる支払い情報を提出することにより、お客様はアカウントを通じて発生したすべてのサブスクリプション料金をかかる支払い手段に請求することをマザーベジタブルに自動的に承認するものとします。</p>
              <p className="mb-2">何らかの理由で自動課金が実行されなかった場合、マザーベジタブルはサービスへのアクセスを即座に終了する権利を留保します。</p>
            </div>

            {/* 6. 無料トライアル */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">6. 無料トライアル</h5>
              <p className="mb-2">マザーベジタブルは、独自の裁量により、限定された期間の無料トライアル付きサブスクリプションを提供する場合があります（「無料トライアル」）。</p>
              <p className="mb-2">無料トライアルに登録するために、請求情報の入力が必要になる場合があります。</p>
              <p className="mb-2">無料トライアルに登録する際に請求情報を入力した場合、無料トライアルが終了するまでマザーベジタブルから課金されることはありません。無料トライアル期間の最終日に、サブスクリプションをキャンセルしない限り、選択したサブスクリプションの種類に該当するサブスクリプション料金が自動的に課金されます。</p>
              <p className="mb-2">マザーベジタブルは、いつでも予告なく、(i) 無料トライアルの利用規約を変更する、または(ii) 無料トライアルのオファーをキャンセルする権利を留保します。</p>
            </div>

            {/* 7. 料金変更 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">7. 料金変更</h5>
              <p className="mb-2">マザーベジタブルは、独自の裁量により、いつでもサブスクリプション料金を変更できます。サブスクリプション料金の変更は、現行の請求サイクルの終了時に有効となります。</p>
              <p className="mb-2">マザーベジタブルは、サブスクリプション料金の変更について、変更が有効になる前にサブスクリプションを終了する機会を提供するために、合理的な事前通知を行います。</p>
              <p className="mb-2">サブスクリプション料金の変更が発効した後もサービスを継続して使用することは、変更後のサブスクリプション料金の支払いに同意したことを意味します。</p>
            </div>

            {/* 8. 返金ポリシー */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">8. 返金ポリシー</h5>
              <p className="mb-2">当社はお客様に最高の製品とサービスを提供するよう努めています。ご購入にご満足いただけない場合は、お手伝いいたします。返金ポリシーをよくお読みください。</p>
              <div className="pl-4">
                <p className="font-bold mb-1">0.1 返品：</p>
                <p className="mb-2">適格性：購入日から14日以内に返品を申請できます。返品の対象となるには、商品が未使用で、お届けした時と同じ状態で、元の梱包のままである必要があります。生鮮品、パーソナルケア商品、デジタル製品など、返品不可の商品もあります。</p>
                <p className="mb-2">購入証明：返品の処理には、有効なレシートまたは購入証明が必要です。</p>
                <p className="font-bold mb-1">0.2 返金：</p>
                <p className="mb-2">処理：返品商品を受領後、検品を行い、返金の承認または却下をお知らせします。承認された場合、返金が処理され、14営業日以内に元のお支払い方法にクレジットが適用されます。</p>
                <p className="mb-2">一部返金：元の状態でない場合、当社の過失によらない破損や部品の欠品がある場合など、一部返金のみとなる場合があります。</p>
                <p className="font-bold mb-1">0.3 交換</p>
                <p className="mb-2">商品交換：不良品または破損品の場合のみ交換いたします。同じ商品への交換が必要な場合は、support@mothervegetable.comまでご連絡ください。</p>
                <p className="font-bold mb-1">0.4 配送</p>
                <p className="mb-2">返品送料：返品にかかる送料はお客様のご負担となります。送料は返金対象外です。返金を受ける場合、返品送料が返金額から差し引かれます。</p>
                <p className="mb-2">配送中の破損：配送中に商品が破損した場合は、直ちにご連絡ください。交換品の手配をいたします。</p>
                <p className="font-bold mb-1">0.5 返金対象外の商品</p>
                <p className="mb-2">セール品：通常価格の商品のみ返金対象です。セール品は返金対象外となります。</p>
                <p className="mb-2">カスタムオーダー：オーダーメイドまたはパーソナライズ商品は、不良品または破損品でない限り返金対象外です。</p>
              </div>
            </div>

            {/* 9. 配送ポリシー */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">9. 配送ポリシー</h5>
              <p className="mb-2">当社は、お客様のご購入品が迅速かつ安全にお届けされるよう努めています。配送に関する詳細は、以下の配送ポリシーをご確認ください。</p>
              <div className="pl-4">
                <p className="font-bold mb-1">0.1. 配送地域</p>
                <p className="mb-2">マレーシア国内の全州および準州（半島マレーシア、サバ、サラワクを含む）に配送いたします。</p>
                <p className="mb-2">国際配送：DHLを使用してオーストラリアへの配送も行っています。その他の国際配送先については、カスタマーサービスチームにお問い合わせください。</p>

                <p className="font-bold mb-1">0.2. 配送料金</p>
                <p className="mb-2">半島マレーシア：注文の重量とサイズに基づいた標準配送料金が適用されます。</p>
                <p className="mb-2">サバおよびサラワク：距離と物流の関係上、追加の配送料金が発生する場合があります。</p>
                <p className="mb-2">オーストラリア：オーストラリアへの配送料金は、荷物の重量、サイズ、配送先に基づいてチェックアウト時に計算されます。</p>
                <p className="mb-2">配送料金は、購入完了前のチェックアウト時に計算・表示されます。</p>

                <p className="font-bold mb-1">0.3. 配送期間</p>
                <p className="mb-1 font-bold">標準配送：</p>
                <p className="mb-1">半島マレーシア：3〜5営業日</p>
                <p className="mb-2">サバ＆サラワク：5〜7営業日</p>
                <p className="mb-1 font-bold">エクスプレス配送（利用可能な場合）：</p>
                <p className="mb-1">半島マレーシア：1〜3営業日</p>
                <p className="mb-2">サバ＆サラワク：3〜5営業日</p>
                <p className="mb-2 pt-2">オーストラリアへの配送：場所や税関処理時間に応じて5〜14営業日</p>
                <p className="mb-2">週末または祝日に行われた注文は、翌営業日に処理されます。</p>
                <p className="mb-2">配送時間は目安であり、祝日、天候、税関手続き、配送パートナーの遅延などの外部要因により異なる場合があります。</p>

                <p className="font-bold mb-1">0.4. 注文処理</p>
                <p className="mb-2">注文はお支払い確認後1〜2営業日以内に処理されます。</p>
                <p className="mb-2">注文が処理され出荷されると、配送状況を確認するための追跡番号がメール/SMSで送信されます。</p>

                <p className="font-bold mb-1">0.5. 配送パートナー</p>
                <p className="mb-2">当社は、Pos Laju、NinjaVan、DHLなどの信頼できる配送サービスと提携し、お客様の注文が迅速かつ安全に届けられるよう努めています。</p>
                <p className="mb-2">オーストラリアへの配送には、信頼性の高い国際配送を確保するためにDHLを使用しています。</p>

                <p className="font-bold mb-1">0.6. 配送に関する問題</p>
                <p className="mb-2">予定期間内に注文が届かない場合は、support@mothervegetable.comまでカスタマーサービスチームにご連絡ください。</p>
                <p className="mb-2">荷物の紛失または破損が発生した場合、配送サービスと協力して問題を解決します。破損した荷物を受け取った場合は、直ちにご連絡ください。</p>
                <p className="mb-2">配送サービス、税関、またはその他の当社の管理外の外部要因による遅延については、当社は責任を負いません。</p>

                <p className="font-bold mb-1">0.7. 住所の正確性</p>
                <p className="mb-2">注文時に配送先住所が正確かつ完全であることをご確認ください。住所の誤りや不完全さにより発生した追加料金はお客様の負担となります。</p>

                <p className="font-bold mb-1">0.8. 再配送料金</p>
                <p className="mb-2">受取人の不在により配送が失敗した場合、再配送に追加料金が発生する場合があります。</p>
              </div>
            </div>

            {/* 10. コンテンツ */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">10. コンテンツ</h5>
              <p className="mb-2">本サービス上またはサービスを通じて見つかるコンテンツは、マザーベジタブルの所有物であるか、許可を得て使用しています。当社からの事前の書面による明示的な許可なく、商業目的または個人的な利益のために、当該コンテンツの全部または一部を配布、修正、送信、再利用、ダウンロード、再投稿、コピー、または使用することはできません。</p>
            </div>

            {/* 11. 禁止事項 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">11. 禁止事項</h5>
              <p className="mb-2">お客様は、合法的な目的のためにのみ、規約に従ってサービスを使用できます。以下の行為でのサービスの使用に同意しないものとします：</p>
              <div className="pl-4">
                <p className="mb-1">0.1. 適用される国内または国際的な法律や規制に違反する方法での使用</p>
                <p className="mb-1">0.2. 不適切なコンテンツへの露出などにより、未成年者を搾取、害する、または搾取・危害を試みる目的での使用</p>
                <p className="mb-1">0.3. 「ジャンクメール」、「チェーンレター」、「スパム」、またはその他の類似の勧誘を含む広告やプロモーション資料の送信または送信の手配</p>
                <p className="mb-1">0.4. 当社、当社の従業員、他のユーザー、またはその他の個人・団体になりすますまたはなりすまそうとする行為</p>
                <p className="mb-1">0.5. 他者の権利を侵害する方法、または違法、脅迫的、詐欺的、もしくは有害な方法、またはそのような目的・活動に関連する使用</p>
                <p className="mb-2">0.6. 他者のサービスの利用や享受を制限・阻害する行為、または当社の判断により、当社やサービスのユーザーに害を与え、不快にさせ、または責任を負わせる可能性のある行為</p>
                <p className="mb-2">さらに、以下の行為を行わないことに同意するものとします：</p>
                <p className="mb-1">0.1. サービスを無効化、過負荷、損傷させる、またはリアルタイム活動を含む他者のサービス利用を妨害する方法での使用</p>
                <p className="mb-1">0.2. サービス上の資料の監視やコピーを含む目的で、ロボット、スパイダー、またはその他の自動化されたデバイス、プロセス、手段を使用してサービスにアクセスする行為</p>
                <p className="mb-1">0.3. 事前の書面による同意なく、手動プロセスを使用してサービス上の資料を監視またはコピーする行為</p>
                <p className="mb-1">0.4. サービスの適切な動作を妨害するデバイス、ソフトウェア、またはルーチンの使用</p>
                <p className="mb-1">0.5. ウイルス、トロイの木馬、ワーム、ロジックボム、またはその他の悪意のあるもしくは技術的に有害な素材の導入</p>
                <p className="mb-1">0.6. サービス、サービスが保存されているサーバー、またはサービスに接続されたサーバー、コンピュータ、データベースの一部への不正アクセス、干渉、損傷、または妨害の試み</p>
                <p className="mb-1">0.7. サービスダウン攻撃または分散型サービスダウン攻撃によるサービスへの攻撃</p>
                <p className="mb-1">0.8. 当社の評価を損なうまたは偽造する可能性のある行為</p>
                <p className="mb-1">0.9. その他、サービスの適切な動作を妨害する試み</p>
              </div>
            </div>

            {/* 12. アナリティクス */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">12. アナリティクス</h5>
              <p className="mb-2">当社は、サービスの利用状況を監視・分析するために、第三者のサービスプロバイダーを使用する場合があります。</p>
            </div>

            {/* 13. 未成年者の使用禁止 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">13. 未成年者の使用禁止</h5>
              <p className="mb-2">サービスは、18歳以上の個人のみがアクセスおよび使用することを意図しています。サービスにアクセスまたは使用することにより、お客様は少なくとも18歳以上であり、本契約を締結し規約のすべての条件に従う完全な権限、権利、および能力を有することを保証し表明するものとします。18歳未満の方は、サービスへのアクセスおよび使用が禁止されています。</p>
            </div>

            {/* 14. アカウント */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">14. アカウント</h5>
              <p className="mb-2">当社でアカウントを作成する場合、お客様は18歳以上であること、および当社に提供する情報が常に正確、完全、かつ最新であることを保証するものとします。不正確、不完全、または古い情報は、サービス上のアカウントの即時終了につながる場合があります。</p>
              <p className="mb-2">お客様は、コンピュータおよび/またはアカウントへのアクセスの制限を含むがこれに限定されない、アカウントおよびパスワードの機密性を維持する責任を負います。お客様は、当社のサービスまたは第三者のサービスを問わず、アカウントおよび/またはパスワードの下で行われるすべての活動または行為について責任を負うことに同意するものとします。セキュリティ侵害またはアカウントの不正使用に気づいた場合は、直ちに当社に通知する必要があります。</p>
              <p className="mb-2">他の個人または団体の名前、適切な承認なく他の個人または団体の権利の対象となる名前や商標、法的に使用できない名前、または不快、下品、卑猥な名前をユーザー名として使用することはできません。</p>
              <p className="mb-2">当社は、独自の裁量で、サービスの拒否、アカウントの終了、コンテンツの削除または編集、注文のキャンセルを行う権利を留保します。</p>
            </div>

            {/* 15. 知的財産権 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">15. 知的財産権</h5>
              <p className="mb-2">サービスおよびその独自のコンテンツ（ユーザーが提供するコンテンツを除く）、機能、および機能性は、マザーベジタブルおよびそのライセンサーの独占的財産であり、今後もそうであり続けます。サービスは、著作権法、商標法、およびその他の法律によって保護されています。当社の商標は、マザーベジタブルの事前の書面による同意なく、いかなる製品やサービスに関連して使用することはできません。</p>
            </div>

            {/* 16. 著作権ポリシー */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">16. 著作権ポリシー</h5>
              <p className="mb-2">当社は他者の知的財産権を尊重します。サービスに投稿されたコンテンツが個人または団体の著作権またはその他の知的財産権（「侵害」）を侵害するとの申立てに対応することが当社のポリシーです。</p>
              <p className="mb-2">お客様が著作権所有者であるか、その代理人として承認されており、著作権で保護された作品が著作権侵害に該当する方法でコピーされたと信じる場合は、support@mothervegetable.comまでメールでクレームを提出してください。件名に「著作権侵害」と記載し、以下の「DMCA通知および著作権侵害の申立て手続き」に詳述されている侵害の詳細な説明を含めてください。</p>
              <p className="mb-2">サービス上で発見されたコンテンツの著作権侵害に関する虚偽または悪意のある申立てについては、損害賠償（費用および弁護士費用を含む）の責任を負う場合があります。</p>
            </div>

            {/* 17. DMCA通知 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">17. DMCA通知および著作権侵害の申立て手続き</h5>
              <p className="mb-2">デジタルミレニアム著作権法（DMCA）に基づく通知を提出するには、当社の著作権代理人に以下の情報を書面で提供してください（詳細は17 U.S.C 512(c)(3)を参照）：</p>
              <div className="pl-4">
                <p className="mb-1">0.1. 著作権所有者の利益のために行動する権限を有する者の電子的または物理的な署名</p>
                <p className="mb-1">0.2. 侵害されたと主張する著作権で保護された作品の説明（著作権で保護された作品が存在する場所のURLまたは著作権で保護された作品のコピーを含む）</p>
                <p className="mb-1">0.3. 侵害していると主張する素材がサービス上に存在するURLまたはその他の特定の場所の識別</p>
                <p className="mb-1">0.4. お客様の住所、電話番号、およびメールアドレス</p>
                <p className="mb-1">0.5. 争われている使用が著作権所有者、その代理人、または法律によって承認されていないという誠実な信念をお客様が有するという声明</p>
                <p className="mb-1">0.6. 通知に記載された上記の情報が正確であり、お客様が著作権所有者であるか著作権所有者に代わって行動する権限を有するという、偽証罪の罰則の下での声明</p>
              </div>
            </div>

            {/* 18. エラー報告とフィードバック */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">18. エラー報告とフィードバック</h5>
              <p className="mb-2">support@mothervegetable.comに直接、または第三者のサイトやツールを通じて、エラー、改善提案、アイデア、問題、苦情、およびサービスに関するその他の事項についての情報やフィードバック（「フィードバック」）を提供することができます。</p>
              <p className="mb-2">お客様は以下を承認し同意するものとします：</p>
              <div className="pl-4">
                <p className="mb-1">(i) フィードバックに関する知的財産権またはその他の権利、権原、利益を保持、取得、または主張しないこと</p>
                <p className="mb-1">(ii) 当社がフィードバックと類似の開発アイデアを有する場合があること</p>
                <p className="mb-1">(iii) フィードバックにお客様または第三者の機密情報または独自情報が含まれていないこと</p>
                <p className="mb-1">(iv) 当社はフィードバックに関して秘密保持義務を負わないこと。適用される強行法規によりフィードバックの所有権の移転が不可能な場合、お客様は当社およびその関連会社に対し、フィードバックをあらゆる方法であらゆる目的で使用（コピー、修正、派生物の作成、公開、配布、商業化を含む）する独占的、譲渡可能、取消不能、無償、サブライセンス可能、無制限かつ永久的な権利を付与するものとします。</p>
              </div>
            </div>

            {/* 19. 他のウェブサイトへのリンク */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">19. 他のウェブサイトへのリンク</h5>
              <p className="mb-2">当社のサービスには、マザーベジタブルが所有または管理しない第三者のウェブサイトまたはサービスへのリンクが含まれている場合があります。</p>
              <p className="mb-2">マザーベジタブルは、第三者のウェブサイトまたはサービスのコンテンツ、プライバシーポリシー、または慣行について、管理権限を持たず、責任を負いません。これらの団体/個人またはそのウェブサイトの提供内容を保証しません。</p>
              <p className="mb-2">お客様は、かかる第三者のウェブサイトまたはサービスで利用可能なコンテンツ、商品、またはサービスの使用または依拠に起因または関連して直接的または間接的に生じた損害または損失について、当社が責任を負わないことを認め同意するものとします。</p>
              <p className="mb-2">訪問する第三者のウェブサイトまたはサービスの利用規約およびプライバシーポリシーをお読みになることを強くお勧めします。</p>
            </div>

            {/* 20. 保証の免責 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">20. 保証の免責</h5>
              <p className="mb-2">これらのサービスは、当社により「現状のまま」および「利用可能な状態で」提供されます。当社は、サービスの運営、またはそこに含まれる情報、コンテンツ、もしくは素材について、明示的または黙示的を問わず、いかなる表明または保証も行いません。お客様は、これらのサービス、そのコンテンツ、および当社から取得したサービスまたは商品の使用が、お客様自身のリスクにおいて行われることに明示的に同意するものとします。</p>
              <p className="mb-2">当社および当社に関連するいかなる者も、サービスの完全性、セキュリティ、信頼性、品質、正確性、または可用性に関して保証または表明を行いません。当社および当社に関連するいかなる者も、サービス、そのコンテンツ、またはサービスを通じて取得したサービスもしくは商品が、正確、信頼性があり、エラーのない、または中断のないものであること、欠陥が修正されること、サービスまたはそれを利用可能にするサーバーがウイルスまたはその他の有害なコンポーネントを含まないこと、またはサービスまたはそれを通じて取得したサービスもしくは商品がお客様のニーズや期待を満たすことを表明または保証しません。</p>
              <p className="mb-2">当社は、明示的、黙示的、法定的、またはその他を問わず、商品性、非侵害性、特定目的への適合性の保証を含むがこれらに限定されないすべての保証を免責します。</p>
              <p className="mb-2">上記は、適用法で除外または制限できない保証には影響しません。</p>
            </div>

            {/* 21. 責任の制限 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">21. 責任の制限</h5>
              <p className="mb-2">法律で禁止されている場合を除き、お客様は、本契約に起因または関連して生じた間接的、懲罰的、特別、付随的、または結果的損害（弁護士費用および訴訟・仲裁に関連するすべての費用を含む）について、当社ならびに当社の役員、取締役、従業員、および代理人を免責するものとします。これは、連邦法、州法、地方自治体の法律、法令、規則の違反に起因するものを含みます。法律で禁止されている場合を除き、当社に責任がある場合、それは製品および/またはサービスに対して支払われた金額に限定され、いかなる場合も結果的または懲罰的損害賠償はありません。</p>
            </div>

            {/* 22. 終了 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">22. 終了</h5>
              <p className="mb-2">当社は、規約の違反を含むがこれに限定されない、いかなる理由においても、独自の裁量で、事前の通知または責任なく、直ちにお客様のアカウントを終了または停止し、サービスへのアクセスを禁止する場合があります。</p>
              <p className="mb-2">アカウントの終了を希望する場合は、サービスの使用を中止するだけで構いません。</p>
              <p className="mb-2">その性質上、終了後も存続すべき規約のすべての条項は、所有権の規定、保証の免責、補償および責任の制限を含むがこれに限定されず、終了後も存続するものとします。</p>
            </div>

            {/* 23. 準拠法 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">23. 準拠法</h5>
              <p className="mb-2">本規約は、マレーシアの法律に準拠し、解釈されるものとし、法の抵触に関する規定にかかわらず適用されます。</p>
              <p className="mb-2">本規約のいかなる権利または条項の行使を怠った場合でも、それらの権利の放棄とはみなされません。本規約のいかなる条項が裁判所により無効または執行不能と判断された場合でも、本規約の残りの条項は引き続き有効です。本規約は、当社のサービスに関するお客様と当社との完全な合意を構成し、サービスに関する以前の合意に取って代わります。</p>
            </div>

            {/* 24. サービスの変更 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">24. サービスの変更</h5>
              <p className="mb-2">当社は、独自の裁量で、予告なくサービスおよびサービスを通じて提供する資料を撤回または修正する権利を留保します。サービスの全部または一部がいかなる時点または期間において利用できなくなった場合でも、当社は責任を負いません。随時、登録ユーザーを含むユーザーに対して、サービスの一部またはサービス全体へのアクセスを制限する場合があります。</p>
            </div>

            {/* 25. 規約の修正 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">25. 規約の修正</h5>
              <p className="mb-2">当社は、このサイトに修正された規約を掲載することにより、いつでも規約を修正できます。これらの規約を定期的に確認することはお客様の責任です。</p>
              <p className="mb-2">改訂された規約の掲載後にプラットフォームを継続して使用することは、変更を受け入れ同意することを意味します。変更はお客様を拘束するため、このページを頻繁に確認することが期待されます。</p>
              <p className="mb-2">改訂が有効になった後も当社のサービスにアクセスまたは使用し続けることにより、お客様は改訂された規約に拘束されることに同意するものとします。新しい規約に同意しない場合、サービスの使用は認められなくなります。</p>
            </div>

            {/* 26. 権利放棄と可分性 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">26. 権利放棄と可分性</h5>
              <p className="mb-2">規約に定めるいかなる条件の放棄も、当該条件の継続的な放棄またはその他の条件の放棄とはみなされず、規約に基づく権利または条項の行使を怠った場合でも、当該権利または条項の放棄とはなりません。</p>
              <p className="mb-2">規約のいかなる条項が管轄権を有する裁判所またはその他の法廷により無効、違法、または執行不能と判断された場合、当該条項は、規約の残りの条項が完全に効力を維持するよう、排除または最小限に制限されるものとします。</p>
            </div>

            {/* 27. 確認 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">27. 確認</h5>
              <p className="mb-2">サービスまたは当社が提供するその他のサービスを使用することにより、お客様は本利用規約を読み、これに拘束されることに同意したことを認めるものとします。</p>
            </div>

            {/* 28. お問い合わせ */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">28. お問い合わせ</h5>
              <p className="mb-2">フィードバック、コメント、技術サポートのリクエストは、メールでお送りください：<strong>support@mothervegetable.com</strong></p>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-bold text-2xl md:text-3xl text-[#25C760] mb-2">
              <b>TERMS AND CONDITIONS</b>
            </h2>
            <p className="mb-6" style={{ fontFamily: 'Gilroy, sans-serif' }}>Last updated: 2025-11-04</p>

            {/* 1. Introduction */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">1. Introduction</h5>
              <p className="mb-2">Welcome to <strong>Mother Vegetable</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)! These Terms of Service (&ldquo;Terms&rdquo;, &ldquo;Terms of Service&rdquo;) govern your use of our website located at <strong>https://www.mothervegetable.com</strong> (together or individually &ldquo;Service&rdquo;) operated by <strong>Mother Vegetable</strong>. Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.</p>
              <p className="mb-2">Your agreement with us includes these Terms and our Privacy Policy (&ldquo;Agreements&rdquo;). You acknowledge that you have read and understood Agreements, and agree to be bound of them.</p>
              <p className="mb-2">If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at <strong>support@mothervegetable.com</strong> so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.</p>
            </div>

            {/* 2. Communications */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">2. Communications</h5>
              <p className="mb-2">By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at support@mothervegetable.com.</p>
            </div>

            {/* 3. Purchases */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">3. Purchases</h5>
              <p className="mb-2">If you wish to purchase any product or service made available through Service (&ldquo;Purchase&rdquo;), you may be asked to supply certain information relevant to your Purchase including but not limited to, your credit or debit card number, the expiration date of your card, your billing address, and your shipping information.</p>
              <p className="mb-2">You represent and warrant that: (i) you have the legal right to use any card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.</p>
              <p className="mb-2">We may employ the use of third party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</p>
              <p className="mb-2">We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.</p>
              <p className="mb-2">We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>
            </div>

            {/* 4. Contests, Sweepstakes and Promotions */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">4. Contests, Sweepstakes and Promotions</h5>
              <p className="mb-2">Any contests, sweepstakes, or other promotions (collectively, &ldquo;Promotions&rdquo;) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.</p>
            </div>

            {/* 5. Subscriptions */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">5. Subscriptions</h5>
              <p className="mb-2">Some parts of Service are billed on a subscription basis (&quot;Subscription(s)&quot;). You will be billed in advance on a recurring and periodic basis (&quot;Billing Cycle&quot;). Billing cycles will be set depending on the type of subscription plan you select when purchasing a Subscription.</p>
              <p className="mb-2">At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Mother Vegetable cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting support@mothervegetable.com customer support team.</p>
              <p className="mb-2">A valid payment method is required to process the payment for your subscription. You shall provide Mother Vegetable with accurate and complete billing information that may include but not be limited to full name, address, state, postal or zip code, telephone number, and valid payment method information. By submitting such payment information, you automatically authorize Mother Vegetable to charge all Subscription fees incurred through your account to any such payment instruments.</p>
              <p className="mb-2">Should automatic billing fail to occur for any reason, Mother Vegetable reserves the right to terminate your access to the Service with immediate effect.</p>
            </div>

            {/* 6. Free Trial */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">6. Free Trial</h5>
              <p className="mb-2">Mother Vegetable may, at its sole discretion, offer a Subscription with a free trial for a limited period of time (&quot;Free Trial&quot;).</p>
              <p className="mb-2">You may be required to enter your billing information in order to sign up for Free Trial.</p>
              <p className="mb-2">If you do enter your billing information when signing up for Free Trial, you will not be charged by Mother Vegetable until Free Trial has expired. On the last day of the Free Trial period, unless you cancel your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.</p>
              <p className="mb-2">At any time and without notice, Mother Vegetable reserves the right to (i) modify Terms of Service of Free Trial offer, or (ii) cancel such Free Trial offer.</p>
            </div>

            {/* 7. Fee Changes */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">7. Fee Changes</h5>
              <p className="mb-2">Mother Vegetable, in its sole discretion and at any time, may modify Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.</p>
              <p className="mb-2">Mother Vegetable will provide you with reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>
              <p className="mb-2">Your continued use of Service after Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>
            </div>

            {/* 8. Refund Policy */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">8. Refund Policy</h5>
              <p className="mb-2">We strive to provide our customers with the best products and services. If you are not entirely satisfied with your purchase, we&rsquo;re here to help. Please read our refund policy carefully.</p>
              <div className="pl-4">
                <p className="font-bold mb-1">0.1 Returns:</p>
                <p className="mb-2">Eligibility: You have 14 days from the date of purchase to request a return. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. Certain items, such as perishable goods, personal care items, and digital products, are non-returnable.</p>
                <p className="mb-2">Proof of Purchase: A valid receipt or proof of purchase is required to process a return.</p>
                <p className="font-bold mb-1">0.2 Refunds:</p>
                <p className="mb-2">Process: Once we receive your returned item, we will inspect it and notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within 14 business days.</p>
                <p className="mb-2">Partial Refunds: In some cases, only partial refunds are granted, such as for items that are not in their original condition, damaged, or missing parts for reasons not due to our error.</p>
                <p className="font-bold mb-1">0.3 Exchanges</p>
                <p className="mb-2">Product Exchange: We only replace items if they are defective or damaged. If you need to exchange it for the same item, please contact us at support@mothervegetable.com</p>
                <p className="font-bold mb-1">0.4 Shipping</p>
                <p className="mb-2">Return Shipping: You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                <p className="mb-2">Shipping Damage: If the item was damaged during shipping, please contact us immediately so we can arrange a replacement.</p>
                <p className="font-bold mb-1">0.5 Non-Refundable Items</p>
                <p className="mb-2">Sale Items: Only regular-priced items may be refunded; unfortunately, sale items cannot be refunded.</p>
                <p className="mb-2">Custom Orders: Custom-made orders or personalized items are non-refundable unless they are defective or damaged.</p>
              </div>
            </div>

            {/* 9. Delivery Policy */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">9. Delivery Policy</h5>
              <p className="mb-2">We are committed to ensuring that your purchases reach you in a timely and secure manner. Please review our delivery policy for more information on shipping and handling.</p>
              <div className="pl-4">
                <p className="font-bold mb-1">0.1. Delivery Areas</p>
                <p className="mb-2">We deliver to all states and territories within Malaysia, including Peninsular Malaysia, Sabah, and Sarawak.</p>
                <p className="mb-2">International Deliveries: We also offer delivery to Australia using DHL. For other international destinations, please contact our customer service team for more information.</p>

                <p className="font-bold mb-1">0.2. Delivery Charges</p>
                <p className="mb-2">Peninsular Malaysia: Standard delivery charges apply based on the weight and dimensions of your order.</p>
                <p className="mb-2">Sabah and Sarawak: Additional delivery charges may apply due to the distance and logistics involved.</p>
                <p className="mb-2">Australia: Delivery charges for orders to Australia will be calculated at checkout based on the weight, dimensions, and destination of the package.</p>
                <p className="mb-2">Delivery charges will be calculated and displayed at checkout before you complete your purchase.</p>

                <p className="font-bold mb-1">0.3. Delivery Timeframes</p>
                <p className="mb-1 font-bold">Standard Delivery:</p>
                <p className="mb-1">Peninsular Malaysia: 3-5 business days.</p>
                <p className="mb-2">Sabah &amp; Sarawak: 5-7 business days.</p>
                <p className="mb-1 font-bold">Express Delivery (Where available):</p>
                <p className="mb-1">Peninsular Malaysia: 1-3 business days.</p>
                <p className="mb-2">Sabah &amp; Sarawak: 3-5 business days.</p>
                <p className="mb-2 pt-2">Australia Delivery: 5-14 business days, depending on the location and customs processing times.</p>
                <p className="mb-2">Orders placed on weekends or public holidays will be processed on the next business day.</p>
                <p className="mb-2">Delivery times are estimated and may vary based on external factors, such as public holidays, weather conditions, customs clearance, or courier partner delays.</p>

                <p className="font-bold mb-1">0.4. Order Processing</p>
                <p className="mb-2">Orders are processed within 1-2 business days upon receipt of payment.</p>
                <p className="mb-2">Once your order has been processed and shipped, you will receive a tracking number via email/SMS to monitor the delivery status.</p>

                <p className="font-bold mb-1">0.5. Delivery Partners</p>
                <p className="mb-2">We collaborate with reputable courier services, such as Pos Laju, NinjaVan, DHL, and others, to ensure your order is delivered promptly and securely.</p>
                <p className="mb-2">For deliveries to Australia, we use DHL to ensure reliable and timely international shipping.</p>

                <p className="font-bold mb-1">0.6. Delivery Issues</p>
                <p className="mb-2">If your order does not arrive within the expected timeframe, please contact our customer service team at support@mothervegetable.com.</p>
                <p className="mb-2">In the event of a lost or damaged parcel, we will work with the courier service to resolve the issue. Please notify us immediately if you receive a damaged package.</p>
                <p className="mb-2">We are not responsible for delays caused by courier services, customs, or other external factors beyond our control.</p>

                <p className="font-bold mb-1">0.7. Address Accuracy</p>
                <p className="mb-2">Please ensure that your delivery address is accurate and complete when placing your order. Any additional charges incurred due to incorrect or incomplete addresses will be the responsibility of the customer.</p>

                <p className="font-bold mb-1">0.8. Redelivery Charges</p>
                <p className="mb-2">If a delivery attempt is unsuccessful due to the recipient&rsquo;s unavailability, additional charges may apply for redelivery.</p>
              </div>
            </div>

            {/* 10. Content */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">10. Content</h5>
              <p className="mb-2">Content found on or through this Service are the property of Mother Vegetable or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.</p>
            </div>

            {/* 11. Prohibited Uses */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">11. Prohibited Uses</h5>
              <p className="mb-2">You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
              <div className="pl-4">
                <p className="mb-1">0.1. In any way that violates any applicable national or international law or regulation.</p>
                <p className="mb-1">0.2. For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</p>
                <p className="mb-1">0.3. To transmit, or procure the sending of, any advertising or promotional material, including any &ldquo;junk mail&rdquo;, &ldquo;chain letter,&rdquo; &ldquo;spam,&rdquo; or any other similar solicitation.</p>
                <p className="mb-1">0.4. To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</p>
                <p className="mb-1">0.5. In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</p>
                <p className="mb-2">0.6. To engage in any other conduct that restricts or inhibits anyone&rsquo;s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.</p>
                <p className="mb-2">Additionally, you agree not to:</p>
                <p className="mb-1">0.1. Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party&rsquo;s use of Service, including their ability to engage in real-time activities through Service.</p>
                <p className="mb-1">0.2. Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.</p>
                <p className="mb-1">0.3. Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.</p>
                <p className="mb-1">0.4. Use any device, software, or routine that interferes with the proper working of Service.</p>
                <p className="mb-1">0.5. Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</p>
                <p className="mb-1">0.6. Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.</p>
                <p className="mb-1">0.7. Attack Service via a denial-of-service attack or a distributed denial-of-service attack.</p>
                <p className="mb-1">0.8. Take any action that may damage or falsify Company rating.</p>
                <p className="mb-1">0.9. Otherwise attempt to interfere with the proper working of Service.</p>
              </div>
            </div>

            {/* 12. Analytics */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">12. Analytics</h5>
              <p className="mb-2">We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
            </div>

            {/* 13. No Use By Minors */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">13. No Use By Minors</h5>
              <p className="mb-2">Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.</p>
            </div>

            {/* 14. Accounts */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">14. Accounts</h5>
              <p className="mb-2">When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.</p>
              <p className="mb-2">You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
              <p className="mb-2">You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar, or obscene.</p>
              <p className="mb-2">We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in our sole discretion.</p>
            </div>

            {/* 15. Intellectual Property */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">15. Intellectual Property</h5>
              <p className="mb-2">Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Mother Vegetable and its licensors. Service is protected by copyright, trademark, and other laws of and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of Mother Vegetable.</p>
            </div>

            {/* 16. Copyright Policy */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">16. Copyright Policy</h5>
              <p className="mb-2">We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (&ldquo;Infringement&rdquo;) of any person or entity.</p>
              <p className="mb-2">If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to support@mothervegetable.com, with the subject line: &ldquo;Copyright Infringement&rdquo; and include in your claim a detailed description of the alleged Infringement as detailed below, under &ldquo;DMCA Notice and Procedure for Copyright Infringement Claims&rdquo;</p>
              <p className="mb-2">You may be held accountable for damages (including costs and attorneys&rsquo; fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.</p>
            </div>

            {/* 17. DMCA Notice */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">17. DMCA Notice and Procedure for Copyright Infringement Claims</h5>
              <p className="mb-2">You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>
              <div className="pl-4">
                <p className="mb-1">0.1. an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright&rsquo;s interest;</p>
                <p className="mb-1">0.2. a description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work;</p>
                <p className="mb-1">0.3. identification of the URL or other specific location on Service where the material that you claim is infringing is located;</p>
                <p className="mb-1">0.4. your address, telephone number, and email address;</p>
                <p className="mb-1">0.5. a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;</p>
                <p className="mb-1">0.6. a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner&rsquo;s behalf.</p>
              </div>
            </div>

            {/* 18. Error Reporting and Feedback */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">18. Error Reporting and Feedback</h5>
              <p className="mb-2">You may provide us either directly at support@mothervegetable.com or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (&ldquo;Feedback&rdquo;).</p>
              <p className="mb-2">You acknowledge and agree that:</p>
              <div className="pl-4">
                <p className="mb-1">(i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback;</p>
                <p className="mb-1">(ii) Company may have development ideas similar to the Feedback;</p>
                <p className="mb-1">(iii) Feedback does not contain confidential information or proprietary information from you or any third party; and</p>
                <p className="mb-1">(iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.</p>
              </div>
            </div>

            {/* 19. Links To Other Web Sites */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">19. Links To Other Web Sites</h5>
              <p className="mb-2">Our Service may contain links to third party web sites or services that are not owned or controlled by Mother Vegetable.</p>
              <p className="mb-2">Mother Vegetable has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.</p>
              <p className="mb-2">YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.</p>
              <p className="mb-2">WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.</p>
            </div>

            {/* 20. Disclaimer Of Warranty */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">20. Disclaimer Of Warranty</h5>
              <p className="mb-2">THESE SERVICES ARE PROVIDED BY COMPANY ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.</p>
              <p className="mb-2">NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</p>
              <p className="mb-2">COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
              <p className="mb-2">THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</p>
            </div>

            {/* 21. Limitation Of Liability */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">21. Limitation Of Liability</h5>
              <p className="mb-2">EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS&rsquo; FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.</p>
            </div>

            {/* 22. Termination */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">22. Termination</h5>
              <p className="mb-2">We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.</p>
              <p className="mb-2">If you wish to terminate your account, you may simply discontinue using Service.</p>
              <p className="mb-2">All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
            </div>

            {/* 23. Governing Law */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">23. Governing Law</h5>
              <p className="mb-2">These Terms shall be governed and construed in accordance with the laws of Malaysia, which governing law applies to agreement without regard to its conflict of law provisions.</p>
              <p className="mb-2">Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.</p>
            </div>

            {/* 24. Changes To Service */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">24. Changes To Service</h5>
              <p className="mb-2">We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.</p>
            </div>

            {/* 25. Amendments To Terms */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">25. Amendments To Terms</h5>
              <p className="mb-2">We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.</p>
              <p className="mb-2">Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</p>
              <p className="mb-2">By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.</p>
            </div>

            {/* 26. Waiver And Severability */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">26. Waiver And Severability</h5>
              <p className="mb-2">No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.</p>
              <p className="mb-2">If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.</p>
            </div>

            {/* 27. Acknowledgement */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">27. Acknowledgement</h5>
              <p className="mb-2">BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>
            </div>

            {/* 28. Contact Us */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">28. Contact Us</h5>
              <p className="mb-2">Please send your feedback, comments, requests for technical support by email: <strong>support@mothervegetable.com</strong></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
