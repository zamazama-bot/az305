// AZ-305: Azure Solutions Architect Expert
// 第1回: ID・ガバナンス・監視（30問）+ データストレージ（30問）
// Udemy模擬試験（問題集1〜3、計180問）とは重複しないオリジナル問題です。

const QUESTIONS = [

  // ── ID・ガバナンス・監視 ──────────────────────────────

{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社では、運用チームのメンバーが仮想マシンの起動・停止・サイズ変更を行えるようにしたいですが、誤って仮想マシンやそのディスクを削除できないようにする必要があります。組み込みロールにはこの要件に正確に一致するものがありません。",
  question: "この要件を満たすために作成すべきものはどれですか？",
  choices: [
    "所有者ロールを割り当てた上でAzure Policyの拒否割り当てを追加する",
    "Actionsで仮想マシン関連操作を許可し、NotActionsで削除操作を除外したAzureカスタムロール",
    "共同作成者ロールを割り当て、リソースロックの「削除」ロックをサブスクリプションに設定する",
    "Conditional Accessポリシーで削除操作を行うセッションをブロックする"
  ],
  answer: 1,
  explanation: "Azure RBACの<strong>カスタムロール</strong>はJSON形式のロール定義で構成され、<strong>Actions</strong>に許可する管理操作（例：Microsoft.Compute/virtualMachines/start/action、restart/action、write）を列挙し、<strong>NotActions</strong>にActionsから差し引きたい操作（Microsoft.Compute/virtualMachines/deleteやdisks/deleteなど）を指定します。実効的な権限は「Actionsに含まれるがNotActionsには含まれない」操作の集合として計算されるため、組み込みロールにない粒度の権限セットを柔軟に定義できます。カスタムロールはAssignableScopes（管理グループ・サブスクリプション・リソースグループ）を指定して所有者だけが作成・更新でき、複数サブスクリプションへ再利用可能です。<br><br>「共同作成者＋リソースロック」は一見有効に見えますが、リソースロックはロールや個人を区別せず<strong>スコープ全体</strong>のあらゆるプリンシパルに一律適用されるため、正当な理由で削除が必要な別チーム（インフラ再構築担当など）の操作まで止めてしまい、要件の「特定チームだけ削除を制限する」という意図に合いません。「所有者＋拒否割り当て（Deny Assignment）」は概念としては近いものの、拒否割り当てはユーザーが直接作成するAPIやポータルUIを持たず、Azure Blueprintsのロックアーティファクトなど限定的な仕組みでのみシステムが生成するものであり、通常の運用でユーザーが自由に作成できるものではありません。Conditional Accessはサインイン時にMFAやデバイス準拠などの条件を評価する仕組みであり、ARM上の個々のAPI操作（削除など）を選択的に禁止する機能は持ちません。<br><br>なお、RBACの「拒否（Deny）」の考え方とAzure Policyの<strong>Deny効果</strong>は混同されやすいですが、RBACには本来「明示的な拒否」ロールという概念は存在せず（拒否割り当ては特殊なシステム機能）、通常の権限制限はNotActionsによる除外かAzure Policyでの操作制御によって行います。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Fabrikam社は、テナント内の管理グループ階層のルートに「許可されているリソースの種類」ポリシーを割り当てています。しかし、あるサブスクリプション配下のサンドボックス環境だけは、検証目的で任意のリソースの種類を作成できるようにする必要があります。ポリシー定義自体は変更したくありません。",
  question: "このサブスクリプションだけを親スコープのポリシーの適用対象から除外するには、何を使用すべきですか？",
  choices: [
    "サブスクリプションを管理グループ階層から一時的に切り離す",
    "ポリシー定義自体にサブスクリプションIDを除外条件として追加する",
    "Azure Policyの割り当てにおけるポリシー例外（Exemption）",
    "サンドボックスサブスクリプションにリソースロックを設定する"
  ],
  answer: 2,
  explanation: "<strong>Azure Policyの例外（Exemption）</strong>は、既存のポリシー割り当て（Assignment）に対して特定の子スコープ（サブスクリプション、リソースグループ、個々のリソース）を評価対象から除外するためのオブジェクトです。ポリシー定義や割り当て自体には一切手を加えず、例外オブジェクト側に対象スコープ、除外理由のカテゴリ（Waiver／Mitigated）、任意の有効期限（ExpiresOn）を設定します。有効期限を過ぎると自動的に再評価対象に戻るため、サンドボックスのような一時的な用途に適しており、誰がいつ何の理由で除外したかが監査ログとして残る点もガバナンス上重要です。<br><br>サブスクリプションを管理グループ階層から切り離すと、対象のポリシーだけでなく、その階層に紐づく他の全てのポリシー、コスト管理設定、RBAC継承なども同時に失われるため、影響範囲が要件よりはるかに大きくなります。リソースロック（削除ロック／読み取り専用ロック）はリソースの変更・削除操作を防ぐ機能であり、ポリシーの評価・適用可否とは全く異なるレイヤーの制御です。ポリシー定義自体にサブスクリプションIDの除外条件を書き込む方法は技術的に不可能ではありませんが、定義を直接変更することになり「定義は変更しない」という制約に反する上、階層内の他の割り当て先にも影響してしまい保守性が低下します。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Northwind社のセキュリティチームは、Global Administratorロールを常時保有するユーザーをなくしたいと考えています。管理者がそのロールを一時的に必要とする場合、業務理由を入力し、別の承認者が承認して初めて有効化され、有効化は8時間で自動的に失効するようにしたいです。",
  question: "この要件を実現するために構成すべき機能はどれですか？",
  choices: [
    "Conditional Accessポリシーでロールベースのアクセス制御を条件に追加する",
    "Microsoft Entra Privileged Identity Management（PIM）でのロールの適格（Eligible）割り当てと承認必須のアクティブ化設定",
    "Entraアクセスレビューを四半期ごとにスケジュールする",
    "Azure Policyを使用してGlobal Administratorロールの割り当てを禁止する"
  ],
  answer: 1,
  explanation: "<strong>PIM（Privileged Identity Management）</strong>では、ロールの割り当て種別を「アクティブ（Active）」ではなく「<strong>適格（Eligible）</strong>」に設定できます。適格割り当てを持つユーザーは、通常時は当該ロールの権限を持たず、必要なタイミングで<strong>アクティブ化（Activation）</strong>を要求して初めて権限が有効になります。アクティブ化設定では、業務理由の入力必須化、多要素認証の要求、指定した承認者による承認必須化、最大アクティブ化期間（例：8時間）を細かく構成でき、期限が来ると自動的に権限が失効し「適格」の状態に戻ります。これにより常時有効な特権（Standing Access）を排除し、攻撃対象領域を最小化する「Just-In-Timeアクセス」を実現します。PIMはMicrosoft Entra ID <strong>P2</strong>（またはEntra ID Governance）ライセンスが必要な機能です。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>PIMアクティブ化のタイムライン</div><div class='exp-timeline'><div class='tl-point'><div class='tl-time'>平常時</div><div class='tl-label'>適格(Eligible)のみ・権限なし</div></div><div class='tl-point'><div class='tl-time'>要求</div><div class='tl-label'>理由入力+承認者の承認</div></div><div class='tl-point tl-danger'><div class='tl-time'>0〜8h</div><div class='tl-label'>アクティブ化・権限有効</div></div><div class='tl-point'><div class='tl-time'>8h後</div><div class='tl-label'>自動失効→適格に戻る</div></div></div></div><br><br>Conditional Accessはサインイン時にMFAやデバイス準拠、場所などの条件を評価してアクセスを許可・拒否する仕組みであり、ロール自体を時限的に付与したり承認フローを挟んだりする機能は持ちません。アクセスレビューは既に付与されている権限を定期的に棚卸しし、不要な権限を検出・削除するための仕組みであり、事前承認を伴うリアルタイムのアクティブ化ワークフローとは目的が異なります。Azure Policyはリソース構成（VMのSKUやタグなど）を統治する仕組みであり、Entra IDのディレクトリロールの割り当てそのものを制御対象にはできません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、10種類のAzureリソースロールを頻繁に切り替えて使用するプロジェクトチームを持っています。個々のユーザーに対して毎回PIMでロールを有効化させるのではなく、チーム全体をあるセキュリティグループのメンバーとして時限的にアクティブ化させ、そのグループにロールを事前に割り当てておく運用にしたいと考えています。",
  question: "この要件を最も効率的に実現する機能はどれですか？",
  choices: [
    "Conditional Accessでグループベースの条件付きアクセスポリシーを作成する",
    "動的グループを作成し、ユーザー属性に基づいて自動的にメンバーを追加する",
    "各ユーザーに個別にPIMでロールの適格割り当てを設定する",
    "PIM for Groups（特権アクセスグループ）を使用し、グループメンバーシップを適格（Eligible）にする"
  ],
  answer: 3,
  explanation: "<strong>PIM for Groups（特権アクセスグループ）</strong>を使うと、Microsoft 365グループやセキュリティグループそのものをPIMの管理対象にできます。あらかじめそのグループにAzureロール（複数可）やEntraロールを割り当てておき、ユーザーはグループの「メンバー」または「所有者」という役割を<strong>適格（Eligible）</strong>として持ちます。ユーザーが一度グループメンバーシップをアクティブ化するだけで、そのグループに割り当てられた全てのロール（この場合は10種類）の権限を同時に取得できるため、ロールを1つずつ個別にアクティブ化する手間や承認の往復を大幅に削減できます。<br><br>各ユーザーに個別に10個のロールの適格割り当てを設定すると、ユーザーはロールの数だけアクティブ化操作と承認待ちを繰り返す必要があり、運用負荷も監査対象も増大します。動的グループはユーザーの属性（部署名やジョブタイトルなど）に基づいてメンバーシップを自動的に更新する仕組みであり、時限的なアクティブ化や承認フローとは無関係な機能です。Conditional Accessはサインイン時の認証条件を制御するものであり、ロールの付与や時限管理そのものには関与しません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のセキュリティ監査で、複数の従業員がSMTP AUTHやIMAPなどのレガシープロトコルを使用してメールクライアントからサインインしていることが判明しました。これらのプロトコルは多要素認証をサポートしないため、パスワードスプレー攻撃の標的になっています。",
  question: "レガシー認証を使用したサインインを組織全体でブロックするために構成すべきものはどれですか？",
  choices: [
    "Microsoft Entra IDのパスワードポリシーでパスワードの複雑さ要件を強化する",
    "Azure Policyを使用してメールクライアントの種類を制限する",
    "クライアントアプリの条件を「レガシー認証クライアント」に設定したConditional Accessポリシーでアクセスをブロックする",
    "Microsoft Defender for Cloud Appsで異常なサインインをアラートのみ発報するよう設定する"
  ],
  answer: 2,
  explanation: "<strong>Conditional Access</strong>ポリシーの割り当て条件にある「クライアントアプリ」で、「モダン認証をサポートするクライアント」ではなく<strong>レガシー認証クライアント</strong>（Exchange ActiveSyncやその他のクライアント＝SMTP AUTH、IMAP4、POP3、旧Outlookなど）を対象とし、アクセス制御を「ブロック」に設定することで、MFAのチャレンジ自体が発生し得ないレガシープロトコル経由のサインインを組織全体で遮断できます。レガシー認証はMFAを要求できない仕組みであるため、そもそも侵害耐性が低く、Microsoftも早期の無効化を強く推奨しています（Basic認証自体もExchange Onlineでは既定で廃止が進められています）。<br><br>パスワードの複雑さ要件を強化しても、パスワードスプレー攻撃で使われる漏洩済み・推測されやすい認証情報のリスト攻撃には限定的な効果しかなく、レガシー認証というプロトコル自体を無効化するものではありません。Defender for Cloud Appsのアラート設定は異常なアクティビティを検知して通知するだけの受動的な対応であり、実際の不正サインインの試行そのものを能動的に遮断する機能ではありません。Azure Policyはリソースのデプロイ・構成を統治するAzureサブスクリプション向けの機能であり、Entra IDへのサインイン時の認証プロトコル制御には使用できません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社はMicrosoft Entra ID P2を導入しています。あるユーザーが数分前に東京からサインインしていたにもかかわらず、地理的に到達不可能な短時間で別の国からもサインインしている（あり得ない移動）、または匿名化プロキシ（Tor出口ノードなど）経由でのサインインが検出された場合に、そのサインインをリアルタイムでブロックまたは追加のMFAを要求したいと考えています。",
  question: "この要件を満たすために設定すべきものはどれですか？",
  choices: [
    "Identity Protectionのサインインリスクポリシー（Conditional Access）で、リスクレベルに応じてアクセスをブロックまたはMFAを要求する",
    "Microsoft Sentinelの分析ルールでリスクの高いサインインに関するインシデントを作成する",
    "Conditional Accessの名前付きの場所を使用して疑わしいIPアドレスからのアクセスをブロックする",
    "Identity Protectionのユーザーリスクポリシーでパスワードの変更を必須にする"
  ],
  answer: 0,
  explanation: "「あり得ない移動（Atypical travel）」や「匿名IPアドレス（Anonymous IP address）」は、Identity Protectionにおいてサインインの発生時にリアルタイムまたはほぼリアルタイムで評価される<strong>サインインリスク</strong>の代表的な検出シグナルです。Identity Protectionが提供する<strong>サインインリスクベースのConditional Accessポリシー</strong>を構成すると、Microsoftの機械学習・脅威インテリジェンスに基づいて算出されたリスクレベル（低・中・高）に応じて、そのセッションだけをブロックしたり追加のMFAを要求したりできます。この機能はMicrosoft Entra ID <strong>P2</strong>ライセンスで利用可能です。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>サインインリスク vs ユーザーリスク</div><div class='exp-decision'><div class='dec-row dec-yes'><span class='dec-cond'>今まさに発生中のサインインをリアルタイムで止めたい？</span><span class='dec-arrow'>&rarr;</span><span class='dec-result'>サインインリスクポリシー</span></div><div class='dec-row'><span class='dec-cond'>資格情報漏洩などアカウント自体の恒久的な是正が必要？</span><span class='dec-arrow'>&rarr;</span><span class='dec-result'>ユーザーリスクポリシー</span></div></div></div><br><br>ユーザーリスクポリシーは、個々のサインインではなく<strong>アカウントそのもの</strong>が侵害されている可能性を評価する仕組みで、代表例は「漏洩認証情報（Leaked Credentials）」の一致です。これは過去に流出した認証情報データベースとの突合によるオフライン検出であり、検出結果がレポートに反映されるまで最大48時間程度かかることがあるため、「その場のサインイン試行を即座に止める」というリアルタイム性の高い要件には直接対応できません。今回のような「今まさに発生しているサインインをリアルタイムで止めたい」という要件には、オフライン検出であるユーザーリスクではなく、サインインリスクポリシーの方が適合します。名前付きの場所によるIPブロックは静的なホワイトリスト／ブラックリスト方式であり、あり得ない移動や匿名IPのような動的なリスク評価の仕組みは持ちません。Sentinelの分析ルールはログを収集した後にインシデントとして可視化・記録する検知後の対応であり、サインインの試行自体をその場でブロックすることはできません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のセキュリティチームは、Microsoft Entra IDがユーザーアカウントの資格情報が侵害された可能性が高いと判断した場合（例えば、ダークウェブで漏洩したことが確認された場合）、そのユーザーは次回サインイン時に強制的にパスワードを変更させられるようにしたいと考えています。",
  question: "この要件に最も適した機能はどれですか？",
  choices: [
    "Conditional Accessでデバイスの準拠状態を条件にする",
    "Microsoft Entra IDのセルフサービスパスワードリセット（SSPR）を有効化する",
    "Identity Protectionのユーザーリスクポリシーで、リスクレベルが「高」の場合にパスワード変更を必須とするConditional Accessポリシー",
    "Identity Protectionのサインインリスクポリシーでアクセスをブロックする"
  ],
  answer: 2,
  explanation: "アカウントの資格情報がダークウェブなどで漏洩したと確認された場合、それは1回のサインイン試行の話ではなく<strong>アカウント自体</strong>が危険にさらされている状態であり、Identity Protectionでは<strong>ユーザーリスク</strong>として分類・スコアリングされます。<strong>ユーザーリスクベースのConditional Accessポリシー</strong>でリスクレベルが「高」の場合の許可制御として「パスワードの変更を要求」を設定すれば、対象ユーザーは次回サインイン時に強制的にパスワードのリセットを求められ、変更が完了するとリスク状態は自動的に「修復済み」に更新されます。この制御にはSSPR（セルフサービスパスワードリセット）が有効化されている必要があります。<br><br>サインインリスクポリシーは個々のサインイン試行（不審な場所、匿名IPアドレス経由など）ごとのリスクを評価するもので、アカウント全体の恒久的な是正措置（パスワードリセットの強制）を目的とした機能ではありません。SSPR単体を有効化しただけでは、あくまでユーザーが自発的にパスワードを忘れた際に使う機能であり、漏洩検出をトリガーに強制するものではありません。デバイス準拠状態の条件は端末が管理・保護されているかを評価するものであり、資格情報漏洩というリスクシグナルとは別の評価軸です。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、Global Administratorおよびその他の特権ロールを持つ管理者に対して、パスワードやSMS/音声通話によるMFAではなく、フィッシング攻撃に強い認証方法（FIDO2セキュリティキーやWindows Hello for Businessなど）のみを使用したサインインを義務付けたいと考えています。",
  question: "この要件を満たすためにConditional Accessで構成すべき制御はどれですか？",
  choices: [
    "アプリの強制制御（App Enforced Restrictions）を有効にする",
    "多要素認証を要求する付与制御のみを設定する",
    "デバイスを準拠済みとしてマークすることを要求する付与制御を設定する",
    "認証強度（Authentication Strength）としてフィッシング耐性のあるMFAを要求する付与制御を設定する"
  ],
  answer: 3,
  explanation: "Conditional Accessの<strong>認証強度（Authentication Strength）</strong>は、単に「MFAを満たしているか」ではなく「どの認証方式の組み合わせで満たしたか」まで細かく指定できる付与制御です。Microsoft提供の組み込み強度の1つである「<strong>フィッシング耐性のある多要素認証</strong>」を選択すると、FIDO2セキュリティキー、Windows Hello for Business、証明書ベース認証（スマートカードなど）といった、中間者攻撃・偽サイトによる資格情報窃取に強い方式のみが許可され、SMSやパスワード＋通知承認のような可傍受・フィッシング可能な方式は自動的に排除されます。特権ロール保有者に対する保護強化として、Microsoftのセキュリティベースラインでも推奨される構成です。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>認証方式のフィッシング耐性</div><table class='exp-compare'><tr><th>区分</th><th>認証方式</th></tr><tr class='hl'><td class='ok'>フィッシング耐性あり</td><td>FIDO2セキュリティキー / Windows Hello for Business / 証明書ベース認証</td></tr><tr><td class='ng'>フィッシング耐性なし</td><td>SMS / 音声通話 / Microsoft Authenticatorプッシュ通知</td></tr></table></div><br><br>単純に「多要素認証を要求する」制御を設定するだけでは、SMSコードや音声通話、Microsoft Authenticatorの単純承認プッシュ通知なども条件を満たしてしまうため、フィッシング耐性という要件を満たしません。デバイス準拠の要求は、端末がIntuneなどで管理・準拠状態にあるかというデバイスの信頼性を評価するものであり、サインイン時に使う認証方式自体を制限するものではありません。アプリの強制制御（App Enforced Restrictions）はExchange OnlineやSharePoint Online側でネイティブに提供されるセッション制限機能（例：非準拠デバイスでのダウンロード制限）であり、認証強度の指定とは異なる仕組みです。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は取引先企業のユーザーをゲストとして招待し、自社のSharePoint OnlineサイトにB2Bコラボレーションでアクセスさせています。法務部門は、ゲストユーザーが初回アクセス時に会社の利用規約に同意しない限り、リソースにアクセスできないようにすることを求めています。",
  question: "この要件を満たすために使用すべき機能はどれですか？",
  choices: [
    "Conditional Accessでゲストユーザーからのアクセスを完全にブロックする",
    "Conditional Accessの許可制御として「利用規約（Terms of Use）」への同意を要求するポリシー",
    "SharePoint Onlineの共有設定でゲストアクセスを無効化する",
    "Entra IDの外部コラボレーション設定でゲストユーザーの招待を制限する"
  ],
  answer: 1,
  explanation: "Microsoft Entra IDの<strong>利用規約（Terms of Use）</strong>はPDF形式の規約文書をアップロードし、Conditional Accessの許可制御の1つとして組み込める機能です。対象ユーザー（ゲストを含む）がポリシーの条件に一致するリソースへアクセスしようとすると、規約の内容を表示し明示的な同意操作を求めてからアクセスを許可します。誰がいつどのバージョンの規約に同意したかのレポートも取得でき、法務・コンプライアンス上の証跡として活用できます。バージョン管理や再同意の要求（規約更新時など）にも対応しています。<br><br>外部コラボレーション設定は「誰がゲストを招待できるか」「どのドメインからの招待を許可するか」といった招待プロセス自体の権限管理であり、同意取得のワークフローとは別の機能です。SharePoint Onlineの共有設定でゲストアクセス自体を無効化してしまうと、そもそも要件である「ゲストがコラボレーションできる」という前提が崩れてしまいます。Conditional Accessでゲストを完全にブロックするのも同様に、目的である外部コラボレーションを不可能にしてしまうため本末転倒です。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社の管理者は、特権ロールの時限的な有効化（Just-In-Timeアクセス）とアクセスレビューを組み合わせたガバナンスを実装しようとしていますが、現在のMicrosoft Entra ID P1ライセンスではこれらの機能を利用できないことに気付きました。",
  question: "これらの機能を利用するために必要なライセンスはどれですか？",
  choices: [
    "Microsoft Entra ID P2",
    "Microsoft 365 E3",
    "Microsoft Entra ID Governance単体（P1のまま追加不要）",
    "Microsoft Entra ID Free"
  ],
  answer: 0,
  explanation: "<strong>PIM（Privileged Identity Management）</strong>によるロールの時限的なアクティブ化、Identity Protectionのリスクベースポリシー、そしてそれらと連携する<strong>アクセスレビュー</strong>は、いずれもMicrosoft Entra ID <strong>P2</strong>ライセンス（あるいはEntra ID Governanceアドオンライセンス）で提供される機能です。P1ライセンスにはConditional Access、SSPRのオンプレ書き戻し、動的グループなどの基本的なID管理機能が含まれますが、PIMやIdentity Protectionといった高度な特権管理・リスク評価機能は含まれません。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>機能ごとの必要ライセンス</div><table class='exp-compare'><tr><th>機能</th><th>P1</th><th>P2</th></tr><tr><td>Conditional Access</td><td class='ok'>&check;</td><td class='ok'>&check;</td></tr><tr class='hl'><td>PIM</td><td class='ng'>&times;</td><td class='ok'>&check;</td></tr><tr class='hl'><td>Identity Protection</td><td class='ng'>&times;</td><td class='ok'>&check;</td></tr><tr class='hl'><td>アクセスレビュー</td><td class='ng'>&times;</td><td class='ok'>&check;</td></tr></table></div><br><br>Freeライセンスには基本的なディレクトリ機能とごく限定的なConditional Access相当の機能しかなく、PIMやアクセスレビューは含まれません。Microsoft 365 E3にはEntra ID P1相当の機能が同梱されますが、P2相当の機能は含まれず、P2機能が必要な場合はE5（Entra ID P2を含む）へのアップグレードか、Entra ID P2単体・Governanceアドオンの追加購入が必要です。「P1のまま追加不要」という選択肢は誤りで、実際には何らかの形でP2機能へのライセンスアップグレードが避けられません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は管理グループ「Corp」の配下に複数のサブスクリプションを持っています。管理グループ「Corp」でユーザーAに「閲覧者」ロールを割り当てたところ、Aは配下のすべてのサブスクリプション・リソースグループ・個々のリソースに対しても閲覧者権限を持つようになりました。一方、あるリソースグループでユーザーBに「共同作成者」ロールを割り当てても、その親であるサブスクリプションや管理グループでの権限にはBは含まれませんでした。",
  question: "この動作を正しく説明しているものはどれですか？",
  choices: [
    "RBACのロール割り当ては上位スコープから下位スコープへ自動的に継承されるが、下位スコープでの割り当ては上位スコープには影響しない",
    "管理グループでのロール割り当ては、明示的に「継承を有効化」しない限り配下のリソースには適用されない",
    "RBACのロール割り当てはスコープ間で継承されず、各スコープで個別に設定する必要がある",
    "RBACのロール割り当ては下位スコープから上位スコープへも自動的に反映される"
  ],
  answer: 0,
  explanation: "Azure RBACは<strong>管理グループ → サブスクリプション → リソースグループ → リソース</strong>という4階層のスコープ構造を持ち、上位スコープで割り当てられたロールは、追加設定なしにすべての下位スコープへ<strong>一方向に自動継承</strong>されます。管理グループでの「閲覧者」割り当てが配下の全サブスクリプション・全リソースに及ぶのはこのためで、逆にリソースグループでの割り当てが親のサブスクリプションや管理グループに逆流することはありません。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>RBACスコープの継承（上位→下位のみ）</div><div class='exp-flow'><div class='flow-box hl'>管理グループ</div><div class='flow-arrow'>&darr;継承</div><div class='flow-box'>サブスクリプション</div></div><div class='exp-flow' style='margin-top:6px'><div class='flow-box'>サブスクリプション</div><div class='flow-arrow'>&darr;継承</div><div class='flow-box'>リソースグループ</div><div class='flow-arrow'>&darr;継承</div><div class='flow-box'>個々のリソース</div></div><div class='flow-label'>下位スコープでの割り当ては上位へは伝播しない（逆方向の矢印はない）</div></div><br><br>「継承されず個別設定が必要」は誤りで、実際には自動継承が既定の動作です。「下位から上位へ反映される」は継承の方向を逆に捉えており誤りです。「継承を有効化しない限り適用されない」も誤りで、継承のオン/オフを切り替える設定自体が存在しません。この一方向継承の理解は、「最小権限の原則に基づきどのスコープでロールを割り当てるべきか」というAZ-305で頻出の設計判断の土台になります。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は機密性の高いシークレットを保存するKey Vaultをインターネットからの直接アクセスから保護したいと考えていますが、同じVNet内にないAzure Backupなど一部のMicrosoft管理サービスからは引き続きアクセスできるようにする必要があります。",
  question: "この要件を満たすためにKey Vaultのネットワーク設定で有効にすべきオプションはどれですか？",
  choices: [
    "全てのネットワークからのアクセスを許可する設定のままにする",
    "NSGでKey VaultのFQDNへのアウトバウンドを許可する",
    "パブリックアクセスを選択したネットワークからのみ許可に設定し、「信頼されたMicrosoftサービスがこのファイアウォールをバイパスすることを許可する」を有効にする",
    "パブリックアクセスを完全に無効にし、プライベートエンドポイントのみを構成する"
  ],
  answer: 2,
  explanation: "Key Vaultのファイアウォール設定で「選択したネットワークからのみ許可」を選択すると既定では指定したVNet／IP範囲以外からのアクセスは拒否されますが、これだけではAzure Backupのような、要求元が同一VNet内にないMicrosoft管理サービスからのアクセスも同時にブロックされてしまいます。そこで<strong>「信頼されたMicrosoftサービスにこのファイアウォールをバイパスすることを許可する」</strong>オプションを併せて有効にすることで、Microsoftが管理する信頼済みサービス一覧に含まれる特定のサービス（Azure Backup、Azure Resource Manager経由のテンプレートデプロイなど）からのアクセスだけを、VNet外からでも例外的に許可できます。一般の不正アクセスは遮断しつつ必要な連携は維持できる、要件に最も直接合致する構成です。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>Key Vaultファイアウォールの構成</div><div class='exp-flow'><div class='flow-box hl-red'>インターネット</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>Key Vault<br>(選択したネットワークのみ許可)</div></div><div class='exp-flow'><div class='flow-box hl-green'>Azure Backup等<br>(信頼済みサービス)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>Key Vault<br>(バイパスで許可)</div></div></div><br><br>プライベートエンドポイントのみに限定する構成は接続経路をプライベートIPに閉じる点で高いセキュリティを実現しますが、信頼されたサービスのバイパスという明示的な許可の仕組みとは異なる話であり、要件で名指しされている「バイパスの許可」には対応していません。全ネットワークからのアクセス許可はセキュリティ要件（インターネットからの直接アクセス防止）に明確に反します。NSGはVNet内のサブネット・NIC単位のトラフィック制御機能であり、Key Vault自体が持つサービスレベルのファイアウォール設定を代替するものではありません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社の内部監査で、退職した従業員が誤ってKey Vault内の重要な暗号化キーを削除していたことが判明しました。幸い、そのキーはリテンション期間内に復元できましたが、今後は悪意のあるユーザーがKey Vault自体やその中のオブジェクトを完全に消去できないよう、恒久的な保護を義務付けることになりました。",
  question: "この要件を満たすために有効化すべき設定はどれですか？",
  choices: [
    "バックアップとしてKey VaultのシークレットをStorageアカウントに定期エクスポートする",
    "論理的な削除（Soft Delete、既定で有効）に加えて、パージ保護（Purge Protection）を有効にする",
    "Key Vaultへのアクセスを読み取り専用のRBACロールのみに制限する",
    "Key Vaultにリソースロック「読み取り専用」を設定する"
  ],
  answer: 1,
  explanation: "Key Vaultの<strong>論理的な削除（Soft Delete）</strong>は、削除操作が行われてもオブジェクト（キー・シークレット・証明書やVault自体）を一定の保持期間中は「削除済み」状態として保持し、期間内であれば復元可能にする機能で、現在は新規Vaultで既定で有効です。しかし十分な権限（Purge権限）を持つユーザーは、保持期間中であっても意図的に<strong>パージ（完全削除）</strong>操作を実行でき、その場合は復元不可能になります。これを技術的に禁止するのが<strong>パージ保護（Purge Protection）</strong>で、これを有効にすると保持期間が満了するまでは、たとえ所有者権限を持つ管理者であってもパージ操作自体を実行できなくなります。金融・医療系などのコンプライアンス基準では、この2つの機能の併用がしばしば必須要件になります。なお、パージ保護は一度有効にすると無効化できない不可逆な設定です。<br><br>リソースロック「読み取り専用」はKey Vaultリソース自体の構成（プロパティ）変更を防ぐものであり、内部に格納されたキーやシークレットといったオブジェクト単位の削除・パージ操作までは制御しません。読み取り専用RBACロールへの権限制限は運用上の権限管理策としては有効ですが、悪意を持った高権限アカウント（乗っ取られた管理者アカウントなど）による削除を技術的に阻止する保証にはなりません。手動でのStorageアカウントへのエクスポートは事後的なバックアップ手段であり、削除やパージそのものを未然に防ぐ恒久的な保護策ではありません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、複数のAzure Functionsアプリと複数のAzure Automationランブックから、共通のストレージアカウントとSQL Databaseに対して同一の権限セットでアクセスする必要があります。管理者は、リソースが再デプロイされてもID情報が変わらず、かつ一元的に権限を管理できる方法を求めています。",
  question: "この要件を最も効率的に満たす方法はどれですか？",
  choices: [
    "各リソースにシステム割り当てマネージドIDを有効化し、個別にRBACロールを割り当てる",
    "1つのユーザー割り当てマネージドIDを作成し、全てのFunctionsアプリとAutomationアカウントに割り当てる",
    "Key Vaultにアクセスポリシーを設定し、全リソースの匿名アクセスを許可する",
    "全てのリソースに共通のサービスプリンシパルとクライアントシークレットを発行し、アプリ設定で共有する"
  ],
  answer: 1,
  explanation: "<strong>ユーザー割り当てマネージドID</strong>は、特定のAzureリソースのライフサイクルに紐づかない、それ自体が独立したAzureリソースとして作成されるIDです。1つのユーザー割り当てマネージドIDを作成してストレージアカウントとSQL Databaseに対して必要なRBACロール（Storage Blob Data Contributorなど）を1回だけ割り当てておき、そのIDを複数のFunctionsアプリとAutomationアカウントに紐づけるだけで、全てのリソースが同一の権限セットを共有できます。ロールの追加・変更もID側で1箇所行えば全リソースに反映されるため一元管理性が高く、また元となるリソース（Functionsアプリ等）が削除・再作成されてもID自体は影響を受けず、資格情報の管理（発行・ローテーション・失効）もAzureのプラットフォームが自動で行うためシークレット漏洩のリスクがありません。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>ユーザー割り当てマネージドIDの共有</div><div class='exp-flow'><div class='flow-box'>Functions/Automation<br>(複数リソース)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>ユーザー割り当て<br>マネージドID(1個)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box'>Storage / SQL Database</div></div></div><br><br>システム割り当てマネージドIDは、有効化したリソースそのものとライフサイクルが1対1で連動する（リソース削除時にIDも自動削除される）ため、リソースごとに個別のRBACロール割り当てが必要になり、要件の「一元管理」「再デプロイでもID情報が変わらない」に反します。クライアントシークレットを使うサービスプリンシパルの共有は、シークレットの保管・ローテーション運用が必要になり、漏洩リスクや管理負荷の観点でマネージドIDが利用可能な場面では推奨されないアンチパターンです。匿名アクセスの許可はセキュリティ上論外であり、認可の要件自体を満たしません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社の開発チームは、GitHub Actionsのワークフローからシークレットを一切保存せずにAzureへデプロイできるようにしたいと考えています。パイプラインの資格情報をローテーションする運用負荷や、シークレット漏洩のリスクを完全になくすことが目標です。",
  question: "この要件を満たすために構成すべき機能はどれですか？",
  choices: [
    "サービスプリンシパルを作成し、クライアントシークレットをGitHub Secretsに保存する",
    "Azure Key Vaultにサービスプリンシパルの資格情報を保存し、ワークフローから都度取得する",
    "マネージドID（またはアプリ登録）にワークロードIDフェデレーション（フェデレーション資格情報）を構成し、GitHub ActionsのOIDCトークンを信頼する",
    "GitHub Actionsのランナーにユーザー割り当てマネージドIDを直接インストールする"
  ],
  answer: 2,
  explanation: "<strong>ワークロードIDフェデレーション</strong>は、Microsoft Entra IDのアプリ登録（サービスプリンシパル）またはユーザー割り当てマネージドIDに対して「フェデレーション資格情報（Federated Credential）」を構成し、GitHub Actionsが発行する短命な<strong>OIDCトークン</strong>を信頼関係の対象として登録する仕組みです。ワークフロー実行時、GitHub Actions側は発行者（issuer）・サブジェクト（リポジトリ/ブランチ/環境などで絞り込み可能）が一致するOIDCトークンを提示するだけで、Microsoft Entra IDがそれを検証してAzure用の短期アクセストークンを発行します。この間、クライアントシークレットや証明書のような長期間有効な機密情報を一切保存・受け渡しする必要がなく、シークレット漏洩リスクとローテーション運用負荷の両方を根本的に解消できます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>ワークロードIDフェデレーションの流れ</div><div class='exp-flow'><div class='flow-box'>GitHub Actions</div><div class='flow-arrow'>&rarr;</div><div class='flow-box'>OIDCトークン発行</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>Entra ID<br>(フェデレーション資格情報で検証)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box'>Azureアクセストークン発行</div></div></div><br><br>クライアントシークレットをGitHub Secretsに保存する方法は機能はしますが、シークレットの定期的なローテーションが必要であり、Secretsへのアクセス権限やリポジトリ設定のミスによる漏洩リスクも残るため、まさに要件が排除したい運用負荷とリスクをそのまま抱えることになります。マネージドIDはAzureのリソースにのみ関連付けられる仕組みであり、GitHub ActionsのランナーというAzure外部の実行環境に直接インストールしたり紐づけたりすることはそもそもできません。Key Vaultへのサービスプリンシパル資格情報の保存も、結局シークレットという長期間有効な機密情報そのものを管理し続ける必要がある点で目標に反します。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、社外パートナー企業の担当者が特定の社内プロジェクトアプリに90日間だけアクセスできるようにしたいと考えています。パートナーの担当者自身がポータルからアクセスを要求し、社内の承認者が承認した場合のみ付与され、期限が来ると自動的に権限が失効するセルフサービスの仕組みを求めています。",
  question: "この要件を実現するために使用すべき機能はどれですか？",
  choices: [
    "Microsoft Entra IDの資格管理（Entitlement Management）でアクセスパッケージを作成する",
    "Conditional Accessポリシーで有効期限付きのセッション制御を設定する",
    "PIMで対象アプリのロールを適格（Eligible）としてパートナーに個別に割り当てる",
    "Entraアクセスレビューを作成し、90日ごとにレビューを実施する"
  ],
  answer: 0,
  explanation: "<strong>資格管理（Entitlement Management）</strong>の<strong>アクセスパッケージ</strong>機能は、社内外のユーザー（パートナーなどのB2Bゲストを含む）が特定のリソース群（アプリ、グループ、SharePointサイトなど）へのアクセスをセルフサービスで要求できるカタログとポリシーを提供します。要求時に承認者による承認ステップを必須にでき、アクセス期間（この場合は90日）を割り当てポリシーとして設定すれば、期限到来時に自動的にアクセスが失効します。さらにアクセスパッケージは招待が未済の外部ユーザーに対してB2B招待を自動的に発行する機能も持ち、パートナー連携のライフサイクル管理全体を一元的にカバーする、まさにこのシナリオのために設計された機能です。<br><br>PIMは主にAzureリソースロールやEntraディレクトリロールといった特権的なロールを対象にした時限的アクティブ化の仕組みであり、アプリケーションへの一般的なアクセス要求・承認・自動失効というセルフサービス型のワークフローには設計上適していません。アクセスレビューは既に付与されている権限を定期的に棚卸しして継続要否を判断する仕組みであり、新規アクセスの要求受付から承認、期限付き付与までの一連のプロセスを構築する機能ではありません。Conditional Accessは認証時の条件付きアクセス制御であり、アクセス権そのものの発行・失効管理を担う機能ではありません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のセキュリティチームは、開発者がパブリックIPアドレスを持つリソースをサブスクリプション内に作成することを一切禁止したいと考えています。構成ドリフトの修復ではなく、作成の試み自体をリアルタイムで拒否する必要があります。",
  question: "この要件を満たすためのAzure Policyの効果（Effect）はどれですか？",
  choices: [
    "Deny",
    "Append",
    "AuditIfNotExists",
    "Modify"
  ],
  answer: 0,
  explanation: "Azure Policyの<strong>Deny</strong>効果は、ポリシー条件（この場合はパブリックIPアドレスの割り当てを含むリクエスト）に一致するリソースの作成・更新要求を、Azure Resource Manager（ARM）のリクエスト処理パイプラインの段階でリアルタイムに拒否します。ユーザーがデプロイを試みた瞬間にエラーとして返され、リソースは一切作成されません。「作成の試み自体を拒否する」というプロアクティブな制御には、この効果が正確に対応します。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>主なPolicy効果の比較</div><table class='exp-compare'><tr><th>効果</th><th>タイミング</th><th>動作</th></tr><tr class='hl'><td>Deny</td><td>作成/更新時</td><td class='ng'>要求を拒否</td></tr><tr><td>Append</td><td>作成/更新時</td><td class='ok'>値を自動追加し続行</td></tr><tr><td>AuditIfNotExists</td><td>事後評価</td><td>非準拠を記録のみ</td></tr><tr><td>DeployIfNotExists</td><td>事後評価</td><td class='ok'>不足リソースを自動デプロイ</td></tr></table></div><br><br>Appendは、リクエストの内容に指定したフィールド（タグや設定値など）を強制的に追加してからデプロイを続行させる効果であり、作成自体を止めるものではありません。AuditIfNotExistsは関連リソースの有無を評価し、条件を満たさない場合に対象を非準拠としてコンプライアンスダッシュボードに記録するだけの事後的な可視化機能で、作成をブロックする力は持ちません。Modifyは新規または既存リソースの特定プロパティを書き換える効果（例：タグの追加や削除）であり、これもリソースの作成自体を拒否する仕組みではありません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のガバナンスチームは、新規作成される全てのリソースグループに「CostCenter」タグが必ず存在するようにしたいですが、開発者の作業を妨げたくないため、タグが指定されていない場合は既定値（“Unassigned”）を自動的に追加し、デプロイをブロックしないようにしたいと考えています。",
  question: "この要件を満たすために最も適したAzure Policyの効果（Effect）はどれですか？",
  choices: [
    "Deny",
    "Append",
    "Audit",
    "DeployIfNotExists"
  ],
  answer: 1,
  explanation: "<strong>Append</strong>効果は、受信したデプロイ要求がポリシー条件（CostCenterタグが存在しない、など）に一致した場合に、指定したフィールドと値（この場合はCostCenter: 'Unassigned'）をリクエストの内容へ動的に追加した上で、そのままデプロイ処理を続行させます。ユーザー側は追加の操作を意識する必要がなく、結果として全てのリソースグループに必ずタグが存在する状態を保証しつつ、開発者のワークフローを一切妨げないという要件を同時に満たせます。<br><br>Denyはリクエストそのものを拒否してしまうため、タグ未指定でもデプロイを続行させたいという「ブロックしない」要件と正面から矛盾します。Auditは非準拠状態を記録・可視化するだけでリクエストの内容を書き換えることはなく、タグを自動的に補完する機能はありません。DeployIfNotExistsは、対象リソースに関連する別のリソース（診断設定や拡張機能など）が存在しない場合にそれを追加でデプロイする効果であり、単純なプロパティであるタグの追加にはAppendの方が軽量かつ適切です。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は日本・米国・欧州の3リージョンでAzureリソースを運用しています。各リージョンのIT運用チームは自リージョンのログのみを閲覧・分析したいと考えており、また各国のデータレジデンシー規制により、各リージョンのログはそのリージョン内に留める必要があります。一方でセキュリティチームは、全リージョンのログを横断的に相関分析し、グローバルなインシデントを検出したいという要件も持っています。",
  question: "この要件を満たすLog Analyticsワークスペースの設計として最も適切なものはどれですか？",
  choices: [
    "全リージョン共通の単一ワークスペースにすべてのログを集約する",
    "サブスクリプションごとに1つのワークスペースを作成し、リージョンについては考慮しない",
    "リージョンごとに個別のワークスペースを作成するが、相関分析は行わず各チームが個別に分析する",
    "リージョンごとに個別のワークスペースを作成し、セキュリティチームはクロスワークスペースクエリで横断的に相関分析する"
  ],
  answer: 3,
  explanation: "Log Analyticsワークスペースは<strong>作成するリージョンを選べ、そこに格納されるログデータはそのリージョン内に留まる</strong>ため、リージョンごとに個別のワークスペースを作成すれば、各国のデータレジデンシー要件と、各運用チームが自リージョンのログにアクセス範囲を限定するというアクセス制御の両方を同時に満たせます。その上で、KQLの<strong>クロスワークスペースクエリ</strong>（`workspace()`演算子で複数ワークスペースのテーブルを1つのクエリ内で結合・集計する機能）を使えば、データを物理的に1か所へ複製・移動することなく、セキュリティチームが全リージョンを横断した相関分析を行えます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>分散ワークスペース + クロスワークスペースクエリ</div><div class='exp-flow'><div class='flow-box'>日本WS</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>クロスワークスペース<br>クエリ（Sentinel/<br>Log Analytics）</div><div class='flow-arrow'>&larr;</div><div class='flow-box'>欧州WS</div></div><div class='flow-label'>各リージョンのログは物理的にそのリージョンに留まったまま、クエリ時にのみ横断参照する</div></div><br><br>単一の共通ワークスペースに全ログを集約すると、データレジデンシー要件に違反する可能性があり、各リージョンチームのアクセス範囲を限定することも難しくなります（ワークスペース単位でRBACを分離できないため）。相関分析を諦める案は、セキュリティチームの「グローバルなインシデント検出」という要件を満たせません。サブスクリプション単位の設計はリージョンという軸を直接反映しないため、データレジデンシー要件との対応関係が不明確になります。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社では、サブスクリプション内の全ての仮想マシンに対してMicrosoft Defender for Cloudの監視エージェント拡張機能が自動的にインストールされるようにしたいと考えています。既存の未構成VMに対しても自動的に拡張機能をデプロイし、今後作成される新規VMにも同様に適用したいです。",
  question: "この要件を満たすために使用すべきAzure Policyの効果（Effect）はどれですか？",
  choices: [
    "Deny",
    "Append",
    "DeployIfNotExists（マネージドIDによる修復タスクと組み合わせる）",
    "AuditIfNotExists"
  ],
  answer: 2,
  explanation: "<strong>DeployIfNotExists</strong>効果は、対象リソース（VM）に指定した関連リソース（監視エージェント拡張機能）が存在しない場合に、ポリシー定義に紐づけられた<strong>マネージドID</strong>（通常はContributor相当など、対象リソースをデプロイできる権限を持つシステム割り当てまたはユーザー割り当てID）を使用して、自動的にそのリソースをデプロイします。新規に作成されるVMに対してはデプロイ時点で評価・適用され、既に存在する未構成の既存VMに対しては、ポータルやCLIから明示的に<strong>修復タスク（Remediation Task）</strong>を実行することで遡って一括適用できます。この2段構えにより「既存VMへの自動適用」と「新規VMへの自動適用」を両方カバーする、まさに要件に合致する効果です。<br><br>AuditIfNotExistsは非準拠状態を検出・記録するだけで、拡張機能の自動インストールは行いません。Appendはプロパティ（タグなど）を単純に追加するだけの効果であり、拡張機能という別リソースオブジェクトのデプロイには使用できません。Denyはリソース作成要求自体を拒否する効果であり、既存VMへの遡及適用や拡張機能の自動インストールという目的には使用しません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "大企業のContoso社は、数百のサブスクリプションを持つAzure環境全体に、一貫したガバナンス、セキュリティ、ネットワーキングの基盤を迅速に展開したいと考えています。プラットフォーム管理チームと個々のアプリケーションチームの管理境界を明確に分離し、将来のサブスクリプション追加にも対応できる拡張性のある設計が求められています。",
  question: "Microsoftが推奨するこのような大規模組織向けの標準化されたアーキテクチャ手法はどれですか？",
  choices: [
    "全リソースを単一のサブスクリプションと単一のリソースグループにまとめて管理を簡素化する",
    "Azure Resource Managerテンプレートのみを使用してリソースを都度個別にデプロイする",
    "各アプリケーションチームに個別のMicrosoft Entraテナントを新規発行する",
    "Azure Landing Zone（Enterprise-Scale）に基づく管理グループ階層とポリシー駆動のガバナンス設計"
  ],
  answer: 3,
  explanation: "<strong>Azure Landing Zone（Enterprise-Scale）</strong>は、大規模組織がAzure環境を長期的にスケーラブルかつ一貫した方法で統治するためにMicrosoftが提唱する参照アーキテクチャです。ルート管理グループの下に「Platform」（管理・接続・IDなど中央基盤を担うサブスクリプション群）と「Landing Zones」（実際のアプリケーションワークロードを配置するサブスクリプション群、さらに用途別にCorp/Onlineなどへ分割）という管理グループ階層を構築し、Azure Policyをコードとして各階層に割り当てることで、新しいサブスクリプションを追加した瞬間に一貫したガバナンス（命名規則、必須タグ、許可リソース種類、ネットワークトポロジなど）が自動的に継承される設計になっています。プラットフォームチームとアプリケーションチームの責務も管理グループ・サブスクリプション単位で明確に分離できます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>Landing Zoneの管理グループ階層(簡略)</div><div class='exp-flow'><div class='flow-box'>ルート管理グループ</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>Platform<br>(ID/接続/管理)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>Landing Zones<br>(Corp/Online)</div></div></div><br><br>単一サブスクリプション・単一リソースグループへの集約は、サブスクリプションレベルのクォータ制限（リソース数上限など）にすぐ抵触しやすく、チーム間のRBACやポリシーの境界を細かく分離することが構造的に困難になるため、大規模環境には不適切です。アプリケーションチームごとに新規のMicrosoft Entraテナントを発行すると、ID管理・条件付きアクセス・監視がテナントの数だけ分断されてしまい、組織全体としての一元的なガバナンスや可視性が著しく損なわれます。ARMテンプレートを都度個別にデプロイするだけの運用では、階層的なポリシー適用や継続的なガバナンスの自動継承という仕組みが欠けており、拡張性に乏しくなります。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、提携するAdatum社の従業員が、自社のMicrosoft Entraアカウントの認証情報のまま、Contoso社のTeamsサイトと社内Webアプリケーションにアクセスできるようにしたいと考えています。Adatum社の従業員のために新しいアカウントをContoso社側で作成することは避けたいです。",
  question: "この要件を満たすために使用すべき機能はどれですか？",
  choices: [
    "Microsoft Entra Domain Servicesを両社間でVNetピアリングする",
    "Adatum社とContoso社のディレクトリをEntra Connectで完全同期する",
    "Microsoft Entra B2Bコラボレーションでゲストユーザーとして招待する",
    "Microsoft Entra B2Cで顧客向けディレクトリを構築する"
  ],
  answer: 2,
  explanation: "<strong>Microsoft Entra B2Bコラボレーション</strong>を使用すると、外部組織のユーザーを自社（Contoso）テナントへ<strong>ゲストユーザー</strong>として招待し、そのユーザー自身のホーム組織（Adatum社）が発行・管理するMicrosoft Entraアカウントの認証情報のままフェデレーションでサインインさせ、Contoso側のTeamsサイトやWebアプリなどのリソースへアクセスを許可できます。Contoso側で新規パスワード付きアカウントを発行する必要はなく、パスワードのライフサイクル管理（リセット、無効化など）は引き続きAdatum社側の責任範囲に留まります。アクセス許可はB2Bゲストに対してRBACやConditional Accessで通常のユーザーと同様に細かく制御できます。<br><br>Entra B2C（現Entra External ID for customers）は、一般消費者やコンシューマー向けアプリケーションの認証基盤として設計されたもので、ソーシャルログインやローカルアカウントを扱う仕組みであり、既に組織IDを持つビジネスパートラー企業との連携には通常使いません。Entra Domain Servicesは、レガシーアプリ向けにマネージドなLDAP/NTLM/Kerberos互換のドメインサービスを提供する機能であり、企業間のクラウドネイティブなゲストコラボレーションの仕組みとは異なります。ディレクトリの完全同期（Entra Connectでのオンプレ同期に相当する構成をパートナー間で行うようなアプローチ）は、外部組織のID管理・ライフサイクル制御に対する主権を失わせ、セキュリティ上もオペレーション上も複雑化するため、通常推奨されません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のFinOpsチームは、各部門のサブスクリプションで月間支出が予算を超過しそうな場合に、超過前の段階でコスト責任者にメール通知を送りたいと考えています。また、実際に予算を超過した場合は自動的にアクションを実行し、担当者への追加のエスカレーション通知も行いたいとしています。管理作業は最小限に抑えたい方針です。",
  question: "この要件を満たすために構成すべきものはどれですか？",
  choices: [
    "Azure Advisorのコスト推奨事項を毎朝手動で確認し、担当者にSlackで共有する",
    "各サブスクリプションの請求書をエクスポートし、Power BIで手動集計してしきい値超過を目視確認する",
    "Azure Cost Managementで予算（Budget）を作成し、複数のしきい値（例: 予測80%・実績100%）ごとにアラート条件を設定し、通知先にアクショングループを指定する",
    "Azure Monitorのメトリクスアラートで、VMのCPU使用率が高い場合にメール通知を送る"
  ],
  answer: 2,
  explanation: "<strong>Azure Cost Managementの予算（Budget）</strong>機能を使うと、サブスクリプションやリソースグループなどのスコープに対して月間・四半期・年間の予算額を設定し、実績額または<strong>予測額</strong>が指定したしきい値（例: 予測80%、実績100%など複数設定可能）に達した時点で自動的にアラートを発報できます。通知先に<strong>アクショングループ</strong>（Azure Monitorの共通の通知/自動化の仕組み）を指定すれば、メール通知だけでなく、実際に超過した場合にLogic AppsやAzure Functionsをトリガーして自動対応（例: 特定リソースの自動停止、Teams/Slackへの投稿）まで一気通貫で構成でき、追加の管理作業をほぼ発生させずに要件を満たせます。<br><br>Azure MonitorのメトリクスアラートはCPU使用率やディスクI/Oなどのリソースパフォーマンス指標を対象とするものであり、コスト（支出額）そのものを監視する仕組みではありません。Azure Advisorはベストプラクティスに基づく推奨事項を提示するアドバイザリー機能であり、予算超過を検知してリアルタイムに通知する仕組みは持ちません。請求書エクスポート＋手動集計は実現可能ではあるものの、「事前のしきい値通知」「超過時の自動アクション」を都度手作業で行うことになり、「管理作業は最小限に」という要件に反します。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のセキュリティ担当者は、Microsoft Defender for Cloudのダッシュボードを確認したところ、いくつかのサブスクリプションでセキュアスコアが低いことに気付きました。担当者は、具体的にどのような対応をすればスコアが向上し、どの推奨事項が最もリスク低減効果が高いかを把握したいと考えています。",
  question: "この情報を確認するために参照すべき機能はどれですか？",
  choices: [
    "Azure Advisorのコスト最適化タブ",
    "Defender for Cloudの「推奨事項（Recommendations）」ページとセキュアスコアの内訳",
    "Microsoft Sentinelの分析ルール一覧",
    "Azure Monitorのブック（Workbooks）"
  ],
  answer: 1,
  explanation: "Microsoft Defender for Cloudの<strong>推奨事項（Recommendations）</strong>ページには、各セキュリティコントロール（例：MFAの有効化、暗号化の適用、ネットワークアクセス制限など）に含まれる個々の推奨事項ごとに、それを解消した場合に<strong>セキュアスコア</strong>へ何ポイント寄与するかが明示されており、優先度の高い対応から着手するための判断材料になります。セキュアスコア自体もコントロール単位の達成率（例：MFAコントロールのうち何%が達成済みか）を可視化する設計になっており、「何をすればどれだけスコアが上がるか」を確認する目的にはこのページが直接対応します。<br><br>Azure Monitorのブックはログやメトリックを組み合わせた任意のカスタムダッシュボードを作成する汎用の可視化機能であり、セキュアスコアの算出根拠や推奨事項の一覧を標準で提供するものではありません。Microsoft Sentinelの分析ルールは脅威検知のためのクエリ定義であり、リソース構成に関する推奨事項やスコアリングとは異なる領域（インシデント検知）を扱います。Azure Advisorはコスト・パフォーマンス・信頼性・運用の卓越性・セキュリティといった複数のカテゴリにまたがる全般的な推奨を提供しますが、セキュリティに特化した詳細なスコアリングとその内訳の管理はDefender for Cloudの担当領域であり、コスト最適化タブは今回の要件と無関係です。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、通常時は全ての仮想マシンでRDPおよびSSHのインバウンドポートを閉じておき、管理者が実際に接続する必要がある場合にのみ、限定された時間・限定された送信元IPアドレスからのみ一時的にポートを開放したいと考えています。",
  question: "この要件を満たすために使用すべきMicrosoft Defender for Cloudの機能はどれですか？",
  choices: [
    "Defender for Cloud Apps条件付きアクセスアプリ制御",
    "ワークロード保護のファイルレス攻撃検出",
    "Just-In-Time（JIT）VMアクセス",
    "適応型ネットワーク強化（Adaptive Network Hardening）"
  ],
  answer: 2,
  explanation: "<strong>Just-In-Time（JIT）VMアクセス</strong>は、Defender for Cloud（Defender for Serversプランの機能）が提供する仕組みで、通常時はNSGレベルでVMへのRDP（3389）やSSH（22）などの管理ポートへのインバウンドアクセスを閉じておき、管理者が実際に接続したいタイミングでポータルやAPIからアクセス要求を行うと、指定した時間（例：1〜3時間程度）と申請元の送信元IPアドレスに限定して一時的にNSGルールが自動更新されポートが開放されます。要求時にはRBAC権限（該当のJITアクションに対する許可）のチェックも行われ、時間経過後は自動的に元の閉じた状態に戻るため、常時開放されたポートを狙った総当たり攻撃などの攻撃対象領域を最小化できます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>JIT VMアクセスの流れ</div><div class='exp-flow'><div class='flow-box hl-red'>通常時:RDP/SSH閉鎖</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>要求<br>(時間+送信元IP指定)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl-green'>一時的にポート開放</div><div class='flow-arrow'>&rarr;</div><div class='flow-box'>時間経過後<br>自動で再閉鎖</div></div></div><br><br>適応型ネットワーク強化は、実際に観測されたトラフィックパターンと脅威インテリジェンスを基に、既存のNSGルールをより厳格化するための推奨を提示する機能であり、要求に応じた時限的なポート開放という動的な仕組みではありません。ファイルレス攻撃検出はメモリ上でのみ動作するマルウェアなどを検知するワークロード保護機能であり、ネットワークポートの管理とは異なる領域です。Defender for Cloud Appsの条件付きアクセスアプリ制御は、SaaSアプリケーションのセッションをリバースプロキシ経由で制御する機能であり、IaaS仮想マシンのネットワークポート管理には関与しません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社の開発チームは、本番環境のWebアプリケーションで発生する応答遅延の原因を特定するために、個々のHTTPリクエストがどのマイクロサービスやデータベース呼び出しを経由して処理されているかを可視化し、依存関係マップやエンドツーエンドのトランザクション詳細を確認したいと考えています。",
  question: "この要件を満たすために使用すべきAzure Monitorの機能はどれですか？",
  choices: [
    "Log AnalyticsワークスペースのSyslogテーブルへのクエリ",
    "Azure Monitorのメトリック エクスプローラー",
    "Azure Service Healthのリソースヘルスアラート",
    "Application Insightsの分散トレース機能とアプリケーションマップ"
  ],
  answer: 3,
  explanation: "<strong>Application Insights</strong>はAzure Monitorのアプリケーションパフォーマンス管理（APM）機能で、SDKやOpenTelemetryベースの計装によって各リクエストに一意の操作IDを付与し、サービス境界をまたいだ呼び出しを相関づける<strong>分散トレース</strong>を実現します。1つのHTTPリクエストがどのマイクロサービス、外部呼び出し、SQLクエリを経由して処理されたかをエンドツーエンドのトランザクション詳細（Transaction Search／End-to-end transaction details）画面で時系列に確認でき、どの区間で遅延が発生しているかを特定できます。さらに<strong>アプリケーションマップ</strong>機能は、収集されたテレメトリからコンポーネント間の呼び出し関係と平均応答時間、エラー率をグラフとして自動生成し、ボトルネックの箇所を視覚的に把握できます。<br><br>Syslogテーブルは主にLinux系OSのシステムログを格納するためのLog Analyticsテーブルであり、アプリケーションレベルの分散トレースのようなリクエスト単位の相関追跡には使用できません。メトリック エクスプローラーはCPU使用率や応答時間の平均値など数値メトリックの時系列グラフを表示する機能であり、個々のトランザクションがどの経路を辿ったかという粒度の詳細までは追跡できません。Service HealthはAzureプラットフォーム側の障害・メンテナンス情報を通知する機能であり、アプリケーション内部の処理経路やパフォーマンス分析とは無関係です。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社の運用チームは、毎週土曜の深夜にメンテナンスウィンドウを設けてパッチ適用作業を行っています。この期間中は多数のアラートが発火することが予想されるため、担当者への不要な通知（メール、SMS、電話）を一時的に停止したいですが、アラート自体の記録は継続して残したいと考えています。",
  question: "この要件を満たすためにAzure Monitorで構成すべき機能はどれですか？",
  choices: [
    "アラート処理ルール（Alert Processing Rule）でメンテナンス期間中に通知を抑制するスケジュールを設定する",
    "対象のアラートルールを完全に無効化する",
    "アクショングループを削除する",
    "Log Analyticsワークスペースのデータ保持期間を一時的に短縮する"
  ],
  answer: 0,
  explanation: "<strong>アラート処理ルール（Alert Processing Rule）</strong>は、特定のスコープ（サブスクリプション、リソースグループ、個々のリソースなど）や条件、時間範囲に対して、発火したアラートに紐づくアクショングループの通知処理を「抑制（Suppress notifications）」したり、逆に別のアクショングループを追加したりできる、アラートルールとは独立したレイヤーの機能です。開始日時・終了日時（または繰り返しスケジュール）を指定して「土曜深夜のメンテナンスウィンドウ中だけ通知を止める」という条件を設定でき、この間もアラート自体の評価・発火・Azure Monitorへの履歴記録は継続されるため、後から何が起きていたかを確認できます。<br><br>アラートルール自体を無効化してしまうと、メンテナンス作業とは無関係な、本来検知すべき別の重大な問題が同時期に発生してもアラートが一切生成されなくなり、記録も失われてしまいます。アクショングループの削除は通知先設定という構成の恒久的な破棄であり、メンテナンス終了後に再設定する手間が発生する上、アラート発火自体には影響しないため通知だけを止めることもできません。Log Analyticsワークスペースのデータ保持期間の変更は、収集済みログの保存期間に関する設定であり、アラートの通知抑制とは全く無関係な設定です。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、社内で利用しているサードパーティ製SIEM（Security Information and Event Management）製品に、Azureリソースの診断ログをほぼリアルタイムでストリーミングして取り込みたいと考えています。オンプレミスに構築されたそのSIEM製品はAzure外にあります。",
  question: "診断設定の送信先として使用すべきものはどれですか？",
  choices: [
    "Azure Monitorパーティションドメトリックストア",
    "Log Analyticsワークスペース",
    "Event Hub（Event Hubからサードパーティ製品がストリームを取得または転送する）",
    "ストレージアカウント"
  ],
  answer: 2,
  explanation: "診断設定（Diagnostic Settings）の送信先として<strong>Event Hub</strong>を選択すると、対象リソースのログやメトリックが発生の都度、Event Hubへほぼリアルタイムでストリーミングされます。Event HubはAMQPやKafkaプロトコルに対応したイベントストリーミング基盤であり、オンプレミスやAzure外に構築されたサードパーティ製SIEM製品は、対応コネクタやカスタムコンシューマーを介してこのストリームを継続的に読み取ることで、低レイテンシに近い形でログを取り込めます。これはAzureのテレメトリを外部の監視基盤へ橋渡しする際の標準的な連携パターンです。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>診断設定の送信先比較</div><table class='exp-compare'><tr><th>送信先</th><th>主な用途</th></tr><tr class='hl'><td>Event Hub</td><td class='ok'>リアルタイム連携・外部SIEM</td></tr><tr><td>Log Analyticsワークスペース</td><td>クエリ分析・アラート</td></tr><tr><td>ストレージアカウント</td><td>長期アーカイブ・低コスト保管</td></tr></table></div><br><br>Log Analyticsワークスペースへの送信は、Microsoft SentinelやAzure Monitor自体のクエリ・分析基盤としての利用には最適ですが、外部のサードパーティ製品が直接そこからリアルタイムに近い形でストリームを取得する標準インターフェースは提供されておらず、通常はAPI経由のバッチ的な取得になります。ストレージアカウントへの送信は長期保存やアーカイブ、コンプライアンス目的のバッチ処理に向いており、ファイルが定期的に書き出される方式のため低レイテンシのストリーミング用途には適しません。「パーティションドメトリックストア」という送信先はAzure Monitorの診断設定として実在するオプションではありません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のセキュリティチームはMicrosoft Sentinelを導入したばかりです。Microsoft Entra IDのサインインログを取り込み、同一ユーザーが5分以内に地理的に離れた2つの国からサインインした場合（Impossible Travel）に自動的にセキュリティインシデントを作成したいと考えています。",
  question: "この要件を満たすために構成すべき組み合わせはどれですか？",
  choices: [
    "Conditional Accessでインシデント作成ポリシーを設定する",
    "Microsoft Entra ID用のデータコネクタを有効化し、スケジュールされた分析ルール（またはMicrosoft提供のテンプレート）でインシデントを作成する",
    "Log Analyticsワークスペースの保存期間を延長するだけでよい",
    "Azure Policyでサインインログの監査を強制する"
  ],
  answer: 1,
  explanation: "Microsoft Sentinelでこの検知シナリオを実現するには、2段階の構成が必要です。まず<strong>Microsoft Entra ID用のデータコネクタ</strong>を有効化し、サインインログ（およびオーディットログ）をSentinelの基盤であるLog Analyticsワークスペースへ継続的に取り込みます。その上で、地理的に離れた場所からの短時間での連続サインインを検出する<strong>分析ルール</strong>を作成・有効化します。Sentinelには「Impossible travel（不可能な移動）」のような一般的なユースケースに対応する組み込みテンプレート（多くはUEBA機能やスケジュールクエリルールとして提供）が用意されており、これをカスタマイズまたはそのまま有効化することで、条件に一致した際に自動的に<strong>セキュリティインシデント</strong>が生成されます。<br><br>Log Analyticsワークスペースの保存期間を延長するだけでは、そもそもサインインログが取り込まれていなければ検知対象データが存在せず、また検知ロジック（分析ルール）自体も実装されないため、要件を満たしません。Azure Policyはリソース構成やコンプライアンスを統治する仕組みであり、サインインログの脅威検知ロジックを提供するものではありません。「インシデント作成ポリシー」という名称のConditional Access機能は存在せず、Conditional Accessはあくまで認証時のリアルタイムなアクセス許可・拒否を扱うものであり、事後のログ分析に基づくインシデント生成という役割は担いません。",
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社のSOC（セキュリティオペレーションセンター）チームは、Microsoft Sentinelで「高リスク」と判定されたインシデントが作成された際に、担当者が確認する前に自動的に該当ユーザーアカウントを一時的に無効化し、SOCチームのTeamsチャネルに通知を送信する自動対応フローを構築したいと考えています。",
  question: "この要件を実現するために構築すべきものはどれですか？",
  choices: [
    "Logic Appsで構築したSentinelプレイブック（Playbook）を自動化ルールから呼び出す",
    "Azure Automationのランブックを手動で毎回実行する",
    "Conditional Accessのユーザーリスクポリシーのみを設定する",
    "Defender for CloudのJIT VMアクセスを設定する"
  ],
  answer: 0,
  explanation: "Microsoft Sentinelの<strong>プレイブック</strong>は、内部的にAzure <strong>Logic Apps</strong>を基盤としたSOAR（Security Orchestration, Automated Response）の実行単位です。Microsoft Graph APIコネクタを使ったユーザーアカウントの無効化操作、Teamsコネクタを使ったチャネルへのメッセージ投稿など、複数のアクションを1つのワークフローとして視覚的に（またはコードで）組み立てられます。Sentinel側の<strong>自動化ルール（Automation Rule）</strong>で「重要度が高（High）のインシデントが作成されたとき」といったトリガー条件と実行するプレイブックを紐づけておくことで、担当者の介在なしにインシデント作成をきっかけとした即時対応が自動実行されます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>SOAR自動対応の流れ</div><div class='exp-flow'><div class='flow-box hl-red'>高リスクインシデント作成</div><div class='flow-arrow'>&rarr;</div><div class='flow-box'>自動化ルール<br>(Automation Rule)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>プレイブック<br>(Logic Apps)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl-green'>アカウント無効化<br>+Teams通知</div></div></div><br><br>Azure Automationのランブックを「手動で毎回実行する」方式は、担当者が確認する前の自動対応という要件そのものに反します（自動化ルールからランブックをトリガーするのであれば選択肢として有効ですが、ここでは手動実行が明示されているため不適切です）。JIT VMアクセスはVMの管理ポート（RDP/SSH）へのネットワークアクセスを時限的に許可する機能であり、ユーザーアカウントの無効化やインシデント対応ワークフローとは全く異なる領域です。Conditional Accessのユーザーリスクポリシーはサインイン時のリスク評価に基づく制御に限定され、Sentinelのインシデントをトリガーとした複合的な自動対応（アカウント無効化とTeams通知の組み合わせ）を実装する仕組みは持ちません。",
},
  // ── データストレージ ──────────────────────────────

{
  domain: "データストレージ",
  scenario: "Contoso社はオンプレミスのSQL Server 2016インスタンスを運用しており、複数のデータベース間をまたぐSQL Server Agentジョブ、クロスデータベーストランザクション、リンクサーバーを多用しています。Azureへ移行するにあたり、アプリケーションコードの変更を最小限に抑えつつ、これらのインスタンスレベル機能をそのまま利用でき、かつ運用管理の負荷を最小化したいと考えています。",
  question: "この要件を満たすために選択すべきAzureのデータベースサービスはどれですか？",
  choices: [
    "Azure SQL Database（単一データベース）",
    "Azure SQL Database エラスティックプール",
    "Azure SQL Managed Instance",
    "SQL Server on Azure Virtual Machines"
  ],
  answer: 2,
  explanation: "<strong>Azure SQL Managed Instance</strong>はSQL Serverのデータベースエンジンをほぼそのままインスタンス単位でPaaS化したサービスで、クロスデータベースクエリ・トランザクション、リンクサーバー、SQL Server Agentジョブ、CDC、CLRなど、単一データベースでは提供されないインスタンススコープの機能を高い互換性で利用できます。パッチ適用・バックアップ・OSメンテナンスはAzureが自動的に行うため、VMでのセルフ管理に比べて運用負荷が大幅に下がります。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>サービス選択比較</div><table class='exp-compare'><tr><th>サービス</th><th>インスタンス機能</th><th>運用負荷</th></tr><tr class='hl'><td>SQL Managed Instance</td><td class='ok'>クロスDB・リンクサーバー等 可</td><td class='ok'>低（PaaS）</td></tr><tr><td>SQL Database（単一）</td><td class='ng'>不可</td><td class='ok'>低</td></tr><tr><td>SQL Server on VM</td><td class='ok'>フル互換</td><td class='ng'>高（自己管理）</td></tr></table></div><br><br><strong>Azure SQL Database（単一データベース）</strong>と<strong>エラスティックプール</strong>はデータベース単位の抽象化であり、そもそもインスタンスという概念が存在しないため、クロスデータベーストランザクションやリンクサーバー、SQL Server Agentは利用できません。<strong>SQL Server on Azure Virtual Machines</strong>はOSレベルまで含めて完全な互換性を持ちますが、パッチ適用やSQL Serverのインストール・アップグレードを自社で行う必要があり、「運用管理の負荷を最小化したい」という要件には合致しません。<br><br>なお、オンプレミスSQL Serverからの移行では、ダウンタイムをほぼゼロに抑えられる<strong>Managed Instance link</strong>（分散可用性グループに似た継続的なデータ同期機能）も用意されており、段階的な移行やハイブリッド構成にも対応できます。",
},
{
  domain: "データストレージ",
  scenario: "Fabrikam社はAzure Database for PostgreSQLを新規に構築するアプリケーションのバックエンドとして使用する予定です。可用性ゾーン間でのゾーン冗長な高可用性構成を実現し、プライマリのゾーンで障害が発生した場合に自動的にスタンバイサーバーへフェイルオーバーできるようにする必要があります。",
  question: "この要件を満たすために構成すべき内容として最も適切なものはどれですか？",
  choices: [
    "Azure Database for PostgreSQL フレキシブルサーバーの読み取りレプリカを別ゾーンに作成する",
    "Azure Database for PostgreSQL 単一サーバー（Single Server）を複数リージョンにデプロイする",
    "Azure Database for PostgreSQL フレキシブルサーバーでゾーン冗長高可用性（Zone-redundant HA）を有効にする",
    "Azure Cache for Redisをフレキシブルサーバーの前段に配置してキャッシュ経由でアクセスする"
  ],
  answer: 2,
  explanation: "<strong>Azure Database for PostgreSQL フレキシブルサーバー</strong>の<strong>ゾーン冗長高可用性（Zone-redundant HA）</strong>は、プライマリと同期レプリケーションされたスタンバイサーバーを別の可用性ゾーンに自動配置し、プライマリの可用性ゾーンで障害が起きた場合でも自動検知・自動フェイルオーバーによってダウンタイムを最小化します。同一ゾーン内にスタンバイを置く「同一ゾーンHA」も選択できますが、本問のようにゾーン障害への耐性が必要な場合はゾーン冗長を選びます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>ゾーン冗長HAの構成</div><div class='exp-flow'><div class='flow-box hl'>プライマリ<br>(ゾーン1)</div><div class='flow-arrow'>&rarr;<br>同期レプリケーション</div><div class='flow-box'>スタンバイ<br>(ゾーン2)</div><div class='flow-arrow'>&rarr;<br>ゾーン1障害時</div><div class='flow-box hl-green'>自動フェイルオーバー<br>(ゾーン2が新プライマリ)</div></div></div><br><br><strong>単一サーバー（Single Server）</strong>デプロイモデルはMicrosoftによって廃止が進められている旧世代の提供形態で、ゾーン冗長HAという概念自体を持ちません。複数リージョンへのデプロイはリージョン障害対策にはなりますが、それ自体は自動フェイルオーバーの仕組みを構成するものではありません。<strong>読み取りレプリカ</strong>は非同期レプリケーションであり、プライマリ障害時に自動的にレプリカが昇格することはなく、手動または明示的な操作での昇格が必要なため要件を満たしません。<strong>Azure Cache for Redis</strong>はキャッシュ層でありデータベースの可用性には関与しません。<br><br>Azure SQL Databaseのゾーン冗長構成（Premium/Business Criticalティア）と考え方は似ていますが、PostgreSQLフレキシブルサーバーではHAはサーバー作成時またはあとから明示的に有効化するオプトイン機能である点に注意してください。",
},
{
  domain: "データストレージ",
  scenario: "Woodgrove社はAzure Database for MySQL フレキシブルサーバーで運用している基幹システムのデータベースに対して、社内のBIチームが日次レポートを作成するために大量の読み取りクエリを実行しています。このレポート用クエリが本番の書き込みトランザクションの性能に影響を与えないようにしたいと考えています。",
  question: "この要件を満たすために実施すべきことはどれですか？",
  choices: [
    "MySQLフレキシブルサーバーのコンピューティング層のvCore数を増やす",
    "MySQLフレキシブルサーバーのバックアップ保持期間を延長する",
    "MySQLフレキシブルサーバーの読み取りレプリカを作成し、BIチームのクエリをレプリカに向ける",
    "Azure Cache for RedisをMySQLの前段に配置し、すべての読み取りをキャッシュ経由にする"
  ],
  answer: 2,
  explanation: "Azure Database for MySQL フレキシブルサーバーの<strong>読み取りレプリカ</strong>は、プライマリサーバーからバイナリログベースの非同期レプリケーションによってデータを複製する読み取り専用のサーバーです。BIチームのレポートクエリをこのレプリカへ向けることで、重い読み取り負荷が本番の書き込みトランザクションを実行するプライマリのリソース（CPU、I/O、接続数）を消費しなくなり、性能分離を実現できます。<br><br><strong>vCore数の増加</strong>はプライマリ全体のリソースを底上げするだけで、読み取りと書き込みが同じインスタンス上でリソースを奪い合う構造そのものは変わらず、コストだけが増加します。<strong>Azure Cache for Redis</strong>によるキャッシュは、更新頻度の高い日次集計やアドホックなSQLクエリには不向きで、キャッシュの整合性維持や複雑な集計ロジックの実装コストもかさみます。<strong>バックアップ保持期間の延長</strong>は障害復旧の要件であり、読み取り負荷分散とは無関係です。<br><br>類似の目的でAzure SQL Databaseでは、Business Critical/Premiumティアであれば追加コストなしの<strong>読み取りスケールアウト</strong>用セカンダリが利用できますが、MySQLフレキシブルサーバーでは読み取りレプリカを明示的に作成する必要があり、レプリカ数に応じた追加課金が発生する点が異なります。",
},
{
  domain: "データストレージ",
  scenario: "Adventure Works社は数千件のPDFやWord文書をAzure Blob Storageに保存しています。社内ポータルから、これらの文書本文をキーワードで全文検索できるようにし、さらにスキャンされた画像内の文字もOCRで抽出して検索対象に含めたいと考えています。",
  question: "この要件を満たすために使用すべきAzureサービスはどれですか？",
  choices: [
    "Azure Table Storageのクエリ機能",
    "Blob Storageのメタデータタグによるフィルタリング",
    "Azure Cosmos DBの組み込みフルテキストインデックス",
    "Azure AI Search（インデクサーとOCRスキルを使用したスキルセット）"
  ],
  answer: 3,
  explanation: "<strong>Azure AI Search</strong>はBlob Storage上のドキュメントを取り込む<strong>インデクサー</strong>と、AIによる拡張処理を行う<strong>スキルセット</strong>を組み合わせることで、PDFやWord文書のテキスト抽出に加え、組み込みの<strong>OCRスキル</strong>によってスキャン画像内の文字も認識し、検索可能な全文インデックスに統合できます。抽出したテキストと元の構造化データ（メタデータなど）を1つのインデックスにマッピングし、キーワード検索・フィルター・ファセットなど高度な検索機能を提供できる点も強みです。<br><br><strong>Table Storage</strong>や<strong>Cosmos DB</strong>はいずれもデータの保存・クエリを担うストア型サービスであり、非構造化文書に対する全文検索エンジンやOCRパイプラインを内蔵していません（Cosmos DBにも簡易な全文/ベクター検索機能はありますが、文書ファイル自体の解析やOCRは行いません）。<strong>Blob Storageのメタデータタグ</strong>はキーと値のペア（タグ）による絞り込みに限定され、文書本文の内容を検索対象にはできません。<br><br>OCRやレイアウト解析だけを目的とするなら<strong>Azure AI Document Intelligence（旧Form Recognizer）</strong>という専用サービスもありますが、本問のように「全文検索」という検索体験自体を構築する場合は、そのDocument IntelligenceのAIスキルをAI Searchのスキルセットに組み込んで使うか、AI Search組み込みのOCRスキルを使うのが一般的です。",
},
{
  domain: "データストレージ",
  scenario: "Tailwind Traders社は数百万件のデバイスイベントログを保存する必要があります。各レコードはパーティションキーと行キーで一意に識別でき、スキーマは緩やかで、複雑なJOINや集計クエリは不要です。可能な限り低コストでシンプルなキー・バリュー型のストレージを求めています。",
  question: "この要件に最も適したAzureストレージサービスはどれですか？",
  choices: [
    "Azure Table Storage",
    "Azure SQL Database",
    "Azure Cosmos DB（プロビジョニング済みスループット）",
    "Azure Files"
  ],
  answer: 0,
  explanation: "<strong>Azure Table Storage</strong>は、<strong>パーティションキー</strong>と<strong>行キー</strong>の組み合わせでエンティティを一意に識別するスキーマレスなNoSQLキー・バリューストアです。同一パーティションキー内では強い整合性を持つ高速なポイントクエリが可能で、複雑なJOINや集計を必要としない大量データの単純なCRUD操作を、Azureのストレージサービスの中でも際立って低いコストで処理できます。<br><br><strong>Azure SQL Database</strong>はリレーショナルモデルとトランザクション整合性を提供しますが、スキーマ管理やライセンス相当のコンピューティング課金が発生し、単純なイベントログ保存にはオーバースペックです。<strong>Cosmos DB（プロビジョニング済みスループット）</strong>も同様のキー・バリュー用途に使えますが、単一桁ミリ秒のグローバルSLAやマルチリージョン書き込みが不要であれば、Table Storageの方が明確に低コストです。<strong>Azure Files</strong>はSMB/NFSのファイル共有サービスであり、レコード単位の構造化データのクエリには適していません。<br><br>なお<strong>Azure Cosmos DB for Table（Table API）</strong>は、Table Storageと同じAPI・データモデルを保ちながらグローバル分散や保証されたSLAを追加した上位互換サービスです。「可能な限り低コスト」という要件がなければCosmos DB for Tableへの移行も選択肢になりますが、本問の要件（低コスト・シンプル）には純粋なTable Storageの方が適しています。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社のWebアプリケーションはApp Service上で複数インスタンスにスケールアウトされています。ユーザーのセッション状態をインスタンス間で共有し、かつ非常に低いレイテンシで読み書きできるようにする必要があります。",
  question: "セッション状態のストアとして使用すべきAzureサービスはどれですか？",
  choices: [
    "Azure Files（Premiumティア）",
    "Azure Blob Storage",
    "Azure Queue Storage",
    "Azure Cache for Redis"
  ],
  answer: 3,
  explanation: "<strong>Azure Cache for Redis</strong>はメモリ上でデータを保持するインメモリ型のキー・バリューストアであり、ディスクI/Oを介さないためミリ秒未満クラスの非常に低いレイテンシで読み書きできます。ASP.NET Core向けの分散セッション状態プロバイダーなどとも標準的に統合されており、複数のApp Serviceインスタンスが同一のRedisインスタンスを参照することで、どのインスタンスにリクエストがルーティングされてもセッション状態を共有できます。<br><br><strong>Blob Storage</strong>はディスクベースのオブジェクトストレージであり、小さなオブジェクトへの高頻度な読み書きにはAPI呼び出しのオーバーヘッドも含めてRedisよりはるかに高いレイテンシを伴います。<strong>Queue Storage</strong>はメッセージの一時的な受け渡しを目的としたキューであり、任意のキーで状態を参照・更新する用途には設計されていません。<strong>Azure Files（Premiumティア）</strong>はSMB/NFSのファイル共有であり、ネットワークファイルI/Oを介するためインメモリキャッシュに比べレイテンシが高く、セッションストアとしては非効率です。<br><br>App Serviceには複数インスタンス間でクライアントを同一インスタンスに固定する「ARRアフィニティ（スティッキーセッション）」という代替策もありますが、これはスケールイン/インスタンス障害時にセッションが失われるため、可用性が求められる本番環境では外部セッションストア（Redis）を使うのが標準的なパターンです。",
},
{
  domain: "データストレージ",
  scenario: "Northwind社は現在オンプレミスでApache Cassandraクラスターを運用しており、既存アプリケーションはCassandra Query Language (CQL) ドライバーを使用しています。Azureへ移行するにあたり、アプリケーションコードとドライバーの変更を最小限に抑えたいと考えています。",
  question: "この要件を満たすために選択すべきAzureのデータベースサービスはどれですか？",
  choices: [
    "Azure Database for PostgreSQL フレキシブルサーバー",
    "Azure Table Storage",
    "Azure Cosmos DB for Apache Cassandra",
    "Azure Cosmos DB for NoSQL"
  ],
  answer: 2,
  explanation: "<strong>Azure Cosmos DB for Apache Cassandra</strong>は、CassandraのワイヤプロトコルレベルでAPI互換性を提供するため、既存のCQL（Cassandra Query Language）ドライバーやツールをほぼそのまま使い続けながら、バックエンドをマネージドなCosmos DBに置き換えることができます。これにより、アプリケーションコードの変更を最小限に抑えたリフト＆シフト型の移行が可能になります。<br><br><strong>Cosmos DB for NoSQL</strong>は独自のSQL風クエリ構文と専用SDKを使用するAPIであり、CQLドライバーからは接続できず大幅なコード書き換えが必要です。<strong>PostgreSQL フレキシブルサーバー</strong>はリレーショナルデータベースであり、Cassandraのワイドカラム型データモデルともCQLとも互換性がありません。<strong>Table Storage</strong>は独自のREST APIを持つキー・バリューストアであり、CQLプロトコルはサポートしていません。<br><br>Cassandra APIは互換性レイヤーであるため、Cassandra固有の一部の高度な機能（特定のマテリアライズドビューの挙動やカスタムのユーザー定義関数など）は完全にはサポートされない場合があり、移行時には対象アプリケーションが使用しているCQL機能の互換性を事前に確認することが推奨されます。",
},
{
  domain: "データストレージ",
  scenario: "Litware社は新規に立ち上げるプロトタイプアプリケーションでAzure Cosmos DBを使用する予定です。トラフィックは非常に不規則で、日によってはほとんどアクセスがなく、突発的にスパイクすることもあります。事前に一定のスループットをプロビジョニングして支払うことは避け、実際に使用した分だけ課金されるようにしたいと考えています。",
  question: "この要件に最も適したCosmos DBの構成はどれですか？",
  choices: [
    "サーバーレス容量モード（Serverless）を使用する",
    "専用ゲートウェイを備えたCosmos DBを使用する",
    "手動スループット（プロビジョニング済みスループット）を最小値で設定する",
    "オートスケール（自動スケール）スループットを設定する"
  ],
  answer: 0,
  explanation: "<strong>Cosmos DBのサーバーレス容量モード</strong>は、事前にRU/sをプロビジョニングする必要がなく、実際に処理したリクエストに対して消費したリクエストユニット（RU）の量に応じて従量課金される請求モデルです。アクセスが少ない時間帯はほぼ課金が発生せず、突発的なスパイクにも自動的に対応できるため、トラフィックが予測不能で不規則なプロトタイプやスモールスタートのワークロードに最適です。<br><br><strong>手動スループット（最小値設定）</strong>や<strong>オートスケール</strong>は、いずれも設定した最小/上限値に対して常時なんらかの固定的な課金（オートスケールの場合は設定した最大RUの一定割合が最低保証RUとして課金される）が発生するため、アクセスがほとんどない時間帯が多いワークロードではコスト効率が悪くなります。<strong>専用ゲートウェイ</strong>はDedicated Gatewayによる統合キャッシュ機能を指し、課金モデルの選択とは別軸の話です。<br><br>サーバーレスにはコンテナー単位のストレージ容量やスループットに一定の上限があり、マルチリージョン書き込みのようなグローバル分散機能もサポート対象外である点には注意が必要です。本番の大規模・安定した高トラフィックワークロードでは、オートスケールやプロビジョニング済みスループットの方が総コストで有利になる場合があります。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社はAzure Cosmos DB for NoSQLで顧客の注文データを管理しています。特定の大口顧客IDに関連するドキュメントの書き込みが集中し、そのパーティションだけがリクエストユニットの上限に達してスロットリングされる問題が発生しています。",
  question: "この問題を解決するために見直すべき設計要素はどれですか？",
  choices: [
    "コンテナーのTTL（Time to Live）を短く設定する",
    "整合性レベルをStrongからEventualに変更する",
    "コンテナーのインデックスポリシーをすべてのプロパティに対して有効化する",
    "パーティションキーの選択を見直し、より均等に分散するキー（例：顧客IDと日付の複合キー）に変更する"
  ],
  answer: 3,
  explanation: "Cosmos DBは内部的にデータを物理パーティションに分散して格納しており、各論理パーティション（同一パーティションキー値を持つデータ群）は特定の物理パーティションに固定的にマッピングされます。特定のパーティションキー値（大口顧客ID）に書き込みが集中すると、そのキーが属する物理パーティションだけがRUの上限に達して「ホットパーティション」となりスロットリング（429エラー）が発生します。<strong>パーティションキーの選択を見直し</strong>、顧客IDと日付の複合キーのような高いカーディナリティを持つキーに変更することで、負荷を多数の物理パーティションへ均等に分散でき、根本的な解決になります。<br><br><strong>インデックスポリシー</strong>は書き込み時のインデックス更新コスト（RU消費）やクエリ性能には影響しますが、特定パーティションへのアクセス集中という偏りの問題自体は解消しません。<strong>整合性レベルの変更（Strong→Eventual）</strong>はレイテンシや一部RUコストの低減にはつながる可能性がありますが、パーティション間の負荷不均衡というホットパーティション問題の本質的な原因には対処できません。<strong>TTL</strong>は古いデータの自動削除機能であり、負荷分散とは無関係です。<br><br>設計時には、既存のパーティションキーに日付・ハッシュ値・エンティティIDなどを付加する「合成（シンセティック）パーティションキー」を用いることが一般的な回避パターンとして知られています。",
},
{
  domain: "データストレージ",
  scenario: "Fabrikam社は重要な契約書ファイルをAzure Blob Storageに保存しています。運用担当者の誤操作や悪意のあるスクリプトによってBlobが誤って上書きまたは削除された場合でも、過去のバージョンに復元できるようにしたいと考えています。",
  question: "この要件を満たすために有効化すべき機能の組み合わせはどれですか？",
  choices: [
    "ライフサイクル管理ポリシーによるArchiveティアへの自動移行",
    "ストレージアカウントのRA-GRS冗長性への変更",
    "Blobの論理削除（Soft Delete）とBlobバージョニング",
    "Blobの不変ストレージ（時間ベースの保持ポリシー）のみ"
  ],
  answer: 2,
  explanation: "<strong>Blobの論理削除（Soft Delete）</strong>は、削除操作が行われても実データを一定の保持期間内は内部的に保持し、その期間内であれば元に戻せる機能です。一方<strong>Blobバージョニング</strong>は、Blobが上書き更新されるたびに以前の内容を新しい「バージョン」として自動的に保存する機能で、誤った上書きに対しても過去の任意のバージョンへロールバックできます。この2つを組み合わせることで、削除にも上書きにも対応できる包括的な誤操作対策になります。<br><br><strong>不変ストレージ（時間ベースの保持ポリシー）</strong>はWORM（Write Once Read Many）を実現し、保持期間中は変更・削除そのものを禁止するコンプライアンス向けの機能で、通常業務で頻繁に更新が発生する契約書管理には適していません。<strong>ライフサイクル管理ポリシー</strong>はアクセス頻度に応じたアクセス層の自動変更（コスト最適化）のための機能であり、誤削除・誤上書きからの保護機能ではありません。<strong>RA-GRS</strong>への冗長性変更はリージョン障害に備えたセカンダリリージョンでの読み取りアクセスを可能にしますが、アプリケーションやユーザーの誤操作によるデータの上書き・削除そのものは、レプリケーションを通じてセカンダリ側にも反映されてしまうため防げません。<br><br>より粒度の細かい復元が必要な場合には、ストレージアカウント全体または特定のコンテナーを指定日時の状態に一括復元できる<strong>ポイントインタイムリストア（Blob単位）</strong>機能もあり、バージョニングと合わせて検討されることがあります。",
},
{
  domain: "データストレージ",
  scenario: "Woodgrove社はBlob Storageに大量の画像ファイルを保存しています。最後にアクセスされてから30日間アクセスがないBlobは自動的にCoolティアへ、180日間アクセスがないBlobはArchiveティアへ移動させ、運用担当者が手動で管理する手間をなくしたいと考えています。",
  question: "この要件を最も効率的に実現する方法はどれですか？",
  choices: [
    "すべてのBlobを最初からArchiveティアで保存し、アクセス時にHotティアへ手動で戻す",
    "Azure Functionsで定期的にBlobのアクセス日時をチェックし、ティアを変更するコードを実装する",
    "Azure Data FactoryでBlobのメタデータを毎日スキャンし、パイプラインでティア変更する",
    "ストレージアカウントのライフサイクル管理ポリシーを設定し、最終変更日または最終アクセス日を基準としたルールを定義する"
  ],
  answer: 3,
  explanation: "<strong>ライフサイクル管理ポリシー</strong>はストレージアカウントに定義するルールベースの自動化機能で、Blobの最終変更日、または（アクセス追跡を有効にした場合の）最終アクセス日を条件として、指定日数が経過したBlobを自動的にCoolやArchiveなどの下位アクセス層へ移動したり削除したりできます。JSON形式でルールを1度定義すれば以降は完全にマネージドで動作するため、運用担当者の手作業を排除できます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>ライフサイクル管理のタイムライン</div><div class='exp-timeline'><div class='tl-point'><div class='tl-time'>0日</div><div class='tl-label'>Hotティア（最終アクセス）</div></div><div class='tl-point'><div class='tl-time'>30日</div><div class='tl-label'>Coolティアへ自動移行</div></div><div class='tl-point tl-danger'><div class='tl-time'>180日</div><div class='tl-label'>Archiveティアへ自動移行</div></div></div></div><br><br><strong>Azure Functions</strong>による独自実装は動作こそしますが、スケジュール実行の管理、Blob一覧の走査、エラーハンドリングなどを自前で構築・保守する必要があり、既にマネージドで提供されている機能を再発明することになります。<strong>Data Factory</strong>によるスキャンとパイプライン化も同様に不要な複雑さとコストを伴います。<strong>最初からArchiveティアで保存し手動で戻す</strong>方法は、Archiveからの復元（リハイドレート）に数時間から場合によっては1日以上かかる上、アクセス頻度に応じた自動的な最適化にもなっていません。<br><br>最終アクセス日基準のルールを使う場合は、ストレージアカウントで「アクセス時間の追跡（Last Access Time Tracking）」を別途有効化しておく必要がある点に注意してください。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社はAzure SQL Databaseを運用しており、過去35日以内の任意の時点のデータベース状態に復元できる機能に加えて、コンプライアンス要件により過去10年分のバックアップを法的に保持する必要があります。",
  question: "これらの要件をそれぞれ満たす機能の組み合わせはどれですか？",
  choices: [
    "ポイントインタイムリストア（PITR）と長期保持（LTR）ポリシーを組み合わせて使用する",
    "ジオレプリケーションのみで両方の要件を満たす",
    "手動でのエクスポート（BACPAC）を毎日実行し、Blob Storageに10年間保存する",
    "Transactional Replicationを構成し、レプリカを10年間保持する"
  ],
  answer: 0,
  explanation: "Azure SQL Databaseは自動的に完全・差分・ログバックアップを取得し、これに基づく<strong>ポイントインタイムリストア（PITR）</strong>によって、保持期間内（既定は7日、最大35日まで延長可能）であれば任意の時刻の状態にデータベースを復元できます。過去10年分のような長期保持が必要な場合は、別途<strong>長期保持（LTR）ポリシー</strong>を設定し、週次・月次・年次バックアップのスナップショットを最長10年間、専用のストレージに保持させることができます。両者は補完関係にあり、組み合わせることで「直近の任意時点への復元」と「長期のコンプライアンス保持」という異なる要件を同時に満たせます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>PITRとLTRの保持期間</div><div class='exp-timeline'><div class='tl-point'><div class='tl-time'>現在〜35日前</div><div class='tl-label'>PITRで任意時点へ復元可能</div></div><div class='tl-point tl-danger'><div class='tl-time'>最長10年</div><div class='tl-label'>LTRで週次/月次/年次バックアップを保持</div></div></div></div><br><br><strong>ジオレプリケーション</strong>（アクティブgeoレプリケーションやフェイルオーバーグループ）は可用性向上のための機能であり、過去の任意時点への巻き戻しや長期保存の仕組みは持ちません。<strong>手動でのBACPACエクスポート</strong>は運用負荷が高く、粒度の細かいポイントインタイム復元にも向いていません。<strong>Transactional Replication</strong>はデータの継続的な同期を行う仕組みであり、バックアップの長期保持とは異なる概念です。<br><br>類似の要件をAzure Blob StorageやVMのデータに対して実現したい場合は<strong>Azure Backup</strong>という別サービスを使いますが、SQL Databaseの場合はサービスに組み込まれたPITR/LTR機能で完結する点がVMバックアップとの違いです。",
},
{
  domain: "データストレージ",
  scenario: "Adventure Works社はAzure SQL Databaseにクレジットカード情報の一部を格納しています。データベース管理者を含め、いかなるユーザーもアプリケーション層を経由せずに直接データベースへ問い合わせても、この列の平文の値を参照できないようにする必要があります。",
  question: "この要件を満たすために使用すべき機能はどれですか？",
  choices: [
    "動的データマスキング",
    "Always Encrypted",
    "行レベルセキュリティ（RLS）",
    "透過的データ暗号化（TDE）"
  ],
  answer: 1,
  explanation: "<strong>Always Encrypted</strong>は、暗号化・復号の処理をデータベースエンジンの外部、すなわちクライアントアプリケーションのドライバー側で行う点が最大の特徴です。暗号鍵（列暗号化キー・列マスターキー）はデータベースエンジンから隔離された場所（クライアント環境やAzure Key Vaultなど）で管理されるため、DBA（データベース管理者）を含め、SQLクエリを直接実行できる権限を持つ誰であっても、暗号化された列の平文値をデータベース側から参照することはできません。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>データ保護機能の比較</div><table class='exp-compare'><tr><th>機能</th><th>保護対象</th><th>DBAからも秘匿</th></tr><tr class='hl'><td>Always Encrypted</td><td>列の値（クライアント側で暗号化）</td><td class='ok'>可能</td></tr><tr><td>TDE</td><td>ディスク上のファイル</td><td class='ng'>不可（復号済みで返る）</td></tr><tr><td>動的データマスキング</td><td>クエリ結果の表示のみ</td><td class='ng'>不可（高権限者は解除可）</td></tr><tr><td>行レベルセキュリティ</td><td>アクセス可能な行</td><td class='ng'>対象外（列の値は暗号化されない）</td></tr></table></div><br><br><strong>動的データマスキング</strong>はクエリ結果の表示時にのみマスク処理を適用する仕組みであり、実データ自体は暗号化されず平文のまま保存されるため、UNMASK権限やdb_owner相当の高権限を持つユーザーは元の値を取得できてしまいます。<strong>透過的データ暗号化（TDE）</strong>はディスクファイル（データファイル、ログ、バックアップ）レベルでの保存時暗号化であり、正当な認証情報でクエリを実行すればエンジンが自動的に復号した結果を返すため、権限を持つユーザーからの秘匿にはなりません。<strong>行レベルセキュリティ（RLS）</strong>はユーザーごとにアクセスできる行を制限する機能であり、列の値自体を暗号化するものではありません。<br><br>近年ではAlways Encryptedに加えて「セキュアエンクレーブを使用したAlways Encrypted」という拡張もあり、暗号化されたデータに対するパターンマッチングや範囲比較など、通常のAlways Encryptedでは実行できない一部の演算をエンクレーブ内で安全に行えるようになっています。",
},
{
  domain: "データストレージ",
  scenario: "Tailwind Traders社はストレージアカウントに保存された重要な財務データについて、プライマリリージョン内でゾーン冗長性を持たせつつ、同時にセカンダリリージョンでも読み取りアクセスが可能な最高レベルの可用性を求めています。",
  question: "この要件を満たすストレージ冗長性オプションはどれですか？",
  choices: [
    "ZRS（ゾーン冗長ストレージ）",
    "LRS（ローカル冗長ストレージ）",
    "GRS（geo冗長ストレージ）",
    "RA-GZRS（読み取りアクセス地理ゾーン冗長ストレージ）"
  ],
  answer: 3,
  explanation: "<strong>RA-GZRS（読み取りアクセス地理ゾーン冗長ストレージ）</strong>は、プライマリリージョン内でデータを3つの可用性ゾーンに同期複製する<strong>ゾーン冗長ストレージ（ZRS）</strong>の特性と、地理的に離れたセカンダリリージョンへの非同期レプリケーション（GRS相当）、さらにセカンダリリージョンのデータへの読み取り専用アクセスを組み合わせた、Azure Storageの冗長性オプションの中で最も可用性の高い構成です。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>ストレージ冗長性の選択</div><div class='exp-decision'><div class='dec-row dec-yes'><span class='dec-cond'>ゾーン冗長 + セカンダリリージョンでの読み取りが必要？</span><span class='dec-arrow'>&rarr;</span><span class='dec-result'>RA-GZRS</span></div><div class='dec-row'><span class='dec-cond'>ゾーン障害への耐性のみ必要？</span><span class='dec-arrow'>&rarr;</span><span class='dec-result'>ZRS</span></div><div class='dec-row'><span class='dec-cond'>リージョン障害からの復旧のみ（読み取り不要）？</span><span class='dec-arrow'>&rarr;</span><span class='dec-result'>GRS</span></div><div class='dec-row'><span class='dec-cond'>単一データセンター内の冗長化で十分？</span><span class='dec-arrow'>&rarr;</span><span class='dec-result'>LRS</span></div></div></div><br><br><strong>LRS</strong>は単一データセンター内の複数の物理ストレージユニットへの複製に留まり、データセンター障害やリージョン障害には耐えられません。<strong>ZRS</strong>はゾーン（データセンター単位）障害への耐性を持ちますが、リージョン全体の障害には対応せず、セカンダリリージョンへのレプリケーションもありません。<strong>GRS</strong>はセカンダリリージョンへのレプリケーションは行いますが、プライマリ側はLRS相当（単一データセンター内での冗長化）にとどまり、かつセカンダリへの読み取りアクセスは既定では提供されません（読み取りアクセスにはRA-GRSが必要）。<br><br>GZRS/RA-GZRSはすべてのAzureリージョンでサポートされているわけではなく、ペアリージョンが可用性ゾーンをサポートしている必要がある点にも留意してください。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社は東日本リージョンのストレージアカウントにマスターデータのBlobを保存しています。西日本リージョンにあるアプリケーションから同じデータを低レイテンシで読み取れるように、Blobが作成・更新されるたびに自動的に西日本リージョンの別のストレージアカウントへ非同期でコピーしたいと考えています。障害復旧目的のレプリケーションではなく、あくまで読み取り性能の向上が目的です。",
  question: "この要件を満たすために使用すべき機能はどれですか？",
  choices: [
    "Azure Data Factoryでリアルタイムのコピーパイプラインを構築する",
    "ストレージアカウントの冗長性をGRSに変更する",
    "Blobのオブジェクトレプリケーション（Object Replication）を構成する",
    "AzCopyでcronジョブを使い定期的に同期する"
  ],
  answer: 2,
  explanation: "<strong>オブジェクトレプリケーション（Object Replication）</strong>は、ソースとデスティネーションという任意の2つのストレージアカウント（異なるリージョンでも可）間で、Blobの変更（作成・更新）を非同期に自動コピーする機能です。ポリシーでレプリケーションルールを定義するだけで、Blobの作成・更新のたびに自動的にコピーが行われ、レイテンシの低減や読み取り性能の向上を目的とした構成に利用されます。利用にはソース・デスティネーション双方でBlobバージョニングと変更フィード機能を有効にしておく必要があります。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>オブジェクトレプリケーションの流れ</div><div class='exp-flow'><div class='flow-box hl'>東日本<br>(ソース アカウント)</div><div class='flow-arrow'>&rarr;<br>非同期コピー<br>（作成・更新のたび）</div><div class='flow-box'>西日本<br>(デスティネーション アカウント)</div></div></div><br><br><strong>GRSへの冗長性変更</strong>はディザスタリカバリ目的の内部レプリケーションであり、通常運用中はセカンダリのデータに直接アクセスできず（RA-GRSでも読み取り専用のフェイルオーバー待機用）、任意の別ストレージアカウントへ能動的にコピーする機能ではありません。<strong>AzCopyによるcronジョブ</strong>は手動でのスケジュール管理や差分検出ロジックの実装が必要で、リアルタイム性やマネージド性に欠けます。<strong>Data Factory</strong>のパイプラインもバッチ的なコピーには向きますが、Blobごとのイベント発生と同時に近い形で反映する用途にはオーバーヘッドが大きく、コストも高くなります。<br><br>類似の「複数リージョンでの低レイテンシ読み取り」をコンテンツ配信の文脈で実現したい場合は<strong>Azure CDN／Azure Front Door</strong>によるキャッシュ配信という選択肢もありますが、これはエッジでのキャッシュであり、宛先ストレージアカウントへの実体コピーを目的とするオブジェクトレプリケーションとは性質が異なります。",
},
{
  domain: "データストレージ",
  scenario: "Fabrikam社はオンプレミスのファイルサーバーをAzure Filesに移行する予定です。オンプレミスのActive Directory Domain Services (AD DS) に参加している既存のクライアントPCから、これまでと同じNTFSベースのアクセス許可（DACL）を使ってAzure Filesの共有にシームレスにアクセスできるようにする必要があります。",
  question: "Azure Filesで構成すべき認証方式はどれですか？",
  choices: [
    "匿名アクセス（パブリックアクセス）",
    "オンプレミスActive Directory Domain Services (AD DS) 認証",
    "ストレージアカウントキーによる認証",
    "Shared Access Signature（SAS）による認証"
  ],
  answer: 1,
  explanation: "Azure Filesは<strong>オンプレミスActive Directory Domain Services（AD DS）認証</strong>をサポートしており、オンプレミスADドメインに参加済みのクライアントは、Kerberos認証チケットを使ってSMB共有にサインインし、共有レベルのアクセス許可に加えて、使い慣れたNTFSライクなディレクトリ・ファイル単位のアクセス制御リスト（DACL）をそのまま適用できます。この方式では、オンプレミスのAD DSのID情報をMicrosoft Entra Connectでクラウド側に同期しておく必要があります。<br><br><strong>ストレージアカウントキー</strong>による認証は、アカウント全体に対する管理者相当のフルコントロールを付与するものであり、ユーザーやグループ単位できめ細かくアクセス許可を分けることはできません。<strong>SAS</strong>はスコープと有効期限を指定した一時的なアクセス委任トークンであり、既存のADベースの権限モデルとは根本的に仕組みが異なります。<strong>匿名アクセス</strong>はそもそも認証自体を行わないため要件に反します。<br><br>クラウドネイティブなAD環境や、ハイブリッドではなく完全にMicrosoft Entra IDだけでID管理したい場合には、Azure Filesが提供する<strong>Microsoft Entra Kerberos認証</strong>（Entra IDに参加したWindowsクライアント向け）という選択肢もありますが、これはAD DSドメイン参加済みのオンプレミスクライアントとは適用対象が異なるため、本問のようにオンプレミスAD DS環境をそのまま使う場合はAD DS認証が適切です。",
},
{
  domain: "データストレージ",
  scenario: "Northwind社はLinux上で稼働する科学技術計算アプリケーション群のために共有ファイルストレージを構築しています。アプリケーションはPOSIX準拠のファイルアクセス許可とハードリンクの動作を必要とし、非常に高いスループットでの並列I/Oアクセスが求められます。",
  question: "この要件を満たすAzure Filesの構成はどれですか？",
  choices: [
    "Azure Blob Storageの階層型名前空間",
    "Azure Table Storage",
    "Standardファイル共有（SMBプロトコル）",
    "PremiumファイルストレージのNFS 4.1プロトコルの共有"
  ],
  answer: 3,
  explanation: "Azure Filesの<strong>NFS 4.1プロトコル</strong>による共有は、<strong>FileStorage</strong>アカウント種類を用いたPremiumファイルストレージでのみ提供されるオプションで、POSIX準拠のファイルアクセス許可（ユーザー・グループ・その他に対する読み書き実行権限）、シンボリックリンク・ハードリンクをサポートし、SSDベースの高いIOPS・スループットによりLinuxの科学技術計算やHPC系ワークロードの並列I/Oに適しています。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>プロトコル/サービス比較</div><table class='exp-compare'><tr><th>プロトコル/サービス</th><th>POSIX準拠</th><th>ハードリンク</th><th>主な用途</th></tr><tr class='hl'><td>Azure Files NFS 4.1</td><td class='ok'>&check;</td><td class='ok'>&check;</td><td>Linux HPC・並列I/O</td></tr><tr><td>Azure Files SMB</td><td class='ng'>&times;</td><td class='ng'>&times;</td><td>Windows共有・NTFS権限</td></tr><tr><td>ADLS Gen2（階層型名前空間）</td><td class='ok'>&check;（ACLのみ）</td><td class='ng'>&times;</td><td>ビッグデータ分析</td></tr><tr><td>Blob NFS 3.0</td><td class='ng'>一部のみ</td><td class='ng'>&times;</td><td>Blobオブジェクトへの直接NFSアクセス</td></tr></table></div><br><br><strong>Standardファイル共有（SMBプロトコル）</strong>はWindows由来のプロトコルであり、POSIXパーミッションモデルやLinuxネイティブのファイルシステムセマンティクス（ハードリンクなど）はサポートしません。<strong>Blob Storageの階層型名前空間（ADLS Gen2）</strong>は分析ワークロード向けの機能でPOSIX ACLを提供しますが、ファイルシステムとして直接NFSクライアントにマウントして使う用途を主目的とはしておらず、ハードリンクのような完全なPOSIXファイルシステムセマンティクスまでは提供しません。<strong>Table Storage</strong>はファイルシステムではなくキー・バリュー型のデータストアです。<br><br>混同されやすい点として、Blob Storageには別途「Blob NFS 3.0」という機能もありますが、これはAzure FilesのNFS 4.1共有とは異なる製品（Blobオブジェクトに対するNFSアクセス）であり、ハードリンクなど一部のPOSIXセマンティクスのサポート範囲も異なります。要件がハードリンクなどの完全なPOSIXファイルシステム動作である場合は、Azure FilesのNFS 4.1共有を選択します。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社はオンプレミスのWindows Serverファイルサーバーを、既存の共有名・NTFS権限・DFS名前空間の設定をできるだけそのまま維持した状態でAzure上のWindows Server VMへ移行したいと考えています。移行ツールはインベントリの取得から実際のデータ転送・カットオーバーまでを一元的に管理できるものが望ましいです。",
  question: "この移行に最も適したツールはどれですか？",
  choices: [
    "Azure Migrate",
    "azcopy コマンドラインツール",
    "Azure Database Migration Service (DMS)",
    "Storage Migration Service"
  ],
  answer: 3,
  explanation: "<strong>Storage Migration Service</strong>はWindows Server（Windows Admin Centerから操作）に組み込まれた移行ツールで、ソースサーバーの共有構成やファイル・NTFS権限のインベントリ取得、実データの転送、そしてデスティネーションサーバーにソースサーバーのコンピューター名やIPアドレスを引き継がせる「カットオーバー」までを一連の流れとして一元管理できます。共有名・NTFS権限・DFS名前空間の設定を維持したファイルサーバー移行に特化して設計されている点が特徴です。<br><br><strong>Azure Migrate</strong>は主にVMや物理サーバーのアセスメント（Azure移行後のサイジング試算等）とリホスト（VM移行）のためのハブサービスであり、ファイル共有単位での権限やDFS名前空間の詳細な移行機能は持ちません。<strong>Azure Database Migration Service（DMS）</strong>はSQL ServerやMySQL、PostgreSQLなどデータベースエンジンの移行に特化したサービスで、ファイルサーバーの移行対象ではありません。<strong>azcopy</strong>はBlob/Files向けの高速な単純ファイルコピーツールであり、共有設定・NTFS ACL・DFS名前空間・サーバー名の引き継ぎといった移行の管理機能は持ちません。<br><br>継続的にオンプレミスとクラウドのファイルを同期・キャッシュしたい場合（一度きりの移行ではなく、ハイブリッドの運用形態）には<strong>Azure File Sync</strong>という別のサービスが適しており、Storage Migration Serviceの「移行」とAzure File Syncの「継続的同期・キャッシュ」は目的が異なる点を区別しておく必要があります。",
},
{
  domain: "データストレージ",
  scenario: "Woodgrove社は工場のセンサーから収集した合計2PB分のデータをオンプレミスのテープストレージに保存しています。このデータをAzure Storageに移行する必要がありますが、社内のインターネット回線の帯域幅は非常に限られており、ネットワーク経由での転送では数か月かかってしまいます。",
  question: "この大量データを最も効率的に移行する方法はどれですか？",
  choices: [
    "AzCopyを使用してネットワーク経由で並列転送する",
    "ExpressRouteを新規に契約してネットワーク経由で転送する",
    "Azure Data Box（物理アプライアンス）を使用してオフラインでデータを転送する",
    "Azure Data Factoryのセルフホスト統合ランタイムを使用する"
  ],
  answer: 2,
  explanation: "<strong>Azure Data Box</strong>は、Microsoftが提供する堅牢な物理ストレージアプライアンス（容量に応じてDisk、標準のData Box、Heavyなどの種類がある）をオンプレミス環境へ配送し、現地でデータをコピーしたのちMicrosoftのデータセンターへ返送することで、ネットワークを一切使わずにオフラインで大容量データをAzure Storageへ取り込むサービスです。ネットワーク帯域幅に依存しないため、PB級のデータを限られた回線環境から現実的な期間で移行するのに最適です。<br><br><strong>AzCopyによるネットワーク経由の並列転送</strong>は、限られた帯域幅では2PBもの転送に数か月から場合によっては年単位の時間がかかる可能性があり非現実的です。<strong>Data Factoryのセルフホスト統合ランタイム</strong>も結局はネットワーク経由でのデータ移動であり、帯域幅という根本的な制約を解消できません。<strong>ExpressRouteの新規契約</strong>は継続的な高帯域接続が必要な場合には有効ですが、導入までの時間とコストがかかり、一度きりの大量データ移行という目的には過剰投資です。<br><br>継続的にオンプレミスからAzureへデータを送り続けるようなオフライン+オンラインのハイブリッド用途には<strong>Azure Data Box Gateway</strong>という仮想アプライアンス型の製品もありますが、これは物理的に持ち運んで一括転送するData Boxとは異なる、常設のゲートウェイ型サービスです。",
},
{
  domain: "データストレージ",
  scenario: "Adventure Works社はシングルページアプリケーション（SPA）の静的なHTML、CSS、JavaScriptファイルをホスティングする必要があります。バックエンドのWebサーバーやコンピューティングリソースは持たず、可能な限り低コストでシンプルな構成にしたいと考えています。",
  question: "このホスティング要件を満たす最もコスト効率の良い方法はどれですか？",
  choices: [
    "Azure Kubernetes Serviceに小規模なNginxコンテナーをデプロイする",
    "Azure Filesの共有をWebサーバーとして公開する",
    "Blob Storageの静的Webサイトホスティング機能（$webコンテナー）を使用する",
    "Azure App Serviceのフリーティアでホスティングする"
  ],
  answer: 2,
  explanation: "Blob Storageの<strong>静的Webサイトホスティング機能</strong>を有効にすると、ストレージアカウント内に自動生成される<strong>$webコンテナー</strong>に静的なHTML/CSS/JavaScriptファイルを配置するだけで、HTTP(S)エンドポイントとして直接公開できます。バックエンドのコンピューティングリソース（App Serviceプランなど）が一切不要なため、ストレージの容量とデータ転送に対する課金だけで済み、単純な静的サイトホスティングとしては非常に低コストです。<br><br><strong>App Service（フリーティア含む）</strong>はApp Serviceプランというコンピューティングリソースの割り当てを前提としており、静的コンテンツのみの配信に対しては構成が過剰です（フリーティアには実行時間やアイドル時の制約もあります）。<strong>AKS</strong>はコンテナオーケストレーション基盤であり、Nginxコンテナー1つのためにクラスターを構築・運用するのはコスト・複雑さの両面で不釣り合いです。<strong>Azure Files</strong>はSMB/NFSのファイル共有プロトコルであり、直接HTTPでWebコンテンツを配信する機能は持ちません。<br><br>単純な静的ホスティングを超えて、グローバルなCDN配信、カスタムドメイン・SSL証明書の自動管理、GitHub Actions等によるCI/CDパイプライン統合、サーバーレスAPI（Azure Functions）との統合まで求める場合は、上位互換的な位置づけの<strong>Azure Static Web Apps</strong>というサービスも検討対象になりますが、本問のように「可能な限り低コストでシンプルに」という要件では$webコンテナーによる静的サイトホスティングが最も適しています。",
},
{
  domain: "データストレージ",
  scenario: "Tailwind Traders社はAzure Cosmos DBに保存されている注文コンテナーに新しいドキュメントが挿入されるたびに、そのドキュメントをリアルタイムで処理して在庫システムへ反映するAzure Functionsを起動したいと考えています。ポーリングではなく、変更をイベント駆動でトリガーできる仕組みが必要です。",
  question: "この要件を実現するために使用すべきCosmos DBの機能はどれですか？",
  choices: [
    "Cosmos DBのTTL（Time to Live）機能",
    "Cosmos DBの変更フィード（Change Feed）とAzure Functionsのトリガーバインディング",
    "Cosmos DB Synapse Link",
    "Cosmos DBのマルチリージョン書き込み"
  ],
  answer: 1,
  explanation: "<strong>Cosmos DBの変更フィード（Change Feed）</strong>は、コンテナー内で発生したドキュメントの挿入・更新をパーティションキーの範囲ごとに時系列順で読み取れるログのような機構です。<strong>Azure Functionsのトリガーバインディング（Cosmos DB trigger）</strong>と組み合わせることで、変更フィードの読み取り位置（リース）の管理をAzure Functions側が自動的に行いながら、変更が発生するたびにポーリングなしでFunctionインスタンスを起動し、イベント駆動でリアルタイムに下流の在庫システムへ反映する処理を実装できます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>変更フィードによるイベント駆動処理</div><div class='exp-flow'><div class='flow-box'>注文コンテナー<br>(ドキュメント挿入)</div><div class='flow-arrow'>&rarr;</div><div class='flow-box hl'>変更フィード<br>(Change Feed)</div><div class='flow-arrow'>&rarr;<br>トリガー</div><div class='flow-box'>Azure Functions</div><div class='flow-arrow'>&rarr;</div><div class='flow-box'>在庫システム</div></div></div><br><br><strong>TTL（Time to Live）</strong>は一定期間経過後にドキュメントを自動的に期限切れ・削除する機能であり、変更検知やイベント発火とは無関係です。<strong>Synapse Link</strong>は、トランザクション処理用のリソース（RU）を消費せずに列指向の分析ストアに対して分析クエリを実行できるようにする機能で、リアルタイムのイベント処理を目的としたものではありません。<strong>マルチリージョン書き込み</strong>は書き込み可能なリージョンを地理的に複数に広げる機能であり、変更のトリガー機構そのものではありません。<br><br>類似の目的として、Cosmos DBは<strong>Azure Event Grid</strong>との統合（変更フィードをソースとするイベントサブスクリプション）もサポートしています。Functionsのトリガーバインディングは実装がシンプルで密結合な用途に、Event Grid経由の連携は複数の下流システムへ疎結合にファンアウトしたい場合に使い分けられます。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社は既存のオンプレミスSQL Server 2019のライセンスをSoftware Assurance付きで保有しています。Azure SQL Databaseへ移行する際に、このライセンスを再利用してコストを削減したいと考えていますが、現在の購入モデルではこのオプションが選択できないことに気付きました。",
  question: "この要件を満たすために変更すべき設定はどれですか？",
  choices: [
    "geoレプリケーションを無効化する",
    "サービスレベルをBasicティアに変更する",
    "DTUベースの購入モデルからvCoreベースの購入モデルに変更し、Azureハイブリッド特典を有効にする",
    "エラスティックプールを解除して単一データベースに戻す"
  ],
  answer: 2,
  explanation: "<strong>Azureハイブリッド特典（Azure Hybrid Benefit）</strong>は、Software Assurance付きの既存オンプレミスSQL Serverライセンス（またはSubscription経由のライセンス）を、Azure SQL Databaseなどのコンピューティング料金の割引に転用できる仕組みですが、この特典は<strong>vCoreベースの購入モデル</strong>でのみ適用可能です。DTUベースの購入モデルは抽象化されたパフォーマンス単位（DTU）に対する定額課金であり、コア数・メモリ・ライセンス相当コストを個別に切り分けられる構造になっていないため、ライセンス持ち込みの割引を組み込む仕組みがそもそも存在しません。<br><br><strong>Basicティアへの変更</strong>はDTUモデル専用の最小構成ティアであり、購入モデル自体を変更しない限りAzureハイブリッド特典は適用できません。<strong>geoレプリケーションの無効化</strong>や<strong>エラスティックプールの解除</strong>は、可用性構成やリソース共有方式に関する設定であり、購入モデルやライセンス割引の適用可否には影響しません。<br><br>Azureハイブリッド特典はコスト削減策として<strong>予約容量（Reserved Capacity）</strong>と併用することも可能で、両方を組み合わせるとオンデマンドのvCore料金に対して大幅な割引を積み上げられます。予約容量は前払い・一定期間のコミットメントによる割引であり、ライセンス持ち込みによる割引であるAzureハイブリッド特典とは仕組みが異なる点を区別してください。",
},
{
  domain: "データストレージ",
  scenario: "Fabrikam社はAzure SQL Databaseで自動フェイルオーバーグループを構成しています。リージョン障害が発生してセカンダリサーバーへフェイルオーバーした際、アプリケーション側の接続文字列を変更することなく自動的に新しいプライマリへ接続を継続できるようにしたいと考えています。",
  question: "この要件を実現する自動フェイルオーバーグループの機能はどれですか？",
  choices: [
    "透過的データ暗号化（TDE）",
    "アクティブ geoレプリケーションのセカンダリデータベース個別の接続文字列",
    "読み取り専用エンドポイントによる負荷分散",
    "フェイルオーバーグループのリスナーエンドポイント（フェイルオーバーグループ名を含むDNS名）"
  ],
  answer: 3,
  explanation: "自動フェイルオーバーグループを構成すると、プライマリ用（読み取り/書き込み）とセカンダリ用（読み取り専用）それぞれに、フェイルオーバーグループ名を含む固定の<strong>リスナーエンドポイント（DNS名）</strong>が発行されます。アプリケーションは個々のサーバー名ではなくこのリスナー名に接続することで、実際にどちらのサーバーが現在のプライマリかを意識する必要がなくなり、フェイルオーバー発生時にはDNSレコードが自動的に新しいプライマリを指すよう切り替わるため、接続文字列を変更せずに接続を継続できます。<br><br><strong>読み取り専用エンドポイント</strong>は読み取りワークロードをセカンダリへ振り分けるための別エンドポイントであり、書き込み接続先の自動切り替えとは異なる機能です。<strong>TDE</strong>はデータの暗号化に関する機能であり、接続エンドポイントの管理とは無関係です。<strong>アクティブgeoレプリケーションのセカンダリ個別の接続文字列</strong>を直接使用すると、フェイルオーバー発生時にアプリケーション側で接続文字列を手動で切り替える対応が必要になり、要件の「変更することなく」に反します。<br><br>複数の異なるサービス（Webアプリとデータベースなど）を含むリージョン全体のフェイルオーバーをオーケストレーションしたい場合は、<strong>Azure Traffic Manager</strong>や<strong>Azure Front Door</strong>のようなグローバルなトラフィックルーティングサービスと組み合わせるケースもありますが、SQL Database単体の書き込み先切り替えに関してはフェイルオーバーグループのリスナー機能だけで完結します。",
},
{
  domain: "データストレージ",
  scenario: "Northwind社はAzure Cache for Redisを本番環境のキャッシュ層として採用する予定です。データのディスクへの永続化（RDBスナップショットまたはAOF）、複数シャードによるクラスタリング、および仮想ネットワークへの直接デプロイが必要です。",
  question: "この要件を満たすAzure Cache for Redisのティアはどれですか？",
  choices: [
    "Standardティア",
    "Enterpriseティア（低価格帯のFlashオプション）",
    "Basicティア",
    "Premiumティア"
  ],
  answer: 3,
  explanation: "<strong>Premiumティア</strong>は、Azure Cache for Redisの従来型（非Enterprise系）ティアの中で最上位に位置し、RDBスナップショットやAOF（Append Only File）によるディスクへの<strong>データ永続化</strong>、複数シャードにデータを分割する<strong>クラスタリング</strong>、そして仮想ネットワーク内への直接デプロイ（VNet統合）といった、エンタープライズ用途で求められる高度な機能をサポートします。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>Azure Cache for Redis ティア比較</div><table class='exp-compare'><tr><th>ティア</th><th>SLA/レプリケーション</th><th>データ永続化</th><th>クラスタリング</th><th>VNet統合</th></tr><tr><td>Basic</td><td class='ng'>なし</td><td class='ng'>&times;</td><td class='ng'>&times;</td><td class='ng'>&times;</td></tr><tr><td>Standard</td><td class='ok'>あり</td><td class='ng'>&times;</td><td class='ng'>&times;</td><td class='ng'>&times;</td></tr><tr class='hl'><td>Premium</td><td class='ok'>あり</td><td class='ok'>&check;</td><td class='ok'>&check;</td><td class='ok'>&check;</td></tr><tr><td>Enterprise</td><td class='ok'>あり</td><td class='ok'>&check;</td><td class='ok'>&check;</td><td class='ok'>&check;</td></tr></table></div><br><br><strong>Basicティア</strong>は単一ノード構成でSLAが提供されず、永続化機能もありません。<strong>Standardティア</strong>はプライマリ/レプリカ構成による自動フェイルオーバーとSLAを提供しますが、データ永続化・クラスタリング・VNet直接デプロイはいずれもサポートされていません。<br><br><strong>Enterpriseティア（Flashオプション含む）</strong>はRedis Enterprise由来の最上位シリーズで、RediSearchやRedisJSONなどのモジュール、アクティブ-アクティブ型の地理的レプリケーションといったPremiumにはない機能を持ちますが、本問が求める基本要件（永続化・クラスタリング・VNet統合）自体はPremiumティアで満たされるため、コスト効率の面でも標準的な選択肢はPremiumティアになります。Premiumのgeoレプリケーションは1次-2次（パッシブ）構成である点も、Enterpriseのアクティブ-アクティブ構成との違いとして押さえておくとよいでしょう。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社はデータレイクとして数百TBのログデータをBlob Storageに保存し、Azure Synapse AnalyticsやAzure Databricksから分析クエリを実行しています。ディレクトリ単位でのアクセス制御（POSIX ACL）を行いたい要件と、ビッグデータ分析ワークロードでのファイル操作性能を最大化したい要件があります。",
  question: "この要件を満たすために有効化すべきストレージアカウントの機能はどれですか？",
  choices: [
    "階層型名前空間（Hierarchical Namespace）を持つAzure Data Lake Storage Gen2",
    "ストレージアカウントの冗長性をRA-GRSに変更する",
    "Azure Files のPremiumティア",
    "Blob Storageの静的Webサイトホスティング"
  ],
  answer: 0,
  explanation: "Blob Storageで<strong>階層型名前空間（Hierarchical Namespace, HNS）</strong>を有効にすると、そのストレージアカウントは<strong>Azure Data Lake Storage Gen2</strong>として機能し、ディレクトリとファイルを真のツリー構造として管理できるようになります。これによりPOSIX準拠のACL（ユーザー・グループ単位のディレクトリ／ファイルアクセス制御）が可能になるほか、ディレクトリの名前変更や削除がフラット名前空間のBlob Storageのように配下オブジェクトを1つずつ処理するのではなく、単一のアトミックなメタデータ操作として実行されるため、Synapse AnalyticsやDatabricksなどのビッグデータ分析エンジンでのファイル操作性能が大幅に向上します。<br><br><strong>Azure Filesのプレミアムティア</strong>はSMB/NFSファイル共有であり、Hadoop互換のストレージレイヤー（ABFSドライバー等）としては一般的に利用されません。<strong>静的Webサイトホスティング</strong>はWebコンテンツ配信のための機能で分析ワークロードとは無関係です。<strong>RA-GRSへの冗長性変更</strong>は可用性・耐障害性に関する設定であり、階層構造やACL、分析性能の向上にはつながりません。<br><br>HNSはストレージアカウントの基本的な動作モードを変えるため、原則としてアカウント作成時に有効化しておく設計が推奨されます（既存のフラット名前空間アカウントを後から変換する仕組みも用意されつつありますが、要件が明確な新規構築の場面では、最初からHNSを有効にしたアカウントとして作成するのが確実です）。",
},
{
  domain: "データストレージ",
  scenario: "Woodgrove社は在庫更新イベントを送信元アプリケーションから受信側アプリケーションへ1対1で単純に伝達するだけの疎結合な仕組みを必要としています。複数の購読者へのブロードキャストやセッション、トピックといった高度な機能は不要で、可能な限り低コストで運用したいと考えています。",
  question: "この要件に最も適したメッセージングサービスはどれですか？",
  choices: [
    "Azure Event Grid",
    "Azure Event Hubs",
    "Azure Queue Storage",
    "Azure Service Bus トピック（Topics）"
  ],
  answer: 2,
  explanation: "<strong>Azure Queue Storage</strong>は、送信者から受信者へメッセージを1対1（正確には1つのキューに対して複数のワーカーがポーリングして処理する構成）で単純に受け渡す、非常にシンプルで低コストなメッセージキューイングサービスです。ストレージアカウントの一部として提供されるためStorage課金体系に含まれ、トピック・サブスクリプションやセッション、重複排除といった高度な機能を持たない代わりに、単純な用途では最も低コストに運用できます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>メッセージングサービス比較</div><table class='exp-compare'><tr><th>サービス</th><th>配信モデル</th><th>主なユースケース</th></tr><tr class='hl'><td>Queue Storage</td><td>1対1（単純キュー）</td><td class='ok'>低コストな単純メッセージ受け渡し</td></tr><tr><td>Service Bus</td><td>1対1 / 1対多（トピック）</td><td>エンタープライズメッセージング（順序・トランザクション）</td></tr><tr><td>Event Grid</td><td>1対多（プッシュ配信）</td><td>イベント駆動アーキテクチャ</td></tr><tr><td>Event Hubs</td><td>1対多（ストリーミング）</td><td>大量テレメトリの高スループット取り込み</td></tr></table></div><br><br><strong>Azure Service Bus トピック（Topics）</strong>は複数の購読者へメッセージを配信するpub/subモデルや、セッション、トランザクション、デッドレターキューなどエンタープライズメッセージング向けの高度な機能を持ちますが、その分コストも高く、単純な1対1の伝達には過剰です。<strong>Event Grid</strong>はイベント発生をリアクティブにプッシュ配信するイベント駆動アーキテクチャ向けのサービスであり、順序保証や再試行を伴うメッセージキューイングの用途とは設計思想が異なります。<strong>Event Hubs</strong>は大量のテレメトリ・ストリーミングデータの高スループット取り込みに特化したサービスで、単純な業務メッセージの受け渡しにはオーバースペックです。<br><br>Service Bus側にも「トピック」ではなくシンプルな「キュー（Queues）」という選択肢がありますが、それでもデッドレターキューや重複検出など、Queue Storageにはない機能とコストを伴うため、「高度な機能は不要・可能な限り低コスト」という要件に対してはQueue Storageがより適しています。",
},
{
  domain: "データストレージ",
  scenario: "Adventure Works社は現在Azure Table Storageでカタログデータを管理していますが、事業のグローバル展開に伴い、複数リージョンへのデータの自動レプリケーション、単一桁ミリ秒の読み取りレイテンシSLA、そして柔軟な整合性レベルの選択が必要になりました。既存のAPIコードはできるだけ再利用したいと考えています。",
  question: "この要件を満たすために移行すべきサービスはどれですか？",
  choices: [
    "Azure SQL Databaseに移行しテーブルとして再設計する",
    "Azure Cosmos DB for Table（Table API）",
    "Azure Blob Storageのメタデータ機能",
    "Azure Files Premiumティア"
  ],
  answer: 1,
  explanation: "<strong>Azure Cosmos DB for Table（Table API）</strong>は、Azure Table StorageのAPI・データモデル・SDKとの高い互換性を保ちながら、Cosmos DBの基盤機能である複数リージョンへの自動レプリケーション、単一桁ミリ秒の読み取り/書き込みレイテンシSLA、そして強一貫性から結果整合性までの複数の整合性レベルの選択といった高度な機能を追加で利用できる上位互換サービスです。既存のTable Storage向けコードをほぼそのまま再利用しながら移行できます。<br><br><strong>Blob Storageのメタデータ機能</strong>はオブジェクトに付与できる少数のキー・バリュー属性にすぎず、独立したキー・バリューデータベースの代替にはなりません。<strong>Azure SQL Databaseへの再設計</strong>はリレーショナルスキーマへの変換、SQLクエリへの書き換え、トランザクションモデルの見直しなど大規模な変更が必要になり、「既存のAPIコードを再利用したい」という要件に反します。<strong>Azure Files</strong>はファイル共有サービスであり、Table StorageのREST APIとは全く異なる仕組みです。<br><br>なお、Microsoftは新規開発のワークロードに対しては、より豊富なクエリ機能とインデックス制御を持つ<strong>Cosmos DB for NoSQL</strong>を推奨する傾向にあります。ただし本問のように既存のTable Storage向けAPIコードの再利用を最優先する移行シナリオでは、互換性を重視したTable APIが適切な選択になります。",
},
{
  domain: "データストレージ",
  scenario: "Contoso社はAzure Virtual Machines上でSQL Server 2019を稼働させ、大量の一時テーブルとソート処理を伴うOLTPワークロードを実行しています。tempdbへのI/O性能がボトルネックになっており、コストを抑えつつ性能を改善したいと考えています。",
  question: "tempdbの性能を改善するために推奨される構成はどれですか？",
  choices: [
    "tempdbをVMのローカル一時ディスク（エフェメラルディスク）に配置する",
    "tempdbをAzure Filesの標準ファイル共有に配置する",
    "tempdbのサイズを最小化してディスクI/Oを避ける",
    "tempdbをPremium SSD永続ディスクに配置する"
  ],
  answer: 0,
  explanation: "SQL Server on Azure VMでは、VMに割り当てられている<strong>ローカル一時ディスク（エフェメラルディスク、多くのVMシリーズでDドライブとして提供される直結のNVMe/SSD）</strong>に<strong>tempdb</strong>を配置することがMicrosoftのベストプラクティスとして推奨されています。ローカルディスクは追加のディスクコストなしで非常に高いIOPSと低レイテンシを発揮でき、tempdbはSQL Serverの再起動やVMの再起動のたびに再作成される一時的な作業領域であるため、永続性を必要としないという特性ともよく合致します。<br><br><strong>Premium SSD永続ディスク</strong>もPremiumティアであれば高いIOPSは得られますが、ネットワーク経由の永続ディスクであるためローカルディスクほどの低レイテンシは実現できず、追加のディスク費用もかかります。<strong>Azure Filesの標準ファイル共有</strong>はネットワークファイル共有プロトコル経由のアクセスとなり、tempdbが要求する高頻度・低レイテンシなI/Oには全く向いていません。<strong>tempdbサイズの最小化</strong>は、データ量に対して不足すると自動拡張（オートグロース）が頻発しかえって性能が悪化する原因となり、根本的な解決にはなりません。<br><br>ローカル一時ディスクはVMの再起動・再デプロイ（サイズ変更や別ホストへの移動を伴う操作）でデータが消える揮発性ストレージである点には注意が必要ですが、tempdbは元々セッション終了時にリセットされる性質のデータベースであるため、この特性が問題になりません。永続データが必要な場合は、IOPSを要求に応じて柔軟に調整できる<strong>Azure Ultra Disk</strong>のような永続ディスクを検討する場面もありますが、tempdb専用の配置先としてはローカル一時ディスクが定番です。",
},
{
  domain: "データストレージ",
  scenario: "Fabrikam社はAzure SQL Databaseの自動バックアップについて、プライマリリージョンのデータセンター障害が発生してもバックアップデータ自体は失われないようにしたいと考えていますが、コスト面からセカンダリリージョンへのレプリケーションまでは不要と判断しています。",
  question: "この要件を満たすために構成すべきバックアップストレージ冗長性はどれですか？",
  choices: [
    "geo冗長バックアップストレージ（GRS）",
    "ゾーン冗長バックアップストレージ（ZRS）",
    "バックアップを無効化しレプリカのみで代替する",
    "ローカル冗長バックアップストレージ（LRS）"
  ],
  answer: 1,
  explanation: "Azure SQL Databaseでは、データベース自体の可用性構成（LRS/ZRSなどのコンピューティング・データファイルの冗長性）とは別に、自動バックアップの保存先の冗長性を個別に選択できます。<strong>ゾーン冗長バックアップストレージ（ZRS）</strong>を選択すると、バックアップデータが同一リージョン内の複数の可用性ゾーンに同期的に複製されるため、単一のデータセンター（ゾーン）で障害が発生してもバックアップデータは失われません。セカンダリリージョンへのレプリケーションを伴わない分、GRSに比べてコストを抑えつつ「データセンター障害からのバックアップ保護」という要件を満たせます。<br><br><strong>LRS</strong>は単一データセンター内でのみ複製されるため、そのデータセンター自体に障害が発生するとバックアップも失われるリスクが残ります。<strong>GRS</strong>はセカンダリリージョンへのレプリケーションまで含むため、コスト面で「セカンダリリージョンへのレプリケーションまでは不要」という要件を上回ってしまいます。<strong>バックアップの無効化</strong>はそもそもバックアップという保護手段自体を放棄することになり、要件と矛盾します。<br><br>このバックアップストレージ冗長性の設定は、データベース本体のサービスティアにおける可用性ゾーン構成（例えばBusiness Criticalのゾーン冗長構成）とは独立した設定です。両者を混同しないよう、「データベース本体の可用性」と「バックアップデータの保護」は別軸のレプリケーション設定であると理解しておくことが重要です。",
},
{
  domain: "データストレージ",
  scenario: "Tailwind Traders社は非常にI/O集約的なOLTPワークロードを持つミッションクリティカルなAzure SQL Databaseを運用しています。ローカルSSDに近い最低ストレージレイテンシを実現しつつ、追加コストなしで読み取りワークロードをオフロードできる読み取り専用レプリカも必要としています。",
  question: "この要件を満たすAzure SQL Databaseのサービスティアはどれですか？",
  choices: [
    "Business Criticalティア",
    "Hyperscaleティア",
    "General Purposeティア",
    "Basicティア"
  ],
  answer: 0,
  explanation: "<strong>Business Criticalティア</strong>は、コンピューティングノードに直結されたローカルSSDをデータファイルの格納に使用するアーキテクチャを採用しており、リモートストレージを経由するGeneral Purposeティアに比べて著しく低いストレージI/Oレイテンシを実現します。内部的にはSQL ServerのAlways On可用性グループ技術を利用して、プライマリに加え最大数個の読み取り可能なセカンダリレプリカを同一リージョン内に維持しており、これらのセカンダリは高可用性のためのフェイルオーバー用途に加えて、追加コストなしで読み取り専用ワークロードのオフロード先としても利用できます。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>SQL Databaseサービスティア比較</div><table class='exp-compare'><tr><th>ティア</th><th>ストレージ</th><th>レイテンシ</th><th>無償の読み取りセカンダリ</th></tr><tr class='hl'><td>Business Critical</td><td>ローカルSSD直結</td><td class='ok'>最小</td><td class='ok'>あり</td></tr><tr><td>General Purpose</td><td>リモートBlob Storage</td><td class='ng'>やや高い</td><td class='ng'>なし</td></tr><tr><td>Hyperscale</td><td>分離型（ページサーバー）</td><td>中</td><td>スケールアウトノードとして追加可</td></tr></table></div><br><br><strong>General Purposeティア</strong>はリモートのBlob Storageをデータファイルの保存先として利用するアーキテクチャのため、Business Criticalよりストレージレイテンシが高く、追加コストなしの読み取り可能セカンダリも提供しません。<strong>Hyperscaleティア</strong>は、コンピューティングとストレージを分離した多層アーキテクチャにより非常に大規模なデータベース（テラバイト級）への高速なスケーリングやバックアップ/復元に優れますが、ローカルSSDに基づく最低レイテンシという特性はBusiness Criticalの設計とは異なります。<strong>Basicティア</strong>はDTUベースの最小構成であり、性能・可用性ともに本問の要件を大きく下回ります。<br><br>Hyperscaleにも読み取り専用のセカンダリノード（読み取りスケールアウト用のレプリカ）を追加できますが、Hyperscaleのセカンダリはページサーバーとログサービスを介したアーキテクチャに基づくものであり、Business Criticalのようにローカルアタッチストレージによる最低レイテンシを主眼とした設計ではない点が違いです。ミッションクリティカルなOLTPで「最低レイテンシ」と「無償の読み取りセカンダリ」の両方を明確に求める場合はBusiness Criticalが第一候補になります。",
},

];
