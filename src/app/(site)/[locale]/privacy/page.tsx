import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Mother Vegetable privacy policy. Learn how we collect, use, and protect your personal data.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Privacy Policy — Mother Vegetable',
    description: 'Mother Vegetable privacy policy. Learn how we collect, use, and protect your personal data.',
    images: [{ url: '/cdn/products_achieve_10001.png', width: 800, height: 800, alt: 'Mother Vegetable' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Mother Vegetable',
    description: 'Mother Vegetable privacy policy. Learn how we collect, use, and protect your personal data.',
  },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isJa = locale === 'ja';

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1000px] mx-auto px-3" style={{ color: 'white', textAlign: 'justify' }}>
        {isJa ? (
          <>
            <h2 className="font-bold text-2xl md:text-3xl text-[#25C760] mb-2">
              <strong>プライバシーポリシー</strong>
            </h2>
            <p className="mb-6" style={{ fontFamily: 'Gilroy, sans-serif' }}>施行日: 2025年11月4日</p>

            {/* 1. はじめに */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">1. はじめに</h5>
              <p className="mb-2"><strong>マザーベジタブル</strong>（以下「当社」）へようこそ。</p>
              <p className="mb-2"><strong>マザーベジタブル</strong>（「当社」、「私たち」）は <strong>https://www.mothervegetable.com</strong>（以下「サービス」）を運営しています。</p>
              <p className="mb-2">本プライバシーポリシーは、当サービスへのアクセスおよびご利用に際して、当社が情報をどのように収集、保護、開示するかを説明するものです。</p>
              <p className="mb-2">当社はお客様のデータをサービスの提供および改善のために使用します。サービスを利用することにより、お客様は本ポリシーに従った情報の収集および使用に同意するものとします。本プライバシーポリシーで別途定義されていない限り、本ポリシーで使用される用語は利用規約と同じ意味を持ちます。</p>
              <p className="mb-2">当社の利用規約（「規約」）はサービスのすべての利用を規定し、プライバシーポリシーとともにお客様と当社との合意（「契約」）を構成します。</p>
            </div>

            {/* 2. 定義 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">2. 定義</h5>
              <p className="mb-2"><strong>サービス</strong>とは、マザーベジタブルが運営するhttps://www.mothervegetable.comウェブサイトを意味します。</p>
              <p className="mb-2"><strong>個人データ</strong>とは、そのデータから（またはそのデータと当社が保有する、もしくは保有する可能性のある他の情報と合わせて）識別可能な生存する個人に関するデータを意味します。</p>
              <p className="mb-2"><strong>利用データ</strong>とは、サービスの利用により自動的に生成される、またはサービスインフラストラクチャ自体から収集されるデータ（例：ページ閲覧の期間）を意味します。</p>
              <p className="mb-2"><strong>Cookie</strong>とは、お客様のデバイス（コンピュータまたはモバイルデバイス）に保存される小さなファイルです。</p>
              <p className="mb-2"><strong>データ管理者</strong>とは、個人データが処理される目的および方法を（単独で、または他の者と共同で）決定する自然人または法人を意味します。本プライバシーポリシーの目的上、当社はお客様のデータのデータ管理者です。</p>
              <p className="mb-2"><strong>データ処理者（またはサービスプロバイダー）</strong>とは、データ管理者に代わってデータを処理する自然人または法人を意味します。当社は、お客様のデータをより効果的に処理するために、さまざまなサービスプロバイダーのサービスを利用する場合があります。</p>
              <p className="mb-2"><strong>データ主体</strong>とは、個人データの対象である生存する個人を意味します。</p>
              <p className="mb-2"><strong>ユーザー</strong>とは、当社のサービスを利用する個人を意味します。ユーザーは、個人データの対象であるデータ主体に該当します。</p>
            </div>

            {/* 3. 情報の収集と利用 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">3. 情報の収集と利用</h5>
              <p className="mb-2">当社は、お客様へのサービスの提供および改善のために、さまざまな目的で複数の種類の情報を収集します。</p>
            </div>

            {/* 4. 収集するデータの種類 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">4. 収集するデータの種類</h5>

              <div className="pl-4 pt-5">
                <p className="mb-2"><strong>個人データ</strong></p>
                <p className="mb-2">当社のサービスを利用する際、お客様に連絡または識別するために使用できる特定の個人識別情報（「個人データ」）の提供をお願いする場合があります。個人識別情報には以下が含まれますが、これらに限定されません：</p>
                <div className="pl-4">
                  <p className="mb-1">0.1 メールアドレス</p>
                  <p className="mb-1">0.2 氏名</p>
                  <p className="mb-1">0.3 電話番号</p>
                  <p className="mb-1">0.4 住所、国、都道府県、郵便番号、市区町村</p>
                  <p className="mb-1">0.5 Cookieおよび利用データ</p>
                </div>
                <p className="mb-2 mt-2">当社は、お客様にニュースレター、マーケティングまたはプロモーション資料、およびお客様の興味に関連するその他の情報を送信するために個人データを使用する場合があります。配信停止リンクに従うことで、これらの通信の一部またはすべての受信を拒否することができます。</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>利用データ</strong></p>
                <p className="mb-2">当社は、お客様がサービスにアクセスした際、またはデバイスを通じてサービスにアクセスした際に、ブラウザが送信する情報も収集する場合があります（「利用データ」）。</p>
                <p className="mb-2">この利用データには、お客様のコンピュータのインターネットプロトコルアドレス（例：IPアドレス）、ブラウザの種類、ブラウザのバージョン、訪問したサービスのページ、訪問の日時、各ページの滞在時間、一意のデバイス識別子およびその他の診断データが含まれる場合があります。</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>Cookieデータ</strong></p>
                <p className="mb-2">当社は、サービス上のアクティビティを追跡するためにCookieおよび類似の追跡技術を使用し、特定の情報を保持します。</p>
                <p className="mb-2">Cookieは、匿名の一意の識別子を含む場合がある少量のデータを持つファイルです。Cookieはウェブサイトからブラウザに送信され、デバイスに保存されます。ビーコン、タグ、スクリプトなどの追跡技術も、情報の収集・追跡およびサービスの改善・分析のために使用されます。</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>位置データ</strong></p>
                <p className="mb-2">お客様が許可した場合、当社はお客様の位置情報を使用および保存する場合があります（<strong>「位置データ」</strong>）。当社はこのデータを使用して、サービスの機能を提供し、サービスを改善・カスタマイズします。</p>
                <p className="mb-2">サービスの利用時に、デバイスの設定からいつでも位置情報サービスを有効または無効にすることができます。</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>トラッキングCookieデータ</strong></p>
                <p className="mb-2">当社は、サービス上のアクティビティを追跡するためにCookieおよび類似の追跡技術を使用し、特定の情報を保持します。</p>
                <p className="mb-2">Cookieは、匿名の一意の識別子を含む場合がある少量のデータを持つファイルです。Cookieはウェブサイトからブラウザに送信され、デバイスに保存されます。ビーコン、タグ、スクリプトなどの追跡技術も使用されます。</p>
                <p className="mb-2">ブラウザですべてのCookieを拒否するか、Cookieが送信される際に通知するよう設定できます。ただし、Cookieを受け入れない場合、サービスの一部をご利用いただけない場合があります。</p>
                <p className="mb-2">当社が使用するCookieの例：</p>
                <div className="pl-4">
                  <p className="mb-1">(i) <strong>セッションCookie：</strong>サービスの運営のためにセッションCookieを使用します。</p>
                  <p className="mb-1">(ii) <strong>設定Cookie：</strong>お客様の設定およびさまざまな設定を記憶するために設定Cookieを使用します。</p>
                  <p className="mb-1">(iii) <strong>セキュリティCookie：</strong>セキュリティ目的でセキュリティCookieを使用します。</p>
                  <p className="mb-1">(iv) <strong>広告Cookie：</strong>お客様に関連する広告を配信するために広告Cookieが使用されます。</p>
                </div>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>その他のデータ</strong></p>
                <p className="mb-2">当社のサービスを利用する際、以下の情報も収集する場合があります：性別、年齢、生年月日、出生地、パスポート情報、市民権、居住地登録および実際の住所、電話番号（勤務先、携帯電話）、教育・資格・専門研修に関する書類の詳細、雇用契約、<a href="https://policymaker.io/non-disclosure-agreement/" className="text-[#25C760] hover:text-[#3C8063]">秘密保持契約</a>、賞与および報酬に関する情報、婚姻状況、家族、社会保障（またはその他の納税者識別）番号、オフィスの所在地およびその他のデータ。</p>
              </div>
            </div>

            {/* 5. データの利用 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">5. データの利用</h5>
              <p className="mb-2">マザーベジタブルは、収集したデータをさまざまな目的で使用します：</p>
              <div className="pl-4">
                <p className="mb-1">0.1 サービスの提供および維持</p>
                <p className="mb-1">0.2 サービスの変更に関する通知</p>
                <p className="mb-1">0.3 お客様が選択した場合のサービスのインタラクティブ機能への参加の許可</p>
                <p className="mb-1">0.4 カスタマーサポートの提供</p>
                <p className="mb-1">0.5 サービスの改善に役立つ分析または貴重な情報の収集</p>
                <p className="mb-1">0.6 サービスの利用状況の監視</p>
                <p className="mb-1">0.7 技術的な問題の検出、防止、対処</p>
                <p className="mb-1">0.8 お客様が情報を提供したその他の目的の達成</p>
                <p className="mb-1">0.9 請求および回収を含む、お客様と当社との間で締結された契約から生じる義務の履行および権利の行使</p>
                <p className="mb-1">0.10 有効期限および更新通知、メール指示等を含む、アカウントおよび/またはサブスクリプションに関する通知の提供</p>
                <p className="mb-1">0.11 お客様がすでに購入または問い合わせた商品・サービスに類似する商品、サービス、イベントに関するニュース、特別オファー、一般情報の提供（受信を拒否している場合を除く）</p>
                <p className="mb-1">0.12 お客様が情報を提供する際に当社が説明するその他の方法</p>
                <p className="mb-1">0.13 お客様の同意を得たその他の目的</p>
              </div>
            </div>

            {/* 6. データの保持 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">6. データの保持</h5>
              <p className="mb-2">当社は、本プライバシーポリシーに定める目的に必要な期間のみ、お客様の個人データを保持します。当社は、法的義務の遵守（例：適用法令に従ってデータを保持する必要がある場合）、紛争の解決、法的合意およびポリシーの執行に必要な範囲で個人データを保持・使用します。</p>
              <p className="mb-2">当社は、内部分析目的で利用データも保持します。利用データは通常、より短い期間保持されますが、このデータがサービスのセキュリティ強化または機能改善に使用される場合、または法的にデータを長期間保持する義務がある場合は除きます。</p>
            </div>

            {/* 7. データの移転 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">7. データの移転</h5>
              <p className="mb-2">お客様の情報（個人データを含む）は、お客様の州、県、国、またはその他の政府管轄区域外のコンピュータに転送され、維持される場合があります。そこではデータ保護法がお客様の管轄区域と異なる場合があります。</p>
              <p className="mb-2">お客様がマレーシア国外にいる場合、当社に情報を提供することを選択した場合、当社はデータ（個人データを含む）をマレーシアに転送し、そこで処理することにご留意ください。</p>
              <p className="mb-2">本プライバシーポリシーへの同意とそのような情報の送信は、その転送へのお客様の同意を表します。</p>
              <p className="mb-2">マザーベジタブルは、お客様のデータが安全に、本プライバシーポリシーに従って取り扱われることを確保するために合理的に必要なすべての措置を講じます。お客様のデータおよびその他の個人情報のセキュリティを含む適切な管理が行われていない限り、組織または国への個人データの転送は行われません。</p>
            </div>

            {/* 8. データの開示 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">8. データの開示</h5>
              <p className="mb-2">当社は、収集した個人情報またはお客様が提供した個人情報を開示する場合があります：</p>
              <div className="pl-4">
                <p className="mb-1">0.1. <strong>法執行のための開示</strong></p>
                <p className="mb-2">特定の状況下では、法律または公的機関からの有効な要請に応じて、お客様の個人データを開示することが求められる場合があります。</p>
                <p className="mb-1">0.2. <strong>事業取引</strong></p>
                <p className="mb-2">当社または当社の子会社が合併、買収、または資産売却に関与する場合、お客様の個人データが転送される場合があります。</p>
                <p className="mb-1">0.3. <strong>その他の場合。当社は以下の場合にもお客様の情報を開示することがあります：</strong></p>
                <div className="pl-4">
                  <p className="mb-1">0.3.1. 当社の子会社および関連会社へ</p>
                  <p className="mb-1">0.3.2. 当社の事業を支援するために使用する請負業者、サービスプロバイダー、およびその他の第三者へ</p>
                  <p className="mb-1">0.3.3. お客様が情報を提供した目的を達成するため</p>
                  <p className="mb-1">0.3.4. 当社のウェブサイトにお客様の会社のロゴを掲載する目的</p>
                  <p className="mb-1">0.3.5. お客様が情報を提供する際に当社が開示するその他の目的</p>
                  <p className="mb-1">0.3.6. その他の場合にお客様の同意を得て</p>
                  <p className="mb-1">0.3.7. 当社、顧客、またはその他の者の権利、財産、または安全を保護するために開示が必要または適切であると当社が判断した場合</p>
                </div>
              </div>
            </div>

            {/* 9. データのセキュリティ */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">9. データのセキュリティ</h5>
              <p className="mb-2">お客様のデータのセキュリティは当社にとって重要ですが、インターネット上の送信方法や電子的な保存方法が100%安全であるわけではないことをご了承ください。当社はお客様の個人データを保護するために商業的に受け入れ可能な手段を使用するよう努めていますが、絶対的なセキュリティを保証することはできません。</p>
            </div>

            {/* 10. GDPRに基づくデータ保護の権利 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">10. GDPRに基づくデータ保護の権利</h5>
              <p className="mb-2">お客様が欧州連合（EU）および欧州経済領域（EEA）の居住者である場合、GDPRに基づく特定のデータ保護権を有します。</p>
              <p className="mb-2">当社は、お客様が個人データの訂正、修正、削除、または使用制限を行えるよう、合理的な措置を講じることを目指しています。</p>
              <p className="mb-2">当社が保有するお客様の個人データについて知りたい場合、または当社のシステムから削除したい場合は、<strong>support@mothervegetable.com</strong>までメールでご連絡ください。</p>
              <p className="mb-2">特定の状況下において、お客様は以下のデータ保護権を有します：</p>
              <div className="pl-4">
                <p className="mb-1">0.1 当社が保有する情報へのアクセス、更新、または削除の権利</p>
                <p className="mb-1">0.2 訂正の権利。情報が不正確または不完全である場合、訂正を求める権利</p>
                <p className="mb-1">0.3 異議申立の権利。当社による個人データの処理に異議を唱える権利</p>
                <p className="mb-1">0.4 制限の権利。個人情報の処理を制限するよう要求する権利</p>
                <p className="mb-1">0.5 データポータビリティの権利。構造化された、機械可読の一般的に使用される形式で個人データのコピーを提供される権利</p>
                <p className="mb-1">0.6 同意撤回の権利。当社がお客様の同意に基づいて個人情報を処理する場合、いつでも同意を撤回する権利</p>
              </div>
              <p className="mb-2 mt-2">当社は、かかる要求に対応する前にお客様の本人確認をお願いする場合がありますのでご了承ください。必要なデータがなければサービスを提供できない場合があります。</p>
              <p className="mb-2">お客様は、当社による個人データの収集および使用について、データ保護当局に苦情を申し立てる権利があります。詳細については、欧州経済領域（EEA）の最寄りのデータ保護当局にお問い合わせください。</p>
            </div>

            {/* 11. CalOPPAに基づくデータ保護の権利 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">11. CalOPPAに基づくデータ保護の権利</h5>
              <p className="mb-2">CalOPPAは、商用ウェブサイトおよびオンラインサービスにプライバシーポリシーの掲載を義務付ける米国初の州法です。この法律の適用範囲はカリフォルニア州をはるかに超え、カリフォルニア州の消費者から個人識別情報を収集するウェブサイトを運営する米国（および世界中の）個人または企業に、収集する情報とその共有先を正確に記載した目立つプライバシーポリシーをウェブサイトに掲載し、このポリシーを遵守することを要求します。</p>
              <p className="mb-2">CalOPPAに従い、当社は以下に同意します：</p>
              <div className="pl-4">
                <p className="mb-1">0.1. ユーザーは匿名で当サイトを訪問できます</p>
                <p className="mb-1">0.2. 当社のプライバシーポリシーのリンクには「プライバシー」という言葉が含まれ、ウェブサイトのトップページで容易に見つけることができます</p>
                <p className="mb-1">0.3. プライバシーポリシーの変更は、プライバシーポリシーページでユーザーに通知されます</p>
                <p className="mb-1">0.4. ユーザーは<strong>support@mothervegetable.com</strong>にメールすることで個人情報を変更できます</p>
              </div>
              <p className="mb-2 mt-2">「Do Not Track」信号に関する当社のポリシー：</p>
              <div className="pl-4">
                <p className="mb-2">当社はDo Not Track信号を尊重し、Do Not Trackブラウザメカニズムが設定されている場合、追跡、Cookie設置、広告配信を行いません。Do Not Trackは、ウェブサイトに追跡されたくないことを知らせるために、ウェブブラウザで設定できるプリファレンスです。</p>
                <p className="mb-2">ウェブブラウザの設定ページからDo Not Trackを有効または無効にすることができます。</p>
              </div>
            </div>

            {/* 12. CCPAに基づくデータ保護の権利 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">12. CCPAに基づくデータ保護の権利</h5>
              <p className="mb-2">カリフォルニア州の居住者である場合、当社がお客様について収集するデータを知り、データの削除を要求し、データの販売（共有）を拒否する権利があります。データ保護権を行使するために、以下の要求を行うことができます：</p>
              <p className="mb-2"><strong>0.1. 当社が保有するお客様の個人情報。この要求を行った場合、以下をお返しします：</strong></p>
              <div className="pl-4">
                <p className="mb-1">0.0.1. 収集した個人情報のカテゴリ</p>
                <p className="mb-1">0.0.2. 個人情報を収集する情報源のカテゴリ</p>
                <p className="mb-1">0.0.3. 個人情報の収集または販売のビジネスまたは商業目的</p>
                <p className="mb-1">0.0.4. 個人情報を共有する第三者のカテゴリ</p>
                <p className="mb-1">0.0.5. 収集した特定の個人情報</p>
                <p className="mb-1">0.0.6. 販売した個人情報のカテゴリリストおよび販売先の企業のカテゴリ。個人情報を販売していない場合は、その旨をお知らせします</p>
                <p className="mb-1">0.0.7. ビジネス目的で開示した個人情報のカテゴリリストおよび共有先の企業のカテゴリ</p>
              </div>
              <p className="mb-2 mt-2">この情報は、12か月のローリング期間中に2回まで要求する権利があります。この要求を行った場合、提供される情報は、過去12か月間に収集した個人情報に限定される場合があります。</p>
              <p className="mb-2">0.2. 個人情報の削除。この要求を行った場合、当社は要求日時点で保有するお客様の個人情報を記録から削除し、サービスプロバイダーにも同様の措置を指示します。場合によっては、情報の匿名化により削除が達成される場合があります。個人情報の削除を選択した場合、個人情報を必要とする特定の機能を使用できなくなる場合があります。</p>
              <p className="mb-2">0.3. 個人情報の販売停止。当社はお客様の個人情報をいかなる目的でも第三者に販売またはレンタルしません。当社は金銭的対価のために個人情報を販売しません。ただし、状況によっては、金銭的対価のない第三者への個人情報の移転、または当社グループ内での移転は、カリフォルニア州法上の「販売」とみなされる場合があります。お客様はご自身の個人データの唯一の所有者であり、いつでも開示または削除を要求できます。</p>
              <p className="mb-2">個人情報の販売停止の要求を提出した場合、当社はそのような移転を停止します。</p>
              <p className="mb-2">データの削除または販売停止を要求した場合、当社でのエクスペリエンスに影響が生じる可能性があり、個人情報の使用を必要とする特定のプログラムやメンバーシップサービスに参加できなくなる場合がありますのでご了承ください。ただし、いかなる場合も、権利の行使を理由としてお客様を差別することはありません。</p>
              <p className="mb-2">上記のカリフォルニア州データ保護権を行使するには、メールでリクエストをお送りください：<strong>support@mothervegetable.com</strong></p>
              <p className="mb-2">上記のデータ保護権は、カリフォルニア州消費者プライバシー法（CCPA）によって保護されています。詳細は、カリフォルニア州議会情報の公式ウェブサイトをご覧ください。CCPAは2020年1月1日に発効しました。</p>
            </div>

            {/* 13. サービスプロバイダー */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">13. サービスプロバイダー</h5>
              <p className="mb-2">当社は、サービスの円滑な運営（<strong>「サービスプロバイダー」</strong>）、当社に代わるサービスの提供、サービス関連業務の遂行、またはサービスの利用状況の分析支援のために、第三者の企業および個人を雇用する場合があります。</p>
              <p className="mb-2">これらの第三者は、当社に代わってこれらの業務を遂行するためにのみお客様の個人データにアクセスでき、その他の目的での開示または使用が禁止されています。</p>
            </div>

            {/* 14. アナリティクス */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">14. アナリティクス</h5>
              <p className="mb-2">当社は、サービスの利用状況を監視・分析するために、第三者のサービスプロバイダーを使用する場合があります。</p>
            </div>

            {/* 15. CI/CDツール */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">15. CI/CDツール</h5>
              <p className="mb-2">当社は、サービスの開発プロセスを自動化するために、第三者のサービスプロバイダーを使用する場合があります。</p>
            </div>

            {/* 16. 広告 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">16. 広告</h5>
              <p className="mb-2">当社は、サービスのサポートおよび維持のために、第三者のサービスプロバイダーを使用してお客様に広告を表示する場合があります。</p>
            </div>

            {/* 17. 行動リマーケティング */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">17. 行動リマーケティング</h5>
              <p className="mb-2">当社は、お客様が当社のサービスを訪問した後、第三者のウェブサイトでお客様に広告を表示するためにリマーケティングサービスを使用する場合があります。当社および第三者ベンダーは、お客様の過去のサービス訪問に基づいて広告を配信、最適化、提供するためにCookieを使用します。</p>
            </div>

            {/* 18. 決済 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">18. 決済</h5>
              <p className="mb-2">当社は、サービス内で有料の製品および/またはサービスを提供する場合があります。その場合、決済処理（例：決済プロセッサー）のために第三者のサービスを使用します。</p>
              <p className="mb-2">当社はお客様の決済カード情報を保存または収集しません。その情報は第三者の決済プロセッサーに直接提供され、お客様の個人情報の使用はそのプライバシーポリシーに準拠します。これらの決済プロセッサーは、Visa、Mastercard、American Express、Discoverなどのブランドの共同事業であるPCIセキュリティ基準審議会が管理するPCI-DSSの基準に準拠しています。PCI-DSSの要件は、決済情報の安全な取り扱いを確保するためのものです。</p>
            </div>

            {/* 19. 他サイトへのリンク */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">19. 他サイトへのリンク</h5>
              <p className="mb-2">当社のサービスには、当社が運営しない他のサイトへのリンクが含まれている場合があります。第三者のリンクをクリックすると、その第三者のサイトに移動します。訪問するすべてのサイトのプライバシーポリシーを確認することを強くお勧めします。</p>
              <p className="mb-2">当社は、第三者のサイトまたはサービスのコンテンツ、プライバシーポリシー、または慣行について、管理権限を持たず、責任を負いません。</p>
            </div>

            {/* 20. お子様のプライバシー */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">20. お子様のプライバシー</h5>
              <p className="mb-2">当社のサービスは、18歳未満のお子様（<strong>「子供」</strong>）の使用を意図していません。</p>
              <p className="mb-2">当社は、18歳未満の子供から故意に個人識別情報を収集することはありません。子供が当社に個人データを提供したことに気づいた場合は、ご連絡ください。保護者の同意の確認なしに子供から個人データを収集したことが判明した場合、当社はそれらの情報をサーバーから削除する措置を講じます。</p>
            </div>

            {/* 21. プライバシーポリシーの変更 */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">21. プライバシーポリシーの変更</h5>
              <p className="mb-2">当社は、プライバシーポリシーを随時更新する場合があります。変更がある場合は、このページに新しいプライバシーポリシーを掲載することによりお知らせします。</p>
              <p className="mb-2">変更が有効になる前に、メールおよび/またはサービス上の目立つ通知を通じてお知らせし、本プライバシーポリシーの冒頭の「施行日」を更新します。</p>
              <p className="mb-2">変更がないか定期的にプライバシーポリシーを確認することをお勧めします。プライバシーポリシーの変更は、このページに掲載された時点で有効となります。</p>
            </div>

            {/* 22. お問い合わせ */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">22. お問い合わせ</h5>
              <p className="mb-2">本プライバシーポリシーについてご質問がある場合は、メールでお問い合わせください：<strong>support@mothervegetable.com</strong></p>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-bold text-2xl md:text-3xl text-[#25C760] mb-2">
              <strong>PRIVACY POLICY</strong>
            </h2>
            <p className="mb-6" style={{ fontFamily: 'Gilroy, sans-serif' }}>Effective date: 2025-11-04</p>

            {/* 1. Introduction */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">1. Introduction</h5>
              <p className="mb-2">Welcome to <strong>Mother Vegetable</strong>.</p>
              <p className="mb-2"><strong>Mother Vegetable&nbsp;</strong>(&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;) operates <strong>https://www.mothervegetable.com</strong> (hereinafter referred to as <strong>&ldquo;Service&rdquo;</strong>).</p>
              <p className="mb-2">Our Privacy Policy governs your visit to <strong>https://www.mothervegetable.com</strong>, and explains how we collect, safeguard and disclose information that results from your use of our Service.</p>
              <p className="mb-2">We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</p>
              <p className="mb-2">Our Terms and Conditions (&ldquo;Terms&rdquo;) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (&ldquo;Agreement&rdquo;).</p>
            </div>

            {/* 2. Definitions */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">2. Definitions</h5>
              <p className="mb-2"><strong>SERVICE</strong> means the https://www.mothervegetable.com website operated by Mother Vegetable.</p>
              <p className="mb-2"><strong>PERSONAL DATA</strong> means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).</p>
              <p className="mb-2"><strong>USAGE DATA</strong> is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).</p>
              <p className="mb-2"><strong>COOKIES</strong> are small files stored on your device (computer or mobile device).</p>
              <p className="mb-2"><strong>DATA CONTROLLER</strong> means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.</p>
              <p className="mb-2"><strong>DATA PROCESSORS (OR SERVICE PROVIDERS)</strong> means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.</p>
              <p className="mb-2"><strong>DATA SUBJECT</strong> is any living individual who is the subject of Personal Data.</p>
              <p className="mb-2"><strong>THE USER</strong> is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.</p>
            </div>

            {/* 3. Information Collection and Use */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">3. Information Collection and Use</h5>
              <p className="mb-2">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            </div>

            {/* 4. Types of Data Collected */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">4. Types of Data Collected</h5>

              <div className="pl-4 pt-5">
                <p className="mb-2"><strong>Personal Data</strong></p>
                <p className="mb-2">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&ldquo;Personal Data&rdquo;). Personally identifiable information may include, but is not limited to:</p>
                <div className="pl-4">
                  <p className="mb-1">0.1 Email address</p>
                  <p className="mb-1">0.2 First name and last name</p>
                  <p className="mb-1">0.3 Phone number</p>
                  <p className="mb-1">0.4 Address, Country, State, Province, ZIP/Postal code, City</p>
                  <p className="mb-1">0.5 Cookies and Usage Data</p>
                </div>
                <p className="mb-2 mt-2">We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link.</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>Usage Data</strong></p>
                <p className="mb-2">We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through any device (&ldquo;Usage Data&rdquo;).</p>
                <p className="mb-2">This Usage Data may include information such as your computer&rsquo;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>Cookies Data</strong></p>
                <p className="mb-2">We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.</p>
                <p className="mb-2">Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>Location Data</strong></p>
                <p className="mb-2">We may use and store information about your location if you give us permission to do so (<strong>&ldquo;Location Data&rdquo;</strong>). We use this data to provide features of our Service, to improve and customize our Service.</p>
                <p className="mb-2">You can enable or disable location services when you use our Service at any time by way of your device settings.</p>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>Tracking Cookies Data</strong></p>
                <p className="mb-2">We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.</p>
                <p className="mb-2">Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.</p>
                <p className="mb-2">You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                <p className="mb-2">Examples of Cookies we use:</p>
                <div className="pl-4">
                  <p className="mb-1">(i) <strong>Session Cookies:</strong> We use Session Cookies to operate our Service.</p>
                  <p className="mb-1">(ii) <strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings.</p>
                  <p className="mb-1">(iii) <strong>Security Cookies:</strong> We use Security Cookies for security purposes.</p>
                  <p className="mb-1">(iv) <strong>Advertising Cookies:</strong> Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.</p>
                </div>
              </div>

              <div className="pl-4 pt-4">
                <p className="mb-2"><strong>Other Data</strong></p>
                <p className="mb-2">While using our Service, we may also collect the following information: sex, age, date of birth, place of birth, passport details, citizenship, registration at place of residence and actual address, telephone number (work, mobile), details of documents on education, qualification, professional training, employment agreements, <a href="https://policymaker.io/non-disclosure-agreement/" className="text-[#25C760] hover:text-[#3C8063]">NDA agreements</a>, information on bonuses and compensation, information on marital status, family members, social security (or other taxpayer identification) number, office location and other data.</p>
              </div>
            </div>

            {/* 5. Use of Data */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">5. Use of Data</h5>
              <p className="mb-2">Mother Vegetable uses the collected data for various purposes:</p>
              <div className="pl-4">
                <p className="mb-1">0.1 to provide and maintain our Service;</p>
                <p className="mb-1">0.2 to notify you about changes to our Service;</p>
                <p className="mb-1">0.3 to allow you to participate in interactive features of our Service when you choose to do so;</p>
                <p className="mb-1">0.4 to provide customer support;</p>
                <p className="mb-1">0.5 to gather analysis or valuable information so that we can improve our Service;</p>
                <p className="mb-1">0.6 to monitor the usage of our Service;</p>
                <p className="mb-1">0.7 to detect, prevent, and address technical issues;</p>
                <p className="mb-1">0.8 to fulfill any other purpose for which you provide it;</p>
                <p className="mb-1">0.9 to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;</p>
                <p className="mb-1">0.10 to provide you with notices about your account and/or subscription, including expiration and renewal notices, email instructions, etc.;</p>
                <p className="mb-1">0.11 to provide you with news, special offers, and general information about other goods, services, and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;</p>
                <p className="mb-1">0.12. in any other way we may describe when you provide the information;</p>
                <p className="mb-1">0.13 for any other purpose with your consent.</p>
              </div>
            </div>

            {/* 6. Retention of Data */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">6. Retention of Data</h5>
              <p className="mb-2">We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
              <p className="mb-2">We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>
            </div>

            {/* 7. Transfer of Data */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">7. Transfer of Data</h5>
              <p className="mb-2">Your information, including Personal Data, may be transferred to &ndash; and maintained on &ndash; computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.</p>
              <p className="mb-2">If you are located outside Malaysia and choose to provide information to us, please note that we transfer the data, including Personal Data, to Malaysia and process it there.</p>
              <p className="mb-2">Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
              <p className="mb-2">Mother Vegetable will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
            </div>

            {/* 8. Disclosure of Data */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">8. Disclosure of Data</h5>
              <p className="mb-2">We may disclose personal information that we collect, or you provide:</p>
              <div className="pl-4">
                <p className="mb-1">0.1. <strong>Disclosure for Law Enforcement.</strong></p>
                <p className="mb-2">Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.</p>
                <p className="mb-1">0.2. <strong>Business Transaction.</strong></p>
                <p className="mb-2">If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.</p>
                <p className="mb-1">0.3. <strong>Other cases. We may disclose your information also:</strong></p>
                <div className="pl-4">
                  <p className="mb-1">0.3.1. to our subsidiaries and affiliates;</p>
                  <p className="mb-1">0.3.2. to contractors, service providers, and other third parties we use to support our business;</p>
                  <p className="mb-1">0.3.3. to fulfill the purpose for which you provide it;</p>
                  <p className="mb-1">0.3.4. for the purpose of including your company&rsquo;s logo on our website;</p>
                  <p className="mb-1">0.3.5. for any other purpose disclosed by us when you provide the information;</p>
                  <p className="mb-1">0.3.6. with your consent in any other cases;</p>
                  <p className="mb-1">0.3.7. if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.</p>
                </div>
              </div>
            </div>

            {/* 9. Security of Data */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">9. Security of Data</h5>
              <p className="mb-2">The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </div>

            {/* 10. GDPR */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">10. Your Data Protection Rights Under General Data Protection Regulation (GDPR)</h5>
              <p className="mb-2">If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR.</p>
              <p className="mb-2">We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
              <p className="mb-2">If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please email us at <strong>support@mothervegetable.com</strong>.</p>
              <p className="mb-2">In certain circumstances, you have the following data protection rights:</p>
              <div className="pl-4">
                <p className="mb-1">0.1 the right to access, update, or to delete the information we have on you;</p>
                <p className="mb-1">0.2 the right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete;</p>
                <p className="mb-1">0.3 the right to object. You have the right to object to our processing of your Personal Data;</p>
                <p className="mb-1">0.4 the right of restriction. You have the right to request that we restrict the processing of your personal information;</p>
                <p className="mb-1">0.5 the right to data portability. You have the right to be provided with a copy of your Personal Data in a structured, machine-readable, and commonly used format;</p>
                <p className="mb-1">0.6 the right to withdraw consent. You also have the right to withdraw your consent at any time where we rely on your consent to process your personal information.</p>
              </div>
              <p className="mb-2 mt-2">Please note that we may ask you to verify your identity before responding to such requests. Please note, we may not be able to provide Service without some necessary data.</p>
              <p className="mb-2">You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).</p>
            </div>

            {/* 11. CalOPPA */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">11. Your Data Protection Rights Under the California Privacy Protection Act (CalOPPA)</h5>
              <p className="mb-2">CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law&rsquo;s reach stretches well beyond California to require a person or company in the United States (and conceivable the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared, and to comply with this policy.</p>
              <p className="mb-2">According to CalOPPA we agree to the following:</p>
              <div className="pl-4">
                <p className="mb-1">0.1. users can visit our site anonymously;</p>
                <p className="mb-1">0.2. our Privacy Policy link includes the word &ldquo;Privacy&rdquo;, and can easily be found on the home page of our website;</p>
                <p className="mb-1">0.3. users will be notified of any privacy policy changes on our Privacy Policy Page;</p>
                <p className="mb-1">0.4. users are able to change their personal information by emailing us at <strong>support@mothervegetable.com</strong>.</p>
              </div>
              <p className="mb-2 mt-2">Our Policy on &ldquo;Do Not Track&rdquo; Signals:</p>
              <div className="pl-4">
                <p className="mb-2">We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place. Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.</p>
                <p className="mb-2">You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.</p>
              </div>
            </div>

            {/* 12. CCPA */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">12. Your Data Protection Rights under the California Consumer Privacy Act (CCPA)</h5>
              <p className="mb-2">If you are a California resident, you are entitled to learn what data we collect about you, ask to delete your data and not to sell (share) it. To exercise your data protection rights, you can make certain requests and ask us:</p>
              <p className="mb-2"><strong>0.1. What personal information we have about you. If you make this request, we will return to you:</strong></p>
              <div className="pl-4">
                <p className="mb-1">0.0.1. The categories of personal information we have collected about you.</p>
                <p className="mb-1">0.0.2. The categories of sources from which we collect your personal information.</p>
                <p className="mb-1">0.0.3. The business or commercial purpose for collecting or selling your personal information.</p>
                <p className="mb-1">0.0.4. The categories of third parties with whom we share personal information.</p>
                <p className="mb-1">0.0.5. The specific pieces of personal information we have collected about you.</p>
                <p className="mb-1">0.0.6. A list of categories of personal information that we have sold, along with the category of any other company we sold it to. If we have not sold your personal information, we will inform you of that fact.</p>
                <p className="mb-1">0.0.7. A list of categories of personal information that we have disclosed for a business purpose, along with the category of any other company we shared it with.</p>
              </div>
              <p className="mb-2 mt-2">Please note, you are entitled to ask us to provide you with this information up to two times in a rolling twelve-month period. When you make this request, the information provided may be limited to the personal information we collected about you in the previous 12 months.</p>
              <p className="mb-2">0.2. To delete your personal information. If you make this request, we will delete the personal information we hold about you as of the date of your request from our records and direct any service providers to do the same. In some cases, deletion may be accomplished through de-identification of the information. If you choose to delete your personal information, you may not be able to use certain functions that require your personal information to operate.</p>
              <p className="mb-2">0.3. To stop selling your personal information. We don&rsquo;t sell or rent your personal information to any third parties for any purpose. We do not sell your personal information for monetary consideration. However, under some circumstances, a transfer of personal information to a third party, or within our family of companies, without monetary consideration may be considered a &ldquo;sale&rdquo; under California law. You are the only owner of your Personal Data and can request disclosure or deletion at any time.</p>
              <p className="mb-2">If you submit a request to stop selling your personal information, we will stop making such transfers.</p>
              <p className="mb-2">Please note, if you ask us to delete or stop selling your data, it may impact your experience with us, and you may not be able to participate in certain programs or membership services which require the usage of your personal information to function. But in no circumstances, we will discriminate against you for exercising your rights.</p>
              <p className="mb-2">To exercise your California data protection rights described above, please send your request(s) by email: <strong>support@mothervegetable.com</strong>.</p>
              <p className="mb-2">Your data protection rights, described above, are covered by the CCPA, short for the California Consumer Privacy Act. To find out more, visit the official California Legislative Information website. The CCPA took effect on 01/01/2020.</p>
            </div>

            {/* 13. Service Providers */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">13. Service Providers</h5>
              <p className="mb-2">We may employ third party companies and individuals to facilitate our Service (<strong>&ldquo;Service Providers&rdquo;</strong>), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.</p>
              <p className="mb-2">These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            </div>

            {/* 14. Analytics */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">14. Analytics</h5>
              <p className="mb-2">We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
            </div>

            {/* 15. CI/CD tools */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">15. CI/CD tools</h5>
              <p className="mb-2">We may use third-party Service Providers to automate the development process of our Service.</p>
            </div>

            {/* 16. Advertising */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">16. Advertising</h5>
              <p className="mb-2">We may use third-party Service Providers to show advertisements to you to help support and maintain our Service.</p>
            </div>

            {/* 17. Behavioral Remarketing */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">17. Behavioral Remarketing</h5>
              <p className="mb-2">We may use remarketing services to advertise on third party websites to you after you visited our Service. We and our third-party vendors use cookies to inform, optimise and serve ads based on your past visits to our Service.</p>
            </div>

            {/* 18. Payments */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">18. Payments</h5>
              <p className="mb-2">We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors).</p>
              <p className="mb-2">We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
            </div>

            {/* 19. Links to Other Sites */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">19. Links to Other Sites</h5>
              <p className="mb-2">Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party&rsquo;s site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
              <p className="mb-2">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
            </div>

            {/* 20. Children's Privacy */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">20. Children&rsquo;s Privacy</h5>
              <p className="mb-2">Our Services are not intended for use by children under the age of 18 (<strong>&ldquo;Child&rdquo;</strong> or <strong>&ldquo;Children&rdquo;</strong>).</p>
              <p className="mb-2">We do not knowingly collect personally identifiable information from Children under 18. If you become aware that a Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.</p>
            </div>

            {/* 21. Changes to This Privacy Policy */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">21. Changes to This Privacy Policy</h5>
              <p className="mb-2">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              <p className="mb-2">We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update &ldquo;effective date&rdquo; at the top of this Privacy Policy.</p>
              <p className="mb-2">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </div>

            {/* 22. Contact Us */}
            <div className="py-3">
              <h5 className="font-bold text-lg text-[#25C760] mb-2">22. Contact Us</h5>
              <p className="mb-2">If you have any questions about this Privacy Policy, please contact us by email: <strong>support@mothervegetable.com</strong>.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
