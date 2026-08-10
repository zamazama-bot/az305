// AZ-305: Azure Solutions Architect Expert
// MS形式 実戦 E（補完・50問） - 再受験対策
// MS公式プラクティス評価と同じ簡潔な文体。Set7〜10で手薄だったAZ-305出題範囲を補完。
// Front Door/CDN、Key Vault、メッセージング選定、汎用コンピュート選定、NSG/DDoS、
// コスト管理、APIM一般、Azure Migrate、ネットワーク基礎、Storageサービス選定 等。

const QUESTIONS_SET11 = [
{
  domain: "インフラ",
  scenario: "特定のVM SKUを特定のリージョンで3年間にわたって常時稼働させることが確定している本番ワークロードがあります。<br>・従量課金と比較して最大限のコスト削減を実現したい<br>・同一ワークロードは今後も同じVMシリーズで稼働し続ける想定である",
  question: "何を推奨しますか?",
  choices: [
    "Azure Reservations (Reserved Instances) の3年間の予約",
    "Spot 仮想マシン",
    "Savings Plan for compute",
    "Azure Hybrid Benefit"
  ],
  answer: 0,
  explanation: "Azure Reservations(いわゆるReserved Instances)は、特定のVM SKUを特定のリージョンで1年または3年間使用することをコミットすることで、従量課金と比較して最大級の割引を得られる購入モデルです。使用するVMシリーズやリージョンが確定しているワークロードに対して、コスト削減効果が最も大きくなります。予約は同一のインスタンスサイズフレキシビリティグループ内であれば、多少のサイズ変更にも対応できます。<br>Spot仮想マシンは中断を許容できるワークロード向けの割引オプションであり、常時稼働が求められる本番ワークロードには不向きです。Savings Plan for computeはより柔軟な代わりに割引率はReserved Instancesよりも一般的に低くなる傾向があり、リージョン/SKUが確定している今回のシナリオでは、より深い割引が期待できるReserved Instancesが適しています。Azure Hybrid Benefitはライセンスの持ち込みによる割引であり、コンピュートリソース自体へのコミットメント割引ではありません。"
},
{
  domain: "インフラ",
  scenario: "Azure Blob Storageに新しいファイルがアップロードされたことを検知して、Azure Functionsで自動的に処理を実行するソリューションを設計しています。<br>・イベント発生後、数秒以内に反応する必要がある<br>・大量のイベントストリームを継続的に取り込む必要はない",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Event Grid",
    "Azure Event Hubs",
    "Azure Service Bus キュー",
    "Azure Queue Storage"
  ],
  answer: 0,
  explanation: "Azure Event Gridは、Azureリソースで発生した離散的なイベント(Blobの作成など)を、プッシュ型でリアルタイムにハンドラー(Functions、Logic Apps、Webhookなど)へ配信する、反応型(リアクティブ)のイベント配信サービスです。Blob Storageのリソースイベントをネイティブにサポートしており、少ない構成で低遅延の通知を実現できます。<br>Event Hubsは大量のテレメトリデータをストリームとして継続的に取り込む用途に最適化されており、単発のリソースイベント通知には過剰です。Service BusキューやQueue Storageはメッセージを送信側が明示的にエンキューする必要があり、Blob Storageのイベントを自動的にプッシュ通知する仕組みは持ちません。"
},
{
  domain: "インフラ",
  scenario: "サブスクリプションの月間クラウド支出が予算を超過しそうな場合に、担当者へ事前に通知するソリューションを設計しています。<br>・予測支出が設定したしきい値を超えた際にアラートを発行したい<br>・追加のカスタム開発を最小限に抑えたい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Cost Managementの予算(Budgets)とアラート",
    "Azure Advisor",
    "Azure Monitor メトリックアラートのみ",
    "Azure Policy"
  ],
  answer: 0,
  explanation: "Azure Cost Managementの予算(Budgets)機能を使用すると、サブスクリプションやリソースグループなどのスコープに対して支出のしきい値を設定し、実際のコストまたは予測コストがそのしきい値に達した/超過しそうな場合に、メールやアクショングループを通じて自動的にアラートを送信できます。追加のカスタム開発なしに、標準機能として提供されています。<br>Azure Advisorはコスト削減の推奨事項(未使用リソースの提案など)を提示するサービスであり、支出しきい値を超えた際のアラート機能ではありません。Azure Monitorのメトリックアラートは一般的なリソースメトリックの監視に使われますが、コスト予算専用の仕組みではなく、Cost Managementの予算機能の方が直接的で構築が容易です。Azure Policyはリソースの構成・コンプライアンスを統制する機能であり、コスト予算のアラートには使用しません。"
},
{
  domain: "データストレージ",
  scenario: "複数のオンプレミスサーバーおよびAzure VMから、SMBプロトコルで同時にマウントして共有できるファイル共有を構成し、従来のファイルサーバーを置き換えるソリューションを設計しています。",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Files",
    "Azure Blob Storage",
    "Azure Table Storage",
    "Azure Queue Storage"
  ],
  answer: 0,
  explanation: "Azure Filesは、フルマネージドのクラウドファイル共有サービスで、業界標準のSMB(および一部NFS)プロトコルをサポートします。オンプレミスサーバーとAzure VMの両方から同時にマウントでき、従来のオンプレミスファイルサーバーを置き換える用途に適しています。Azure File Syncを併用すれば、オンプレミス側でのキャッシュや階層化も可能です。<br>Blob StorageはREST APIベースのオブジェクトストレージであり、SMBファイル共有機能そのものはAzure Filesの領域です(NFS 3.0のBlob直接マウントは別の限定的な機能です)。Table StorageとQueue Storageはそれぞれキー/値ストアとメッセージキューであり、ファイル共有の用途には該当しません。"
},
{
  domain: "インフラ",
  scenario: "パブリックIPを持たないプライベートサブネット内のVMが、ソフトウェア更新のためにアウトバウンドインターネットアクセスを必要としています。<br>・安定した予測可能な送信元パブリックIPアドレスが必要<br>・大量の同時アウトバウンド接続によるSNATポート枯渇を回避したい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "NAT ゲートウェイ",
    "Azure Bastion",
    "Azure Firewallのみ",
    "パブリックロードバランサーの受信規則"
  ],
  answer: 0,
  explanation: "NATゲートウェイは、サブネット内のリソースに対してアウトバウンド専用のインターネット接続を提供するマネージドサービスです。1つまたは複数の静的パブリックIPアドレスをサブネットに関連付けることで、安定した予測可能な送信元IPアドレスを実現できます。また、Load Balancerの既定のアウトバウンドルールと比較して非常に多くのSNATポート(1つのパブリックIPあたり最大64,000ポート、複数IP割り当てでさらに拡張可能)を提供するため、大量の同時アウトバウンド接続によるSNATポート枯渇のリスクを大幅に軽減できます。<br>Azure Bastionは管理用のRDP/SSH接続を安全に行うためのサービスであり、一般的なアウトバウンドインターネットアクセスの提供には使用しません。Azure Firewallのみでもアウトバウンド接続は可能ですが、SNATポートスケールの観点ではNATゲートウェイの方が適した専用ソリューションです。パブリックロードバランサーの受信規則はインバウンドトラフィックの分散が目的であり、アウトバウンド接続の要件には直接対応しません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "複数のAzureリソースに対してAzure RBACで統一的にアクセス管理を行っている組織があります。<br>・Key Vault内のキー、シークレット、証明書へのアクセス許可も、他のAzureリソースと同じAzure RBACのロール割り当てモデルで一元管理したい<br>・管理グループレベルでのロール継承やAzure Policyとの統合を活用したい",
  question: "Key Vaultのどのアクセス許可モデルを推奨しますか?",
  choices: [
    "Azure RBACのアクセス許可モデル",
    "コンテナーへのアクセス許可(コンテナーポリシー)",
    "Vaultアクセスポリシー",
    "共有アクセス署名(SAS)"
  ],
  answer: 0,
  explanation: "Key Vaultには2つのアクセス許可モデルがあります。従来のVaultアクセスポリシーは、Key Vaultに固有の仕組みで、キー・シークレット・証明書それぞれに対する操作権限をVaultごとに一覧管理しますが、他のAzureリソースと同じAzure RBACのロール割り当て階層(管理グループ/サブスクリプション/リソースグループ)とは独立した仕組みであり、Azure Policyによる統制やAzure ADの条件付きアクセスとの統合が限定的です。<br>Azure RBACのアクセス許可モデルを有効にすると、Key Vault Administrator、Key Vault Secrets Userなどの組み込みロールを、他のAzureリソースと同じロール割り当ての仕組み(継承、条件、監査ログ)で一元管理でき、要件に合致します。SASやコンテナーポリシーはStorageアカウントなど他のサービスの概念であり、Key Vaultのアクセス制御方式ではありません。"
},
{
  domain: "インフラ",
  scenario: "あるサブネットに関連付けられたNSGに、次のカスタム受信規則が設定されています。<br>・優先度100: インターネットからのポート3389(RDP)受信を許可<br>・優先度200: インターネットからのすべての受信を拒否",
  question: "インターネットからこのサブネット内VMへのRDP接続はどうなりますか?",
  choices: [
    "許可される",
    "拒否される",
    "両方の規則が同時に適用され矛盾が発生する",
    "優先度が異なるため両方の規則が無効になる"
  ],
  answer: 0,
  explanation: "NSGのセキュリティ規則は、優先度の数値が小さいものから順に評価され、最初に条件に一致した規則が適用されると、それ以降の規則は評価されません(いわゆる「最初に一致したもの勝ち」)。今回のケースでは、優先度100の規則(ポート3389の受信を許可)の方が優先度200の規則(すべての受信を拒否)よりも先に評価されるため、RDP接続(ポート3389)はこの許可規則に一致した時点で許可され、後続の拒否規則は評価されません。<br>したがって、インターネットからのRDP接続は許可されます。なお、実運用ではインターネットに直接RDPポートを公開することはセキュリティ上推奨されず、Azure BastionなどのAzure Bastionを使ったセキュアな接続方式が推奨されます。"
},
{
  domain: "インフラ",
  scenario: "複数のAzureリージョンにデプロイされたグローバル向けWebアプリケーションがあります。<br>・グローバルなHTTP(S)負荷分散を行う<br>・WAFによるレイヤー7保護を統合する<br>・URLパスに基づいたルーティングを行う",
  question: "何を推奨しますか?",
  choices: [
    "Azure Front Door",
    "Azure Traffic Manager",
    "Azure CDN",
    "Azure Load Balancer"
  ],
  answer: 0,
  explanation: "Azure Front Doorは、グローバルに分散されたエッジ拠点(Point of Presence)を使用してHTTP(S)トラフィックをレイヤー7で処理する、グローバルなWebトラフィック配信サービスです。WAFポリシーの統合、URLパスベースのルーティング、TLSオフロードをすべてサポートし、複数リージョンにまたがるバックエンドへのグローバルな負荷分散に適しています。<br>Traffic ManagerはDNSベースの仕組みでトラフィックそのものをプロキシしないため、WAFやパスベースルーティングのようなレイヤー7の機能は提供できません。Azure CDNは静的コンテンツのキャッシュ配信が主目的であり、WAFやパスベースルーティングを前提としたアーキテクチャには向きません。Azure Load Balancerはリージョン内のレイヤー4負荷分散であり、グローバル配信やレイヤー7機能を持ちません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Azure Functions、Logic Apps、Container Apps、AKSのコンピューティングオプションを比較しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "Azure Functionsの消費(Consumption)プランは実行時間に応じた従量課金であり、アイドル時は課金されない",
    "Azure Logic Appsを実行するにはKubernetesクラスターを自分で管理する必要がある",
    "Azure Container AppsはKEDAベースのイベント駆動型スケールをサポートし、基盤のKubernetesを直接管理する必要がない",
    "AKSはサーバーレスサービスであり、ノードの管理が一切不要である"
  ],
  answer: [0,2],
  explanation: "正しいのは1つ目と3つ目です。Azure Functionsの消費プランは、実行された分だけ課金されるサーバーレスの従量課金モデルで、アイドル時は課金が発生しません。Container Appsは、KEDAを用いたイベント駆動型のスケール(スケールゼロを含む)をサポートしながら、基盤のKubernetesノードや制御プレーンの管理は利用者側に求めない、抽象化されたサーバーレスコンテナー環境です。<br>2つ目は誤りです。Logic AppsはフルマネージドのSaaSであり、Kubernetesクラスターの管理は不要です(Logic Apps Standardをコンテナー化してホストするオプションもありますが、必須ではありません)。4つ目も誤りです。AKSはKubernetesクラスターの制御プレーンはマネージドですが、ワーカーノード(VM)のスケール・アップグレード管理は基本的に利用者側の責任範囲であり、完全にノード管理不要とは言えません(ノードプールの仮想マシンスケールセットの管理が必要です)。"
},
{
  domain: "インフラ",
  scenario: "オンプレミスのSQL ServerデータベースをAzure SQL Managed Instanceへ移行するソリューションを設計しています。<br>・移行中もアプリケーションのダウンタイムを最小限に抑える必要がある<br>・移行元と移行先の継続的なデータ同期(オンライン移行)が必要である",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Database Migration Service (オンラインモード)",
    "Azure Migrate: 検出と評価",
    "Data Migration Assistant",
    "Azure Backup"
  ],
  answer: 0,
  explanation: "Azure Database Migration Service(DMS)のオンラインモード(継続的な移行)は、移行元のSQL Serverと移行先のAzure SQL Managed Instance間でデータを継続的に同期し続け、準備が整った時点で短時間のカットオーバーを行うことで、ダウンタイムを最小限に抑えた移行を実現します。<br>Azure Migrateの検出と評価は移行前のアセスメント(右サイジングやコスト見積もり)を行うツールであり、実際のデータ同期・移行は行いません。Data Migration Assistant(DMA)は、移行先での互換性の問題やブロッキングの問題を事前に検出するアセスメントツールであり、継続的なデータ同期機能は持ちません。Azure Backupはバックアップ/リストア用のサービスであり、継続的な同期を伴うオンライン移行には使用しません。"
},
{
  domain: "インフラ",
  scenario: "AzureにデプロイされたすべてのパブリックIPリソースに対する基本的なネットワーク層DDoS攻撃対策について確認しています。<br>・追加の構成や追加コストなしで自動的に有効になっている保護レベルを確認したい",
  question: "この保護レベルは何ですか?",
  choices: [
    "Azure DDoS Protection Basic",
    "Azure DDoS Protection Standard (Network Protection)",
    "Azure Web Application Firewall (WAF)",
    "Azure Firewall Premium"
  ],
  answer: 0,
  explanation: "Azure DDoS Protection Basicは、Azureプラットフォームに組み込まれている保護レベルで、追加の構成や追加コストなしに、Azure上のすべてのパブリックIPリソースに対して自動的に有効になっています。常時トラフィックを監視し、一般的なネットワーク層(レイヤー3/4)の攻撃をリアルタイムに緩和しますが、攻撃分析レポートやコスト保護、アプリケーション固有のチューニングは提供しません。<br>DDoS Protection Standard(Network Protection)は、明示的に有効化(仮想ネットワーク単位で追加コストが発生)する必要があり、より高度な保護を提供します。WAFはアプリケーション層(レイヤー7)の攻撃対策であり、DDoS対策そのものとは異なるサービスです。Azure Firewall Premiumはネットワーク/アプリケーション層のファイアウォールであり、DDoS攻撃対策専用のサービスではありません。"
},
{
  domain: "インフラ",
  scenario: "注文処理システムのコンポーネント間でメッセージを1対1で確実に受け渡す必要があります。<br>・メッセージの順序を保証する必要がある<br>・処理に失敗したメッセージをデッドレターキューに移動できる必要がある<br>・トランザクションによる複数メッセージの一括処理をサポートする必要がある",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Service Bus キュー",
    "Azure Event Grid",
    "Azure Event Hubs",
    "Azure Storage キュー"
  ],
  answer: 0,
  explanation: "Azure Service Busは、エンタープライズグレードのメッセージングを提供するサービスです。キューを使用すると、送信者と受信者間で1対1のメッセージ受け渡しを行えます。メッセージセッションを有効にすることで順序(FIFO)を保証でき、処理に失敗したメッセージを自動的にデッドレターキューへ移動する仕組みや、複数メッセージの送受信をトランザクションとしてまとめて処理する機能も備えています。<br>Event GridとEvent Hubsはそれぞれ反応型イベント通知、大量ストリーミング取り込みに特化しており、順序保証・デッドレター・トランザクションといったエンタープライズメッセージングの機能セットを持ちません。Azure Storageキューはシンプルで低コストな選択肢ですが、セッションによる順序保証やトランザクションはサポートしておらず、機能面でService Busより限定的です。"
},
{
  domain: "インフラ",
  scenario: "複数のマイクロサービスをコンテナーとしてデプロイするソリューションを設計しています。<br>・HTTPトラフィックやキューの長さに応じたイベント駆動型の自動スケール(スケールゼロを含む)が必要である<br>・Kubernetesクラスターのノードや制御プレーンを直接管理したくない<br>・サービス間通信にDaprを利用したい",
  question: "何を推奨しますか?",
  choices: [
    "Azure Container Apps",
    "Azure Kubernetes Service (AKS)",
    "Azure App Service",
    "Azure Batch"
  ],
  answer: 0,
  explanation: "Azure Container Appsは、KEDA(Kubernetes Event-Driven Autoscaling)を基盤としたイベント駆動型の自動スケール(スケールゼロを含む)をサポートするフルマネージドのサーバーレスコンテナーホスティングサービスです。基盤となるKubernetesのノードや制御プレーンを利用者が直接管理する必要はありません。またDaprを組み込みでサポートしており、サービス間の呼び出し、状態管理、Pub/Subなどをコードの変更を最小限に実装できます。<br>AKSでも同様のことは実現できますが、クラスターのノードやアップグレード、コントロールプレーンの管理責任が利用者側に残ります。App Serviceは主にWebアプリ/API向けのPaaSであり、KEDAベースの高度なイベント駆動スケールやDapr統合は前提としていません。Batchは大規模な並列バッチ処理向けのサービスであり、常時稼働するマイクロサービス基盤には適していません。"
},
{
  domain: "インフラ",
  scenario: "オンプレミスのVMware環境で稼働する数百台のサーバーについて、Azureへの移行に向けたアセスメントを実施するソリューションを設計しています。<br>・Azureでの適切なVMサイズ(右サイジング)とコスト見積もりを取得したい<br>・移行前の段階であり、実際のデータ移行はまだ行わない",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Migrate: 検出と評価 (Discovery and assessment)",
    "Azure Database Migration Service",
    "Azure Site Recovery",
    "Data Migration Assistant"
  ],
  answer: 0,
  explanation: "Azure Migrateの検出と評価(Discovery and assessment)機能は、Azure Migrateアプライアンス(軽量なオンプレミス設置エージェント)を使用してVMware/Hyper-V/物理サーバーを検出し、Azureでの適切なVMサイズの右サイジングやコスト見積もりを含むアセスメントレポートを作成します。実際のデータ移行を行う前の計画段階に使用するツールとして最適です。<br>Azure Database Migration Serviceはデータベースの実際の移行(移送)を行うサービスであり、サーバー全般のアセスメントツールではありません。Azure Site Recoveryは災害復旧(レプリケーションによるフェールオーバー)を目的としたサービスで、移行にも転用できますが、アセスメント専用のツールではありません。Data Migration Assistant(DMA)はSQL Serverデータベースの移行互換性を評価するツールであり、サーバー全般のアセスメントには使用しません。"
},
{
  domain: "インフラ",
  scenario: "大規模なマイクロサービス基盤を構築するソリューションを設計しています。<br>・Kubernetes APIへの完全なアクセスとカスタムコントローラー/オペレーターの実行が必要である<br>・特定のKubernetesバージョンや高度なネットワーキング(サービスメッシュ)を細かく制御する必要がある",
  question: "何を推奨しますか?",
  choices: [
    "Azure Kubernetes Service (AKS)",
    "Azure Container Apps",
    "Azure Functions",
    "Azure Logic Apps"
  ],
  answer: 0,
  explanation: "AKSはフルマネージドのKubernetesクラスターを提供し、Kubernetes APIへの完全なアクセス、カスタムコントローラー/オペレーター(CRD)の実行、特定のKubernetesバージョンの選択、Istio/Open Service Meshなどの高度なサービスメッシュ構成まで、Kubernetesが持つ機能をフルに活用できます。<br>Container Appsは基盤のKubernetesを抽象化して隠蔽しており、シンプルさと引き換えにKubernetes APIへの直接アクセスやカスタムオペレーターの実行はサポートしません。FunctionsとLogic Appsはそれぞれサーバーレスの実行/ワークフローサービスであり、Kubernetesクラスターそのものを制御する用途には該当しません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "AKSクラスター上で稼働するPodから、Azure Key Vaultに格納されたシークレットを取得する必要があります。<br>・シークレットの値をKubernetesのマニフェストやコンテナーイメージに直接埋め込んではならない<br>・Podのボリュームとしてシークレットをマウントしたい",
  question: "何を推奨しますか?",
  choices: [
    "Azure Key Vault Provider for Secrets Store CSI Driverを使用する",
    "シークレットの値をKubernetes Secretとして手動で作成し、Gitリポジトリで構成管理する",
    "シークレットの値を環境変数としてPod仕様(YAML)に直接記述する",
    "Azure Key Vaultのシークレットをビルド時にコンテナーイメージへ埋め込む"
  ],
  answer: 0,
  explanation: "Podとは、AKS(Kubernetes)上でコンテナーを実行する最小のデプロイ単位です。Azure Key Vault Provider for Secrets Store CSI Driverを導入すると、Key Vault上のシークレット・キー・証明書を、Podのボリュームとしてマウントできるようになります。認証には、Azure AD Workload Identity(またはマネージドID)を使用するため、資格情報をクラスター内に平文で保存する必要がありません。<br>シークレットをKubernetes Secretとして手動作成しGit管理する方法は、シークレットの値がリポジトリ内に平文で残るリスクがあり避けるべきです。環境変数への直書きやコンテナーイメージへのビルド時埋め込みも同様に、シークレットが静的に露出してしまうため、要件(直接埋め込み禁止)に反します。"
},
{
  domain: "インフラ",
  scenario: "自社アプリケーションで発生したカスタムビジネスイベントを、複数の下流サービスにプッシュ型でリアルタイムに配信するソリューションを設計しています。<br>・業界標準のCloudEventsスキーマを使用したい<br>・イベントの種類に応じてフィルタリングし、必要なサブスクライバーにのみファンアウトしたい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Event Grid のカスタムトピック",
    "Azure Event Hubs",
    "Azure Service Bus キュー",
    "Azure Data Factory"
  ],
  answer: 0,
  explanation: "Event Gridはカスタムトピックを作成することで、Azureリソースのイベントだけでなく、任意のアプリケーションが発行するカスタムイベントもプッシュ型で配信できます。CloudEvents 1.0スキーマをネイティブにサポートしており、業界標準スキーマでのイベント配信が可能です。サブスクリプションごとにイベントタイプや属性でフィルターを設定し、必要なハンドラーにのみファンアウトできます。<br>Event Hubsは大量ストリームの取り込みに強みがありますが、CloudEventsベースの反応型イベント配信・フィルタリングという用途にはEvent Gridの方が適しています。Service Busキューは1対1のメッセージング用途であり、多数の下流サービスへのファンアウト配信には向きません。Data Factoryはデータ統合・ETLパイプラインのサービスであり、イベント配信基盤ではありません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "NSGとアプリケーションセキュリティグループ(ASG)の特徴を確認しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "NSGのセキュリティ規則は、優先度番号が小さいものから評価され、最初に一致した規則が適用される",
    "1つのNSG規則の送信元と宛先に指定する複数のASGは、異なる仮想ネットワークに属していてもよい",
    "ASGを使用すると、VMのIPアドレスが変更されてもNSG規則自体を変更する必要がなくなる",
    "NSGはサブスクリプションレベルにのみ関連付けることができ、サブネットやNICには関連付けられない"
  ],
  answer: [0,2],
  explanation: "正しいのは1つ目と3つ目です。NSGの規則は優先度の小さい順に評価され、最初に一致した規則が適用されます。また、ASGを使ってVMのNICを論理グループ化しておけば、対象VMのIPアドレスが変わったりVMが増減したりしても、NSG規則自体(送信元/宛先にASG名を指定した規則)を変更する必要がなく、ASGへのNICの割り当てを変えるだけで済みます。<br>2つ目は誤りです。1つのNSG規則で一緒に使用する複数のASGは、同一の仮想ネットワークに属している必要があります。異なるVNetにまたがるASGを同じ規則で組み合わせることはできません。4つ目も誤りです。NSGはサブネットまたは個々のNIC(ネットワークインターフェイス)に関連付けることができ、サブスクリプションレベルに直接関連付ける機能ではありません。"
},
{
  domain: "インフラ",
  scenario: "VMへの管理アクセス(RDP/SSH)を、パブリックIPアドレスを一切公開せずに、ブラウザーからAzure Portal経由で安全に行いたいと考えています。<br>・VPNクライアントの構成やジャンプボックスVMの管理は避けたい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Bastion",
    "NAT ゲートウェイ",
    "Point-to-Site VPN",
    "踏み台(ジャンプボックス)VMを手動で構築する"
  ],
  answer: 0,
  explanation: "Azure Bastionは、VNet内に専用サブネット(AzureBastionSubnet)としてデプロイされるフルマネージドのPaaSサービスで、Azure PortalからTLS(443番ポート)経由のHTML5ブラウザーセッションを通じて、対象VMへRDP/SSH接続を提供します。VM自体にパブリックIPアドレスを割り当てる必要がなく、VPNクライアントのインストール・構成や、自前でジャンプボックスVMを構築・パッチ管理する運用負担もかかりません。<br>NATゲートウェイはアウトバウンド接続専用のサービスであり、インバウンドの管理アクセスには使用しません。Point-to-Site VPNは実現可能な代替手段の一つですが、クライアント証明書の配布やVPNクライアントソフトウェアの構成が必要になり、要件(VPNクライアント構成を避けたい)に反します。踏み台VMを手動構築する方法は、そのVM自体の管理・パッチ適用・セキュリティ確保が新たな運用負担になります。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Traffic Manager、Application Gateway、Azure Front Door、Azure CDNの特徴を比較しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "Traffic ManagerはDNSベースでルーティングを行い、実際のトラフィックをプロキシしない",
    "Application Gatewayはグローバルサービスであり、単一のデプロイで全リージョンのトラフィックを処理できる",
    "Azure Front Doorはレイヤー7で動作し、WAFやURLパスベースのルーティングをサポートするグローバルサービスである",
    "Azure CDNはVNet内部のプライベートリソース間の負荷分散に使用される"
  ],
  answer: [0,2],
  explanation: "正しいのは1つ目と3つ目です。Traffic ManagerはDNSレベルでの応答のみを行い、トラフィックそのものを中継(プロキシ)しません。Azure Front Doorはグローバルに展開されたレイヤー7のリバースプロキシで、WAFやURLパスベースのルーティングなどの高度な機能を備えています。<br>2つ目は誤りです。Application Gatewayはリージョナルサービスであり、特定のリージョンのVNet内にデプロイされます。複数リージョンにまたがる場合は、リージョンごとにApplication Gatewayを配置し、Traffic ManagerやFront Doorと組み合わせる必要があります。4つ目も誤りです。Azure CDNは公開されたエンドポイントに対する静的コンテンツのキャッシュ配信サービスであり、VNet内部のプライベートリソース間の負荷分散を行う機能ではありません。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "Azure Migrateを使用してオンプレミスサーバーをAzureへ移行する標準的なプロセスを計画しています。",
  question: "実施する順序に並べ替えてください。",
  choices: [
    "Azure Migrateアプライアンスを使用してオンプレミスサーバーを検出する",
    "検出されたサーバーのAzure適合性を評価する(右サイジング・コスト見積もり)",
    "サーバーのレプリケーションを開始する",
    "カットオーバーを実行して移行を完了する"
  ],
  answer: [0,1,2,3],
  explanation: "Azure Migrateを用いた標準的な移行プロセスは、大きく「検出」「評価」「移行」の段階で進みます。まずAzure Migrateアプライアンスをオンプレミス環境にデプロイし、対象サーバーの構成やパフォーマンスデータを検出(Discover)します。次に、検出したデータをもとにAzureでの適合性評価(右サイジング、月額コスト見積もりなど)を行います。評価結果をもとに移行対象を決定したら、サーバーのディスクデータのレプリケーションを開始し、Azure側に継続的にデータを複製します。最後に、レプリケーションが十分に追いついた段階でカットオーバー(移行の切り替え)を実行し、Azure上での稼働に切り替えて移行を完了します。<br>この順序(検出→評価→レプリケーション→カットオーバー)を踏まずにレプリケーションやカットオーバーを先に行うことはできません。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "あるサブネットのNSGには、次の受信規則が設定されています。<br>・カスタム規則(優先度100)<br>・カスタム規則(優先度300)<br>・既定の規則 AllowVnetInBound(優先度65000)<br>・既定の規則 DenyAllInBound(優先度65500)",
  question: "評価される順序(先に評価される順)に並べ替えてください。",
  choices: [
    "カスタム規則(優先度100)",
    "カスタム規則(優先度300)",
    "既定の規則 AllowVnetInBound(優先度65000)",
    "既定の規則 DenyAllInBound(優先度65500)"
  ],
  answer: [0,1,2,3],
  explanation: "NSGのセキュリティ規則は、優先度の数値が小さいほど先に評価されます(優先度は100〜4096の範囲でカスタム規則を設定可能)。そのため、優先度100の規則がまず評価され、次に優先度300の規則が評価されます。カスタム規則で一致しなかった場合、次に既定の規則が優先度の低い(数値の大きい)順、すなわちAllowVnetInBound(65000)、続いてDenyAllInBound(65500)の順に評価されます。既定の規則は各NSGに自動的に含まれ、優先度が65000番台に固定されているため、常にカスタム規則より後に評価されます。<br>この評価順序を理解しておくことは、複数の規則が重複・矛盾しているように見える場合に、実際にどの規則が適用されるかを判断するうえで重要です。"
},
{
  domain: "インフラ",
  scenario: "API Managementで、SLAが保証された本番運用レベルのAPIゲートウェイが必要ですが、仮想ネットワーク統合や複数リージョンへの展開は不要です。<br>・Basicレベルよりもキャッシュサイズやスループットのスケールが大きいレベルが必要である",
  question: "どのAPI Management価格レベルを推奨しますか?",
  choices: [
    "Standard",
    "Basic",
    "Consumption",
    "Developer"
  ],
  answer: 0,
  explanation: "Standardレベルは、Basicレベルと同様に本番運用向けのSLAを提供しつつ、Basicレベルよりも大きなユニット単位のキャッシュサイズやスループットにスケールできる、中間的な本番運用レベルです。VNet統合や複数リージョンデプロイのような高度な機能は不要という要件のため、それらの機能を持つPremiumレベルまで上げる必要はありません。<br>Basicレベルは本番運用に使用できますが、キャッシュサイズやスループットの上限がStandardより低く、要件(より大きなスケール)を満たしません。Consumptionは従量課金のサーバーレスモデルで、固定容量のスケール特性が異なるため要件に合致しません。DeveloperレベルはSLAが提供されないため、本番運用の要件を満たしません。"
},
{
  domain: "インフラ",
  scenario: "数百万台のIoTデバイスから、毎秒数百万件規模のテレメトリデータを継続的に取り込み、リアルタイム分析パイプラインに供給するソリューションを設計しています。<br>・複数の独立したコンシューマーが同じストリームをそれぞれ読み取れる必要がある<br>・取り込んだデータを一定期間保持し、再生(リプレイ)できる必要がある",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Event Hubs",
    "Azure Event Grid",
    "Azure Service Bus トピック",
    "Azure Logic Apps"
  ],
  answer: 0,
  explanation: "Azure Event Hubsは、パーティション分割されたログベースのアーキテクチャにより、毎秒数百万件規模の高スループットなイベントストリームの取り込みに最適化されたビッグデータストリーミングサービスです。コンシューマーグループを使うことで、複数の独立したコンシューマーがそれぞれ自分のペースで同じストリームを並行して読み取れます。また、指定した保持期間内であればストリームを再生(リプレイ)できます。<br>Event Gridは離散的な反応型イベントのプッシュ通知に向いており、大量のテレメトリストリーム取り込みには適していません。Service Busはエンタープライズメッセージング(順序保証・トランザクション)向けであり、この規模のストリーミング取り込みを想定した設計ではありません。Logic Appsはワークフローオーケストレーションサービスであり、データ取り込み基盤そのものではありません。"
},
{
  domain: "インフラ",
  scenario: "単一のAzureリージョン内のVNetにデプロイされたWebアプリケーションがあります。<br>・レイヤー7でのHTTP負荷分散をVNet内で行う<br>・WAFによる保護を統合する<br>・URLパスに基づいたルーティングを行う<br>・グローバル展開は不要である",
  question: "何を推奨しますか?",
  choices: [
    "Azure Application Gateway",
    "Azure Traffic Manager",
    "Azure Front Door",
    "Azure CDN"
  ],
  answer: 0,
  explanation: "Application Gatewayはリージョナルなレイヤー7ロードバランサーで、VNet内にデプロイしてバックエンドプールへのHTTP(S)トラフィックを分散します。WAF SKUを選択することでWAF保護を統合でき、URLパスベースのルーティング、複数サイトホスティングもサポートします。単一リージョン・VNet内での要件に最も適しています。<br>Traffic ManagerはDNSベースのグローバルルーティングサービスでVNet内部の負荷分散には使用しません。Azure Front Doorはグローバルサービスであり、単一リージョン限定の要件にはオーバースペックです。Azure CDNは静的コンテンツのキャッシュ用途であり、WAFやパスベースルーティングを伴うアプリケーションゲートウェイの代替にはなりません。"
},
{
  domain: "インフラ",
  scenario: "Private LinkとPrivate Endpointという用語の違いについて整理しています。",
  question: "正しい説明はどれですか?",
  choices: [
    "Private Endpointは、特定のPaaSリソースへVNet内からプライベートに接続するためのネットワークインターフェイス(NIC)である",
    "Private LinkはPrivate Endpointの旧称であり、両者は同一機能を指す",
    "Private Endpointは、複数のPaaSリソースへの接続をすべて自動的に集約するゲートウェイである",
    "Private Linkは、VNet内のVM間通信を暗号化するための機能である"
  ],
  answer: 0,
  explanation: "Private Linkは、VNet(プライベートエンドポイント経由)とAzure PaaSサービス(またはお客様/パートナーが所有するサービス)との間をAzureのバックボーンネットワークを介してプライベートに接続するための基盤となる仕組み(テクノロジー)です。Private Endpointは、そのPrivate Linkを利用してVNet内に実際に配置される、特定の1つのPaaSリソースインスタンス(例: 特定のストレージアカウント)に対応するプライベートIPアドレスを持つネットワークインターフェイス(NIC)そのものを指します。<br>両者は同一の名称・機能ではなく、Private Linkが仕組み全体、Private Endpointがその中でVNet側に作られる具体的なリソースという関係です。Private Endpointは接続先ごとに個別に作成する必要があり、複数のPaaSリソースを自動集約するゲートウェイではありません。またVM間通信の暗号化とは目的が異なります。"
},
{
  domain: "インフラ",
  scenario: "オンプレミスでソフトウェアアシュアランス付きのWindows ServerおよびSQL Serverライセンスを保有している組織が、AzureへのVM移行を計画しています。<br>・既存のライセンスを再利用してAzure上のコンピューティングコストを削減したい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Hybrid Benefit",
    "Reserved Instances",
    "Spot 仮想マシン",
    "Savings Plan for compute"
  ],
  answer: 0,
  explanation: "Azure Hybrid Benefitは、ソフトウェアアシュアランス付きのオンプレミスWindows ServerライセンスやSQL Serverライセンス(または該当するサブスクリプションライセンス)をAzure上で再利用できるようにする特典です。これにより、AzureのWindows VMやSQL Databaseなどを利用する際、ライセンス費用分が差し引かれ、基本的なコンピュートレートのみの支払いで済むため、大幅なコスト削減が可能です。<br>Reserved InstancesやSavings Planは使用量のコミットメントによる割引、Spot仮想マシンは中断許容による割引であり、いずれも「既存のオンプレミスライセンスの再利用」という要件には直接対応しません。Azure Hybrid Benefitはこれらの購入モデルと併用することも可能です。"
},
{
  domain: "インフラ",
  scenario: "既存のASP.NET Webアプリケーションを、コンテナー化などのアーキテクチャ変更を行わずにAzureへ移行するソリューションを設計しています。<br>・組み込みのオートスケールとデプロイスロットを利用したい<br>・インフラ管理の作業量を最小限に抑える",
  question: "何を推奨しますか?",
  choices: [
    "Azure App Service",
    "Azure Kubernetes Service (AKS)",
    "Azure Container Apps",
    "Azure Virtual Machines"
  ],
  answer: 0,
  explanation: "Azure App Serviceは、Webアプリケーションをコンテナー化やアーキテクチャの大幅な変更なしにそのままデプロイできるフルマネージドのPaaSです。組み込みのオートスケール、デプロイスロットによるステージング/本番切り替え、証明書管理などの機能を備え、インフラ(OSパッチ適用やスケーリングの仕組み)の管理を最小限に抑えられます。<br>AKSやContainer Appsはコンテナー化を前提としたサービスであり、既存アプリをそのまま移行する要件には追加の作業(コンテナーイメージ化)が必要になります。Virtual Machinesを使う方法はOSやミドルウェアの管理責任がすべて利用者側に残り、インフラ管理を最小化するという要件に反します。"
},
{
  domain: "インフラ",
  scenario: "Web層、アプリケーション層、データベース層のVMがそれぞれ多数存在する環境で、NSGのセキュリティ規則を管理しています。<br>・VMの台数が増減するたびに、個々のIPアドレスをNSG規則から追加・削除する作業を避けたい<br>・役割ごとにVMを論理的にグループ化し、そのグループ名を規則の送信元/宛先として指定したい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "アプリケーションセキュリティグループ (ASG)",
    "仮想ネットワークピアリング",
    "ルートテーブル (UDR)",
    "Azure Firewall"
  ],
  answer: 0,
  explanation: "アプリケーションセキュリティグループ(ASG)は、VMのネットワークインターフェイス(NIC)を、アプリケーション上の役割(Web層、アプリ層、DB層など)ごとに論理的にグループ化する機能です。NSGのセキュリティ規則の送信元/宛先にASGを指定できるため、VMが増減してもNSG規則そのものを変更する必要がなく、対象のNICをASGに追加/削除するだけで済みます。<br>仮想ネットワークピアリングはVNet同士を接続する機能、ルートテーブル(UDR)はトラフィックのルーティング経路を制御する機能であり、いずれもセキュリティ規則の送信元/宛先のグループ化には使用しません。Azure Firewallはネットワーク全体の集中的なファイアウォールですが、この要件(NSG規則でのVMグループ化)に直接対応する機能はASGです。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Azure App Serviceでホストされているアプリケーションから、Azure Key Vaultに格納されたデータベース接続文字列のシークレットを参照する必要があります。<br>・シークレットの値をアプリケーション設定やソースコードに直接保存してはならない<br>・管理作業を最小限に抑える",
  question: "何を推奨しますか?",
  choices: [
    "App Serviceにマネージド IDを構成し、アプリケーション設定でKey Vault参照を使用する",
    "シークレットの値をApp Serviceのapplication settingsに直接コピーする",
    "シークレットの値をソースコードに埋め込み、リポジトリへのアクセスを制限する",
    "App Serviceの発行プロファイル(publish profile)にシークレットを保存する"
  ],
  answer: 0,
  explanation: "App Serviceでは、システム割り当てまたはユーザー割り当てのマネージドIDを有効にし、そのIDにKey Vault上のシークレットへのアクセス権(RBACならKey Vault Secrets User、アクセスポリシーならGet権限)を付与したうえで、アプリケーション設定の値に@Microsoft.KeyVault(...)形式のKey Vault参照を記述する方法が推奨されます。アプリケーションはコード変更なしに、実行時に自動的にKey Vaultから最新のシークレット値を取得できます。<br>シークレットの値をアプリケーション設定やコードに直接保存する方法は、値がそのまま平文で管理プレーンやソース管理に残ってしまうため、要件に反します。発行プロファイルはデプロイ資格情報のファイルであり、アプリケーションシークレットの参照先としては使用しません。"
},
{
  domain: "データストレージ",
  scenario: "Webアプリケーションのフロントエンドとバックエンドワーカー間で、シンプルな非同期処理のためのメッセージキューを構成するソリューションを設計しています。<br>・エンタープライズ向けの高度なメッセージングトポロジ(トピック、セッション、トランザクション)は不要である<br>・可能な限り低コストでシンプルに実装したい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Queue Storage",
    "Azure Service Bus トピック",
    "Azure Event Hubs",
    "Azure Table Storage"
  ],
  answer: 0,
  explanation: "Azure Queue Storageは、Storageアカウント内で利用できるシンプルで低コストなメッセージキューイングサービスです。基本的な非同期のメッセージ受け渡しに必要な機能(エンキュー、デキュー、可視性タイムアウトなど)を備えており、トピックやセッション、トランザクションのような高度なエンタープライズメッセージング機能が不要なシナリオでは、Service Busよりもシンプルかつ低コストに実装できます。<br>Service Busトピックはpub/subモデルや高度な機能を提供しますが、その分コストや複雑性も増すため、今回のようなシンプルな要件には過剰です。Event Hubsは大量ストリーミングデータの取り込みに特化しており、単純な非同期メッセージキューの用途には適しません。Table StorageはNoSQLデータストアであり、メッセージキューイングの仕組み(可視性タイムアウトなど)は持ちません。"
},
{
  domain: "インフラ",
  scenario: "中断が発生しても再実行可能な、フォールトトレラントなバッチデータ処理ワークロードがあります。<br>・可能な限り低コストで実行したい<br>・Azureの需要によりいつでも短い通知で退避(evict)される可能性を許容できる",
  question: "何を推奨しますか?",
  choices: [
    "Spot 仮想マシン",
    "Reserved Instances",
    "専用ホスト (Azure Dedicated Host)",
    "Savings Plan for compute"
  ],
  answer: 0,
  explanation: "Spot仮想マシンは、Azureデータセンター内の未使用の余剰キャパシティを、通常の従量課金と比較して大幅な割引(最大90%程度)で利用できるオプションです。ただし、Azureがそのキャパシティを他の需要のために必要とした場合、短い通知(退避通知)でVMが強制的に退避(evict)される可能性があります。そのため、中断を許容できるフォールトトレラントなバッチ処理や、状態を持たない再実行可能なワークロードに適しています。<br>Reserved InstancesやSavings Planは、常時安定して稼働させることを前提としたコミットメント型の割引であり、中断を前提とした最安のオプションではありません。専用ホストは物理サーバーを専有する形態で、むしろコストは高くなる傾向があり、中断耐性ワークロードの低コスト化には向きません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Reserved Instances、Savings Plan、Spot仮想マシンの特徴を比較しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "Reserved Instancesは、同一のインスタンスサイズフレキシビリティグループ内であれば異なるVMサイズにも適用できる",
    "Spot仮想マシンは、Azureがキャパシティを必要とする場合などに短い通知で退避される可能性がある",
    "Savings Planは仮想マシンにのみ適用され、他のコンピューティングサービスには適用できない",
    "Reserved Instancesは中断が許容されるワークロード向けに設計されている"
  ],
  answer: [0,1],
  explanation: "正しいのは1つ目と2つ目です。Reserved Instancesには「インスタンスサイズフレキシビリティ」という仕組みがあり、同一のVMシリーズ内であれば予約が異なるサイズのVMにも自動的に適用されます。Spot仮想マシンは、Azureが他の優先度の高い需要のためにキャパシティを必要とした場合などに、短い通知(退避通知)で強制的に停止・削除される可能性があるオプションです。<br>3つ目は誤りです。Savings Plan for computeはVMだけでなく、App Service、Azure Functions Premium、Container Instances、Dedicated Hostなど幅広いコンピューティングサービスに自動的に適用されます。4つ目も誤りです。中断が許容されるワークロード向けに設計されているのはSpot仮想マシンであり、Reserved Instancesは安定的に稼働し続けるワークロード向けのコミットメント割引です。"
},
{
  domain: "インフラ",
  scenario: "複数のAzureリージョンおよびオンプレミスにデプロイされた、HTTP以外のプロトコル(カスタムTCPサービス)を含む複数のエンドポイントがあります。<br>・DNSレベルでのリージョン間ルーティングを行う<br>・実際のトラフィックをプロキシしない方式を使用する<br>・パフォーマンスルーティング方式を使用したい",
  question: "何を推奨しますか?",
  choices: [
    "Azure Traffic Manager",
    "Azure Application Gateway",
    "Azure Front Door",
    "Azure Load Balancer"
  ],
  answer: 0,
  explanation: "Traffic Managerは、DNSクエリに対して最適なエンドポイントのIPアドレスを返すだけの仕組みで、実際のトラフィック自体はプロキシしません。そのためHTTP以外の任意のTCP/UDPプロトコルにも対応でき、優先度・重み付け・パフォーマンス・地理的などのルーティング方式を選択できます。<br>Application GatewayとFront Doorはいずれもレイヤー7のリバースプロキシであり、HTTP(S)トラフィックのみを扱うため、HTTP以外のプロトコルを含む要件には適合しません。Azure Load Balancerはリージョン内のレイヤー4負荷分散であり、リージョンをまたぐDNSベースのルーティングは行いません。"
},
{
  domain: "インフラ",
  scenario: "グローバルに分散したAPI利用者に対して低レイテンシでAPIを提供するAPI Managementソリューションを設計しています。<br>・複数のAzureリージョンにゲートウェイを配置し、単一の管理プレーンで運用したい<br>・APIバックエンドが配置された仮想ネットワークにAPI Managementを注入(VNet統合)する必要がある",
  question: "どのAPI Management価格レベルを推奨しますか?",
  choices: [
    "Premium",
    "Standard",
    "Basic",
    "Consumption"
  ],
  answer: 0,
  explanation: "API ManagementのPremiumレベルは、複数のAzureリージョンにゲートウェイをデプロイし、単一のAPI Managementインスタンス(単一の管理プレーン)で運用できる唯一の価格レベルです。また、仮想ネットワークへの注入(VNet統合、内部/外部モード)にも対応しており、バックエンドが配置されたVNet内からプライベートにAPIを公開・アクセスできます。可用性ゾーンのサポートなど、大規模なエンタープライズ要件にも対応します。<br>Standard/Basicレベルは本番運用向けのSLAを持ちますが、複数リージョンへのゲートウェイデプロイやVNet注入はサポートしていません。Consumptionレベルはサーバーレスの従量課金モデルで軽量なAPI向けであり、これらの高度な機能(マルチリージョン、VNet統合)は提供しません。"
},
{
  domain: "インフラ",
  scenario: "Blob Storageへのファイルアップロードをトリガーとして、短時間で完了する画像リサイズ処理を実行するソリューションを設計しています。<br>・アイドル時には課金が発生しないようにする<br>・サーバーやインフラの管理を最小限に抑える",
  question: "何を推奨しますか?",
  choices: [
    "Azure Functions (消費(Consumption)プラン)",
    "Azure Logic Apps",
    "Azure Kubernetes Service (AKS)",
    "Azure App Service (専用プラン)"
  ],
  answer: 0,
  explanation: "Azure FunctionsのConsumptionプランは、イベント駆動型の短時間実行タスクに最適なサーバーレスの実行環境です。トリガー(Blobアップロードなど)が発生したときのみ関数が実行され、実行時間に応じて課金されます。アイドル時は自動的にゼロにスケールし課金が発生しません。インフラの管理はほぼ不要です。<br>Logic Appsも同様にサーバーレスですが、主にコネクタを使ったワークフロー/業務プロセスの構築に向いており、画像処理のようなカスタムコードロジックを実行する場合はFunctionsの方が適しています。AKSはクラスターとノードの管理が必要でアイドル時もコストが発生します。App Serviceの専用プランは常時起動するインスタンスに対して固定費用がかかり、アイドル時課金を避けたい要件には合いません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "アプリケーションで使用する暗号化キーをハードウェアセキュリティモジュール(HSM)で保護する必要があります。<br>・Key VaultのStandardレベルとPremiumレベルのどちらかを選択する<br>・Managed HSMは今回は使用しない",
  question: "どちらのレベルを選択しますか?",
  choices: [
    "Premiumレベル",
    "Standardレベル",
    "Freeレベル",
    "Basicレベル"
  ],
  answer: 0,
  explanation: "Key VaultのStandardレベルは、キーやシークレットをソフトウェアで暗号化して保護しますが、HSM保護のキーは作成できません。HSM(ハードウェアセキュリティモジュール)によって保護されたキーを使用するには、Premiumレベルを選択する必要があります。Premiumレベルでは、マルチテナントのFIPS 140-2 Level 2検証済みHSMを背後で使用してキーを保護します。<br>なお、Key VaultにはFree/Basicといった価格レベルは存在しないため、これらは明確な誤答です。"
},
{
  domain: "インフラ",
  scenario: "社内の複数の独立したアプリケーションが、同一の注文イベントメッセージをそれぞれ異なるフィルター条件で受信する必要があるエンタープライズメッセージングシステムを設計しています。<br>・各購読者は自分に関連するメッセージのみをフィルターで受信する<br>・メッセージの順序保証とトランザクションが必要である",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Service Bus トピックとサブスクリプション",
    "Azure Event Grid のカスタムトピック",
    "Azure Event Hubs のコンシューマーグループ",
    "Azure Storage キュー"
  ],
  answer: 0,
  explanation: "Azure Service Busのトピックとサブスクリプションは、パブリッシュ/サブスクライブ(pub/sub)モデルを実現する機能です。1つのトピックに送信されたメッセージのコピーが、条件に合致する各サブスクリプションへ配信されます。SQLフィルターや相関フィルターにより、サブスクリプションごとに受信するメッセージを絞り込めます。さらにメッセージセッションによる順序保証やトランザクションもサポートしており、エンタープライズ要件に合致します。<br>Event Gridは反応型のイベント通知に強みがありますが、順序保証やトランザクションといったエンタープライズメッセージング機能は前提としていません。Event Hubsのコンシューマーグループは、同一ストリームを複数の読み取り側が独立して読むための仕組みであり、サブスクライバーごとの条件フィルタリングには向きません。Storageキューはpub/subのトポロジ自体をサポートしていません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "自社で開発したサービスを、Standardロードバランサーの背後に配置し、他のVNetやサブスクリプションの顧客に対してプライベートに公開するソリューションを設計しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "サービス提供者側では、Standardロードバランサーの背後にPrivate Link Serviceを作成して公開する",
    "サービス利用者側では、自分のVNetにPrivate Endpointを作成してPrivate Link Serviceに接続する",
    "Private Link Serviceを使用すると、利用者はサービス提供者のVNetのアドレス空間全体にアクセスできるようになる",
    "Private Link Serviceを利用するには、利用者と提供者が同一のAzure ADテナントに属している必要がある"
  ],
  answer: [0,1],
  explanation: "正しいのは1つ目と2つ目です。サービス提供者は、Standard SKUのロードバランサーの背後にPrivate Link Serviceを作成することで、自分のサービスを他のVNetやサブスクリプション(場合によっては他のAzure ADテナント)の利用者にプライベートに公開できます。サービス利用者は、自身のVNet内にPrivate Endpointを作成し、そのPrivate Endpointを提供者のPrivate Link Serviceに接続承認(または自動承認)することで、プライベートIPアドレス経由でサービスにアクセスできます。<br>3つ目は誤りです。Private Link Serviceによる接続では、利用者は特定のサービス(ロードバランサーの背後の特定のエンドポイント)にのみアクセスでき、提供者側VNetのアドレス空間全体への到達性を得るわけではありません。これはネットワークの分離を保ったまま特定サービスのみを公開できる利点です。4つ目も誤りです。Private Link Serviceは異なるAzure ADテナント間(異なる組織間)でも利用可能であり、同一テナントであることは要件ではありません。"
},
{
  domain: "インフラ",
  scenario: "世界中のユーザーに配信される静的コンテンツ(画像、動画、JavaScript/CSSファイル)を格納したWebアプリケーションがあります。<br>・エッジサーバーでのキャッシュにより配信を高速化する<br>・オリジンサーバーの負荷を軽減する<br>・WAFやパスベースルーティングなどの高度なレイヤー7機能は不要である",
  question: "何を推奨しますか?",
  choices: [
    "Azure CDN",
    "Azure Front Door",
    "Azure Application Gateway",
    "Azure Traffic Manager"
  ],
  answer: 0,
  explanation: "Azure CDNは、世界中に分散されたエッジPoP(Point of Presence)に静的コンテンツをキャッシュし、ユーザーに近い場所から低レイテンシで配信することに特化したサービスです。オリジンサーバーへのリクエスト数を減らし、負荷を軽減できます。WAFやパスベースルーティングのような高度な機能が不要な今回の要件には、最もシンプルでコスト効率の良い選択です。<br>Front DoorやApplication Gatewayはより高機能なレイヤー7サービスですが、静的コンテンツのキャッシュ配信のみが目的であれば過剰な機能です。Traffic ManagerはDNSルーティングのみでキャッシュ機能は持ちません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "Key Vaultの論理削除(Soft delete)と発行保護(Purge protection)の動作を確認しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "新規に作成されるKey Vaultでは、論理削除は既定で有効になっている",
    "発行保護(Purge protection)は一度有効にすると無効化できない",
    "発行保護を有効にしなくても、保持期間中の完全削除(パージ)を防止できる",
    "論理削除の保持期間はユーザーが1〜7日の範囲で任意に設定できる"
  ],
  answer: [0,1],
  explanation: "正しいのは1つ目と2つ目です。現在、新規に作成されるすべてのKey Vaultで論理削除は既定で有効になっており、無効化できません。削除されたオブジェクト(および削除されたVault自体)は保持期間中、削除済み状態で保持され、リストア(復元)が可能です。発行保護を有効にすると、この保持期間が終了するまでは、Owner権限を持つユーザーであっても完全な削除(パージ)を実行できなくなり、一度有効化すると無効化できない一方向の設定です。<br>3つ目は誤りです。発行保護を有効にしていない場合、削除権限を持つユーザーは保持期間中でもVaultやオブジェクトを完全にパージできてしまいます。悪意のある削除やランサムウェア攻撃からの保護を意図するなら、発行保護の有効化が必須です。4つ目も誤りです。論理削除の保持期間は既定90日で、7〜90日の範囲で設定します(1〜7日ではありません)。"
},
{
  domain: "インフラ",
  scenario: "Azure Functionsの前面に配置するAPIゲートウェイを設計しています。<br>・トラフィック量が非常に少なく断続的である<br>・アイドル時の固定インフラコストを発生させたくない<br>・呼び出し回数に応じた従量課金を希望する",
  question: "どのAPI Management価格レベルを推奨しますか?",
  choices: [
    "Consumption",
    "Developer",
    "Standard",
    "Premium"
  ],
  answer: 0,
  explanation: "API ManagementのConsumptionレベルは、サーバーレスの従量課金モデルで動作し、リクエスト数に応じて自動的にスケールし、実行された呼び出しに対してのみ課金されます。アイドル時には固定コストが発生しないため、トラフィック量が少なく断続的なワークロードに最も適しています。<br>Developer、Standard、Premiumはいずれも固定容量のユニットをプロビジョニングする形態のレベルで、トラフィックの有無にかかわらず固定インフラコストが発生します。特にDeveloperレベルは評価/非運用環境向けでSLAが提供されないため、要件を満たす選択肢はConsumptionです。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "API Managementの価格レベルの特徴を比較しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "Developerレベルは評価や非運用環境向けであり、SLAが提供されない",
    "Consumptionレベルはリクエスト数に応じて自動的にスケールし、呼び出し単位で課金される",
    "Premiumレベルは仮想ネットワーク統合をサポートしない唯一のレベルである",
    "Basicレベルは複数リージョンへのゲートウェイのデプロイをサポートする"
  ],
  answer: [0,1],
  explanation: "正しいのは1つ目と2つ目です。Developerレベルは、API Managementの全機能を評価・テストする目的で提供される非運用環境向けのレベルで、SLAは提供されません。Consumptionレベルはサーバーレスの従量課金モデルで、リクエスト数に応じて自動的にスケールし、呼び出しごとに課金されます。<br>3つ目は誤りです。仮想ネットワーク統合(VNet注入)をサポートするのはPremiumレベルであり、「サポートしない唯一のレベル」という説明は事実と逆です。4つ目も誤りです。複数リージョンへのゲートウェイデプロイをサポートするのはPremiumレベルのみであり、Basicレベルはこの機能を持ちません。"
},
{
  domain: "データストレージ",
  scenario: "大量のシンプルな構造化データ(ユーザープロファイル、デバイスの状態など)を、パーティションキーと行キーによる高速な検索が可能な形で低コストに格納するソリューションを設計しています。<br>・複雑なリレーショナルクエリやJOINは不要である<br>・スキーマレスなNoSQLキー/値ストアが望ましい",
  question: "何を使用することを推奨しますか?",
  choices: [
    "Azure Table Storage",
    "Azure Blob Storage (Archiveアクセス層)",
    "Azure Files",
    "Azure SQL Database"
  ],
  answer: 0,
  explanation: "Azure Table Storageは、パーティションキーと行キーの組み合わせによってエンティティを一意に識別する、スキーマレスなNoSQLキー/値ストアです。大量の構造化データに対して低コストかつ高速なポイント検索を提供する用途に適しており、複雑なリレーショナルクエリやJOINを必要としないシナリオに向いています。<br>Blob Storage(Archiveアクセス層)はオフラインのアーカイブデータ向けであり、リアルタイムの検索・アクセスには向きません。Azure Filesはファイル共有(SMB/NFS)向けのサービスであり、キー/値形式の高速検索には適していません。Azure SQL Databaseはリレーショナルデータベースであり、JOINや複雑なクエリが不要でスキーマレス性を求める今回の要件に対しては、Table Storageの方がシンプルで低コストです。"
},
{
  domain: "データストレージ",
  type: "multi",
  scenario: "Azure Blob Storageのアクセス層(Hot、Cool、Cold、Archive)の特徴を比較しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "Archive層に格納されたデータへアクセスするには、事前にリハイドレート(復元)が必要であり、取得まで数時間かかる場合がある",
    "Cool層は、Hot層と比較してストレージコストは低いがデータアクセスコストは高く、最低保持期間が設定されている",
    "Hot層は、月に数回程度しかアクセスされないデータに最も適した最安のアクセス層である",
    "Archive層のデータは、オンラインのまま即座に読み取りアクセスが可能である"
  ],
  answer: [0,1],
  explanation: "正しいのは1つ目と2つ目です。Archive層はオフラインの階層であり、格納されたBlobを読み取るには事前にHotまたはCool層へのリハイドレート(復元)操作が必要で、優先度に応じて完了まで数時間程度かかる場合があります。その代わり、ストレージコスト自体は最も低く抑えられます。Cool層は、頻繁にはアクセスされない(目安として30日未満の頻度ではない)データ向けの階層で、Hot層よりもストレージコストは低い一方、データの読み取り/書き込みにかかるアクセスコストは高くなり、最低保持期間(早期削除した場合に追加料金が発生する期間)が設定されています。<br>3つ目は誤りです。Hot層は頻繁にアクセスされるデータ向けの階層で、ストレージコストは最も高く、アクセスコストは最も低い階層です。月に数回程度の低頻度アクセスに適しているのはCoolやCold層です。4つ目も誤りです。Archive層はオフライン階層のため、即座の読み取りアクセスはできず、リハイドレートが必須です。"
},
{
  domain: "インフラ",
  scenario: "ビジネスクリティカルなアプリケーションが配置された仮想ネットワークについて、DDoS対策ソリューションを設計しています。<br>・アプリケーションのトラフィックパターンに合わせてチューニングされた緩和ポリシーが必要<br>・攻撃時のリソースのスケールアウトに対するコスト保護(コストクレジット)が必要<br>・攻撃の詳細な分析レポートが必要",
  question: "何を推奨しますか?",
  choices: [
    "Azure DDoS Protection Standard (Network Protection) の有効化",
    "既定で有効なAzure DDoS Protection Basicのみ",
    "Azure Web Application Firewall (WAF) の有効化",
    "Azure Bastionの導入"
  ],
  answer: 0,
  explanation: "Azure DDoS Protection Standard(Network Protection)は、仮想ネットワーク単位で明示的に有効化する追加の保護レベルで、アプリケーション固有のトラフィックパターンに基づいてチューニングされた緩和ポリシー、Azure Monitorと統合された詳細な攻撃分析・ミティゲーションレポート、そして文書化された攻撃時にスケールアウトによって発生した追加コストを補填するコスト保護(コストクレジット)を提供します。<br>DDoS Protection Basicはこれらの高度な機能(チューニング、詳細レポート、コスト保護)を提供しません。WAFはレイヤー7のWebアプリケーション攻撃(SQLインジェクションなど)対策であり、ネットワーク層のDDoS対策とは目的が異なります。Azure Bastionは安全なVM管理接続のためのサービスであり、DDoS対策とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "規制要件により、暗号キーをFIPS 140-2 Level 3認定のシングルテナント専用HSMプールで保護する必要があるシステムを設計しています。<br>・キー管理はフルマネージドサービスを利用する<br>・他のテナントとHSMハードウェアを共有してはならない",
  question: "何を推奨しますか?",
  choices: [
    "Azure Key Vault Managed HSM",
    "Azure Key Vault Standardレベル",
    "Azure Key Vault Premiumレベル",
    "Azure Dedicated HSM"
  ],
  answer: 0,
  explanation: "Azure Key Vault Managed HSMは、フルマネージドでシングルテナント(自分専用)のFIPS 140-2 Level 3認定HSMプールを提供するサービスです。Key Vaultと同様のAPI/操作性を維持しながら、ハードウェアを他のテナントと共有しない専有プールでキーを保護できます。<br>Key VaultのStandardレベルはソフトウェアで保護されたキーのみをサポートし、HSM保護には対応しません。Premiumレベルもキーの保存にHSMを使用しますが、これはマルチテナント(複数顧客で共有)のHSMインフラであり、シングルテナント専有プールという要件は満たしません。Azure Dedicated HSMは物理HSMアプライアンスをIaaS的に占有利用するサービスですが、Key Vault APIとの統合はなく、キー管理の運用をより多く自分で行う必要があるため、フルマネージドという要件には適しません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Azure Event Grid、Azure Event Hubs、Azure Service Busの特徴を比較しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "Azure Event Gridは、プッシュ型でHTTPエンドポイントなどのハンドラーにイベント通知を配信する",
    "Azure Event Hubsは、パーティション分割されたストリームにより大量のテレメトリデータの取り込みに最適である",
    "Azure Service Busは、AMQPをサポートせずHTTPのみで通信する",
    "Azure Event Gridは、毎秒数百万件規模のテレメトリストリームの取り込み用途に最適である"
  ],
  answer: [0,1],
  explanation: "正しいのは1つ目と2つ目です。Event Gridは反応型のイベント配信サービスで、イベント発生時にHTTPエンドポイントなどのハンドラーへイベントをプッシュ配信します。Event Hubsはパーティション分割されたログベースの構造を持ち、大量のテレメトリデータをリアルタイムに取り込むストリーミング基盤として最適化されています。<br>3つ目は誤りです。Service BusはAMQP 1.0をサポートしており、これが主要なプロトコルの1つです。4つ目も誤りです。毎秒数百万件規模の高スループットなストリーミング取り込みが最適なのはEvent Hubsであり、Event Gridは離散的なイベントの反応型配信に特化したサービスです。"
},
{
  domain: "インフラ",
  scenario: "複数のSaaSサービス(Office 365、Salesforce、SharePointなど)と連携する承認ワークフローを構築するソリューションを設計しています。<br>・可能な限りコードを書かずにビジュアルデザイナーでワークフローを構築したい<br>・多数の既製コネクタを活用したい",
  question: "何を推奨しますか?",
  choices: [
    "Azure Logic Apps",
    "Azure Functions",
    "Azure Kubernetes Service (AKS)",
    "Azure Container Apps"
  ],
  answer: 0,
  explanation: "Azure Logic Appsは、ビジュアルデザイナーとローコードのアプローチでワークフローを構築できるサービスで、Office 365、Salesforce、SharePointなど数百種類の既製コネクタを利用してSaaSサービスやオンプレミスシステムと連携できます。承認フローのような人の介在を含む長期実行ワークフローの構築にも適しています。<br>Azure Functionsはカスタムコードによるイベント駆動処理に向いていますが、多数のSaaSコネクタを使ったローコードのワークフロー構築という要件には、Logic Appsの方が適しています。AKSやContainer Appsはコンテナー化されたアプリケーション/マイクロサービスの実行基盤であり、コネクタベースのワークフローオーケストレーションには直接対応しません。"
},
{
  domain: "インフラ",
  scenario: "VM、App Service、Azure Functions Premiumプランなど、複数の種類のコンピューティングサービスを利用しており、今後リージョンやインスタンスサイズが変化する可能性があります。<br>・特定のVM SKU/リージョンにコミットすることなく、幅広いコンピューティングサービスに対して柔軟にコスト削減を適用したい<br>・時間あたりの一定額の使用量をコミットする形態を希望する",
  question: "何を推奨しますか?",
  choices: [
    "Savings Plan for compute",
    "Reserved Instances",
    "Spot 仮想マシン",
    "Azure Hybrid Benefit"
  ],
  answer: 0,
  explanation: "Savings Plan for computeは、1年または3年間、時間あたり一定額(例: 1時間あたり$10など)のコンピューティング使用量をコミットすることで割引を受けられる購入モデルです。特定のVM SKUやリージョンに縛られず、VM、App Service、Azure Functions Premium、Container Instances、Dedicated Hostなど幅広い対象サービスに自動的に割引が適用されるため、将来的にリージョンやインスタンスサイズが変化する可能性がある環境に柔軟に対応できます。<br>Reserved Instancesは特定のVM SKU/リージョンへのコミットメントであり、対象範囲がより限定的です。Spot仮想マシンは中断を許容できるワークロード向けの割引であり、この要件(柔軟な幅広いサービスへの適用)には合致しません。Azure Hybrid Benefitはオンプレミスライセンスの持ち込みによる割引であり、使用量ベースのコミットメント割引とは異なる仕組みです。"
}
];
