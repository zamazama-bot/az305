// AZ-305: Azure Solutions Architect Expert
// MS形式 実戦 D（AKS・ネットワーク）（67問） - 再受験対策
// MS公式プラクティス評価と同じ簡潔な文体（選択肢はサービス名/設定名/SKU名/数値のみ）。
// 冒頭7問はケーススタディ形式。弱点3分野（データストレージ／高可用性／ログ監視）を重点的に、
// AZ-305出題範囲全体をカバー。解説は基礎から詳しく記載。

const QUESTIONS_SET10 = [
{
  domain: "インフラ",
  caseStudy: {
    title: "ケーススタディ: Contoso Logistics",
    body: "Contoso Logisticsは、全国に倉庫を展開する物流会社です。オンプレミスのデータセンターで稼働する倉庫管理アプリケーション(WMS)をAzureに移行します。<br>・現在の環境: オンプレミスのVMware環境で.NET Framework製のWMSと、SQL Serverデータベースが稼働している。オンプレミスDCとAzure間はExpressRouteで接続済み。<br>・移行計画: WMSはコンテナ化し、Azure Kubernetes Service (AKS)上で稼働させる。データベースはAzure SQL Managed Instanceへ移行する。<br>・可用性要件により、東日本(Japan East)をプライマリリージョン、西日本(Japan West)をDRリージョンとして、2つのAzureリージョンを使用する。<br>・各リージョンに、次のハブスポーク型ネットワークトポロジを構築する。<br>　- ハブVNet 1つ(サブネット3つ: AzureFirewallSubnet、GatewaySubnet、AzureBastionSubnet)<br>　- アプリケーション層用スポークVNet 1つ(サブネット3つ: AKSシステムノードプール用、AKSユーザーノードプール用、Application Gateway用)<br>　- データ層用スポークVNet 1つ(サブネット2つ: プライベートエンドポイント用、管理用踏み台VM用)<br>・各スポークVNetは、それぞれ自リージョンのハブVNetとのみピアリングされる。スポークVNet同士は直接ピアリングされない(ハブアンドスポーク型)。<br>・セキュリティ要件: AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要がある。<br>・コスト要件: 平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動フェイルオーバーする。平常時の追加コストは最小限に抑える。"
  },
  question: "この移行計画に基づき、東日本リージョンと西日本リージョンを合わせて作成する必要があるVNetの総数(リソースとしてのVNet数)はいくつですか?",
  choices: [
    "2",
    "3",
    "6",
    "4"
  ],
  answer: 2,
  explanation: "各リージョンには、ハブVNet 1つ、アプリケーション層用スポークVNet 1つ、データ層用スポークVNet 1つの、合計3つのVNetを作成する設計になっています。これを東日本・西日本の2リージョン分用意するため、VNetの総数は3 × 2 = 6個です。<br>誤答の理由: 「2」はリージョン数そのもの(VNet数ではない)。「3」は1リージョンあたりのVNet数であり、両リージョン合計ではない。「4」はどの内訳にも一致しません。VNetの数を問われた場合は、必ず『1リージョンあたりの内訳 × リージョン数』を整理してから合計することが重要です。"
},
{
  domain: "インフラ",
  caseStudy: {
    title: "ケーススタディ: Contoso Logistics",
    body: "Contoso Logisticsは、全国に倉庫を展開する物流会社です。オンプレミスのデータセンターで稼働する倉庫管理アプリケーション(WMS)をAzureに移行します。<br>・現在の環境: オンプレミスのVMware環境で.NET Framework製のWMSと、SQL Serverデータベースが稼働している。オンプレミスDCとAzure間はExpressRouteで接続済み。<br>・移行計画: WMSはコンテナ化し、Azure Kubernetes Service (AKS)上で稼働させる。データベースはAzure SQL Managed Instanceへ移行する。<br>・可用性要件により、東日本(Japan East)をプライマリリージョン、西日本(Japan West)をDRリージョンとして、2つのAzureリージョンを使用する。<br>・各リージョンに、次のハブスポーク型ネットワークトポロジを構築する。<br>　- ハブVNet 1つ(サブネット3つ: AzureFirewallSubnet、GatewaySubnet、AzureBastionSubnet)<br>　- アプリケーション層用スポークVNet 1つ(サブネット3つ: AKSシステムノードプール用、AKSユーザーノードプール用、Application Gateway用)<br>　- データ層用スポークVNet 1つ(サブネット2つ: プライベートエンドポイント用、管理用踏み台VM用)<br>・各スポークVNetは、それぞれ自リージョンのハブVNetとのみピアリングされる。スポークVNet同士は直接ピアリングされない(ハブアンドスポーク型)。<br>・セキュリティ要件: AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要がある。<br>・コスト要件: 平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動フェイルオーバーする。平常時の追加コストは最小限に抑える。"
  },
  scenario: "1つのリージョン内のアプリケーション層用スポークVNetのサブネット構成について検討しています。",
  question: "1つのリージョンにおけるアプリケーション層用スポークVNet内に作成するサブネットの数(このVNet単体に作成するサブネット数)はいくつですか?",
  choices: [
    "2",
    "4",
    "3",
    "1"
  ],
  answer: 2,
  explanation: "アプリケーション層用スポークVNetには、AKSシステムノードプール用サブネット、AKSユーザーノードプール用サブネット、Application Gateway用サブネットの3つを作成する設計です。<br>・AKSシステムノードプール: kube-systemなどAKSクラスターの基盤コンポーネント(CoreDNSなど)を稼働させる専用のノードプールで、通常アプリケーションのPodは配置しません。<br>・AKSユーザーノードプール: WMSアプリケーションのPodを実際に稼働させるノードプールです。<br>・Application Gateway用サブネット: WAF機能を持つApplication Gatewayを配置し、インバウンド通信を保護・ルーティングするための専用サブネットです(Application Gatewayはサブネットを他のリソースと共有できません)。<br>この3つ以外(ハブVNetの3サブネットやデータ層スポークVNetの2サブネット)は、別のVNetに属するため、このVNet単体のサブネット数には含めません。"
},
{
  domain: "インフラ",
  caseStudy: {
    title: "ケーススタディ: Contoso Logistics",
    body: "Contoso Logisticsは、全国に倉庫を展開する物流会社です。オンプレミスのデータセンターで稼働する倉庫管理アプリケーション(WMS)をAzureに移行します。<br>・現在の環境: オンプレミスのVMware環境で.NET Framework製のWMSと、SQL Serverデータベースが稼働している。オンプレミスDCとAzure間はExpressRouteで接続済み。<br>・移行計画: WMSはコンテナ化し、Azure Kubernetes Service (AKS)上で稼働させる。データベースはAzure SQL Managed Instanceへ移行する。<br>・可用性要件により、東日本(Japan East)をプライマリリージョン、西日本(Japan West)をDRリージョンとして、2つのAzureリージョンを使用する。<br>・各リージョンに、次のハブスポーク型ネットワークトポロジを構築する。<br>　- ハブVNet 1つ(サブネット3つ: AzureFirewallSubnet、GatewaySubnet、AzureBastionSubnet)<br>　- アプリケーション層用スポークVNet 1つ(サブネット3つ: AKSシステムノードプール用、AKSユーザーノードプール用、Application Gateway用)<br>　- データ層用スポークVNet 1つ(サブネット2つ: プライベートエンドポイント用、管理用踏み台VM用)<br>・各スポークVNetは、それぞれ自リージョンのハブVNetとのみピアリングされる。スポークVNet同士は直接ピアリングされない(ハブアンドスポーク型)。<br>・セキュリティ要件: AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要がある。<br>・コスト要件: 平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動フェイルオーバーする。平常時の追加コストは最小限に抑える。"
  },
  scenario: "VNetピアリングの構成数について検討しています。ここでの「ピアリングの組み合わせ数」とは、ピアリング対象となるVNetのペア(ハブとスポークの組)の数を指し、Azure上で双方向に作成される個々のピアリングリソースオブジェクトを別々にカウントするものではありません。",
  question: "このハブスポーク型トポロジ(スポーク同士は直接ピアリングしない)において、東日本と西日本の両リージョンを合わせて必要なVNetピアリングの組み合わせ数はいくつですか?",
  choices: [
    "2",
    "4",
    "6",
    "8"
  ],
  answer: 1,
  explanation: "1つのリージョンには、ハブVNet 1つとスポークVNet 2つ(アプリケーション層用・データ層用)があり、各スポークはハブとのみピアリングされます。したがって1リージョンあたりのハブ-スポークの組み合わせは、アプリケーション層スポーク-ハブの1組と、データ層スポーク-ハブの1組を合わせて2組です。これを東日本・西日本の2リージョン分用意するため、2 × 2 = 4組が必要です。<br>誤答の理由: 「2」は1リージョン分のみの組み合わせ数。「6」はVNetの総数(6個)と混同した誤り。「8」は、Azure上でピアリングが双方向の2つのリソース(ハブ→スポーク、スポーク→ハブ)として作成されることと組み合わせ数(4組)を混同し、4 × 2 = 8としてしまった誤りです。設問は「組み合わせ数」であって「作成されるピアリングリソースの数」ではない点に注意してください。なお、スポークVNet同士は直接ピアリングしないため、スポーク間の通信が必要な場合はハブ経由のルーティング(UDR)が別途必要になります。"
},
{
  domain: "インフラ",
  caseStudy: {
    title: "ケーススタディ: Contoso Logistics",
    body: "Contoso Logisticsは、全国に倉庫を展開する物流会社です。オンプレミスのデータセンターで稼働する倉庫管理アプリケーション(WMS)をAzureに移行します。<br>・現在の環境: オンプレミスのVMware環境で.NET Framework製のWMSと、SQL Serverデータベースが稼働している。オンプレミスDCとAzure間はExpressRouteで接続済み。<br>・移行計画: WMSはコンテナ化し、Azure Kubernetes Service (AKS)上で稼働させる。データベースはAzure SQL Managed Instanceへ移行する。<br>・可用性要件により、東日本(Japan East)をプライマリリージョン、西日本(Japan West)をDRリージョンとして、2つのAzureリージョンを使用する。<br>・各リージョンに、次のハブスポーク型ネットワークトポロジを構築する。<br>　- ハブVNet 1つ(サブネット3つ: AzureFirewallSubnet、GatewaySubnet、AzureBastionSubnet)<br>　- アプリケーション層用スポークVNet 1つ(サブネット3つ: AKSシステムノードプール用、AKSユーザーノードプール用、Application Gateway用)<br>　- データ層用スポークVNet 1つ(サブネット2つ: プライベートエンドポイント用、管理用踏み台VM用)<br>・各スポークVNetは、それぞれ自リージョンのハブVNetとのみピアリングされる。スポークVNet同士は直接ピアリングされない(ハブアンドスポーク型)。<br>・セキュリティ要件: AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要がある。<br>・コスト要件: 平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動フェイルオーバーする。平常時の追加コストは最小限に抑える。"
  },
  scenario: "AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要があります。",
  question: "AKSクラスターにどのネットワークプラグインを構成することを推奨しますか?",
  choices: [
    "Azure CNI",
    "Docker Bridge",
    "Azure CNI Overlay",
    "kubenet"
  ],
  answer: 0,
  explanation: "<div class='exp-diagram'>まずAKSにおけるPodとNodeの基本を整理します。<br>・Node: AKSクラスターを構成する仮想マシン(ワーカーインスタンス)。<br>・Pod: コンテナを実行する最小単位で、1つ以上のNode上にスケジュールされます。<br>・各Podには、選択したネットワークプラグインに応じて異なる方式でIPアドレスが割り当てられます。</div>比較:<br>・kubenet: NodeのみがVNetのIPアドレスを持ち、PodにはNode内部のプライベートなアドレス空間からIPが割り当てられます。Pod同士やPodからVNet外への通信は、NodeでNAT(送信元アドレス変換)されるため、Pod自身のIPアドレスを使ってVNetピアリング越しに直接到達することはできません。<br>・Azure CNI Overlay: Podには、VNetのアドレス空間とは別のオーバーレイ用アドレス空間からIPが割り当てられます。ノードのIPを使わずスケールしやすい一方、Pod IPはVNetにネイティブにルーティングされないため、ピアリング先への直接到達には追加の構成が必要です。<br>・Azure CNI(従来型): 各Podに、Nodeが所属するサブネットのアドレス空間から直接VNet内のIPアドレスが割り当てられます。このIPはVNet内はもちろん、VNetピアリングを介して接続された他のVNet(データ層スポーク)からも、Pod自身のIPアドレスとして直接ルーティング可能です。<br>本ケースの要件(PodのIPアドレスでピアリング越しにプライベートエンドポイントへ直接到達)を満たせるのはAzure CNIのみです。ただしAzure CNIはサブネットのIPアドレスをPodごとに消費するため、サブネットのアドレス空間サイズ設計に注意が必要です。"
},
{
  domain: "インフラ",
  caseStudy: {
    title: "ケーススタディ: Contoso Logistics",
    body: "Contoso Logisticsは、全国に倉庫を展開する物流会社です。オンプレミスのデータセンターで稼働する倉庫管理アプリケーション(WMS)をAzureに移行します。<br>・現在の環境: オンプレミスのVMware環境で.NET Framework製のWMSと、SQL Serverデータベースが稼働している。オンプレミスDCとAzure間はExpressRouteで接続済み。<br>・移行計画: WMSはコンテナ化し、Azure Kubernetes Service (AKS)上で稼働させる。データベースはAzure SQL Managed Instanceへ移行する。<br>・可用性要件により、東日本(Japan East)をプライマリリージョン、西日本(Japan West)をDRリージョンとして、2つのAzureリージョンを使用する。<br>・各リージョンに、次のハブスポーク型ネットワークトポロジを構築する。<br>　- ハブVNet 1つ(サブネット3つ: AzureFirewallSubnet、GatewaySubnet、AzureBastionSubnet)<br>　- アプリケーション層用スポークVNet 1つ(サブネット3つ: AKSシステムノードプール用、AKSユーザーノードプール用、Application Gateway用)<br>　- データ層用スポークVNet 1つ(サブネット2つ: プライベートエンドポイント用、管理用踏み台VM用)<br>・各スポークVNetは、それぞれ自リージョンのハブVNetとのみピアリングされる。スポークVNet同士は直接ピアリングされない(ハブアンドスポーク型)。<br>・セキュリティ要件: AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要がある。<br>・コスト要件: 平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動フェイルオーバーする。平常時の追加コストは最小限に抑える。"
  },
  scenario: "WMSアプリケーションチームは、CPU使用率の上昇に応じてPodの数を自動的にスケールアウトし、負荷が下がれば自動的にスケールインしたいと考えています。",
  question: "AKS上でこの要件を満たすには何を構成すればよいですか?",
  choices: [
    "Cluster Autoscaler",
    "Vertical Pod Autoscaler",
    "Horizontal Pod Autoscaler",
    "Virtual Nodes"
  ],
  answer: 2,
  explanation: "<div class='exp-diagram'>AKSの基本用語を整理します。<br>・Node: AKSクラスターを構成する仮想マシン。<br>・Pod: アプリケーションのコンテナを実行する最小単位で、Node上にスケジュールされます。1つのNodeには複数のPodが配置されます。<br>・オートスケールには『Podの数を増減させる』ものと『Nodeの数を増減させる』ものがあり、混同しやすいので区別が必要です。</div>選択肢の比較:<br>・Horizontal Pod Autoscaler (HPA): CPU使用率やメモリ使用率などのメトリクスに基づいて、既存のNode上で稼働するPodの『レプリカ数(個数)』を自動的に増減させる機能です。本設問の要件(CPU使用率に応じてPod数を増減)に合致します。<br>・Vertical Pod Autoscaler (VPA): Podの数ではなく、個々のPodに割り当てるCPU/メモリの要求値(リクエスト・リミット)を自動調整する機能です。Pod数は変化しません。<br>・Cluster Autoscaler: HPAなどによりPod数が増え、既存のNodeでは全てのPodをスケジュールしきれなくなった(Pendingになった)場合に、Node自体の数を自動的に増減させる機能です。Pod単位ではなくNode単位のスケーリングです。<br>・Virtual Nodes: ACI(Azure Container Instances)を使い、通常のNodeを追加することなくバースト的にPodを起動できる仮想的なNode機能で、迅速なスケールアウトの手段の1つですが、CPU使用率に基づく自動スケールの仕組みそのものではありません。<br>実運用では、HPAでPod数を増やした結果Nodeの空き容量が不足する場合に備え、HPAとCluster Autoscalerを併用することが一般的です。"
},
{
  domain: "インフラ",
  caseStudy: {
    title: "ケーススタディ: Contoso Logistics",
    body: "Contoso Logisticsは、全国に倉庫を展開する物流会社です。オンプレミスのデータセンターで稼働する倉庫管理アプリケーション(WMS)をAzureに移行します。<br>・現在の環境: オンプレミスのVMware環境で.NET Framework製のWMSと、SQL Serverデータベースが稼働している。オンプレミスDCとAzure間はExpressRouteで接続済み。<br>・移行計画: WMSはコンテナ化し、Azure Kubernetes Service (AKS)上で稼働させる。データベースはAzure SQL Managed Instanceへ移行する。<br>・可用性要件により、東日本(Japan East)をプライマリリージョン、西日本(Japan West)をDRリージョンとして、2つのAzureリージョンを使用する。<br>・各リージョンに、次のハブスポーク型ネットワークトポロジを構築する。<br>　- ハブVNet 1つ(サブネット3つ: AzureFirewallSubnet、GatewaySubnet、AzureBastionSubnet)<br>　- アプリケーション層用スポークVNet 1つ(サブネット3つ: AKSシステムノードプール用、AKSユーザーノードプール用、Application Gateway用)<br>　- データ層用スポークVNet 1つ(サブネット2つ: プライベートエンドポイント用、管理用踏み台VM用)<br>・各スポークVNetは、それぞれ自リージョンのハブVNetとのみピアリングされる。スポークVNet同士は直接ピアリングされない(ハブアンドスポーク型)。<br>・セキュリティ要件: AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要がある。<br>・コスト要件: 平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動フェイルオーバーする。平常時の追加コストは最小限に抑える。"
  },
  scenario: "アプリケーション層用スポークVNet内のApplication Gateway用サブネットを使用して、AKS上のWMSへのインバウンドHTTPS通信をWAFで保護しつつルーティングします。",
  question: "このサブネットにデプロイするリソースとして何を推奨しますか?",
  choices: [
    "Load Balancer (Standard)",
    "Azure Firewall",
    "Application Gateway (WAF_v2)",
    "Azure Bastion"
  ],
  answer: 2,
  explanation: "Application GatewayのWAF_v2 SKUは、Webアプリケーションファイアウォール(WAF)機能を備えたレイヤー7のロードバランサーで、専用のサブネット(他のリソースと共有不可)にデプロイします。AKS Ingress Controller(AGICなど)と組み合わせることで、Podへのインバウンド通信をパスベースでルーティングしつつ、SQLインジェクションやクロスサイトスクリプティングなどの攻撃をWAFで防御できます。<br>誤答の理由: 「Load Balancer (Standard)」はレイヤー4の負荷分散のみでWAF機能を持ちません。「Azure Bastion」はVMへのセキュアな踏み台接続用のサービスで、案件内では管理用サブネット(データ層スポーク)向けの用途であり、インバウンドWebトラフィックの保護とは無関係です。「Azure Firewall」はハブVNetのAzureFirewallSubnetに配置するネットワーク/アプリケーションレベルのファイアウォールで、主に送信(アウトバウンド)およびリージョン間のトラフィック制御に使われ、WAFのようなHTTPレイヤーの攻撃防御やAKS Ingressルーティングの主用途ではありません。"
},
{
  domain: "事業継続性",
  caseStudy: {
    title: "ケーススタディ: Contoso Logistics",
    body: "Contoso Logisticsは、全国に倉庫を展開する物流会社です。オンプレミスのデータセンターで稼働する倉庫管理アプリケーション(WMS)をAzureに移行します。<br>・現在の環境: オンプレミスのVMware環境で.NET Framework製のWMSと、SQL Serverデータベースが稼働している。オンプレミスDCとAzure間はExpressRouteで接続済み。<br>・移行計画: WMSはコンテナ化し、Azure Kubernetes Service (AKS)上で稼働させる。データベースはAzure SQL Managed Instanceへ移行する。<br>・可用性要件により、東日本(Japan East)をプライマリリージョン、西日本(Japan West)をDRリージョンとして、2つのAzureリージョンを使用する。<br>・各リージョンに、次のハブスポーク型ネットワークトポロジを構築する。<br>　- ハブVNet 1つ(サブネット3つ: AzureFirewallSubnet、GatewaySubnet、AzureBastionSubnet)<br>　- アプリケーション層用スポークVNet 1つ(サブネット3つ: AKSシステムノードプール用、AKSユーザーノードプール用、Application Gateway用)<br>　- データ層用スポークVNet 1つ(サブネット2つ: プライベートエンドポイント用、管理用踏み台VM用)<br>・各スポークVNetは、それぞれ自リージョンのハブVNetとのみピアリングされる。スポークVNet同士は直接ピアリングされない(ハブアンドスポーク型)。<br>・セキュリティ要件: AKS上のPodは、VNetピアリング経由でデータ層スポークVNet内のプライベートエンドポイントに、Pod自身のIPアドレスを使って直接到達できる必要がある。<br>・コスト要件: 平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動フェイルオーバーする。平常時の追加コストは最小限に抑える。"
  },
  scenario: "平常時は東日本のみへユーザートラフィックをルーティングし、東日本リージョン全体で障害が発生した場合にのみ西日本へ自動的にフェイルオーバーさせます。両リージョンには、既にWAF機能を持つApplication Gatewayがそれぞれデプロイ済みで、追加のレイヤー7処理コストは最小限にしたいと考えています。",
  question: "エンドユーザー向けのグローバルなトラフィックルーティングには何を推奨しますか?",
  choices: [
    "Azure ExpressRoute",
    "Azure Front Door",
    "Azure Traffic Manager",
    "Azure Load Balancer"
  ],
  answer: 2,
  explanation: "Azure Traffic Managerは、DNSレベルでトラフィックをルーティングするグローバルサービスです。「優先度(Priority)」ルーティング方法を使うと、通常は東日本のApplication Gatewayのエンドポイントのみを応答し、エンドポイントの正常性監視によって東日本が利用不可と判定された場合にのみ西日本のエンドポイントを返すように構成できます。DNS応答を返すだけでユーザーの実データ(HTTPS通信そのもの)は経由しないため、Front Doorのようなレイヤー7プロキシと比べて処理コストが低く、既に各リージョンにWAF機能付きのApplication Gatewayが存在し追加コストを最小限にしたい本ケースの要件に適しています。<br>誤答の理由: 「Azure Front Door」もグローバルなHTTP(S)ルーティングとWAFを提供しますが、レイヤー7でユーザーの全トラフィックを経由して処理するプロキシ型のサービスであり、既にリージョンごとにApplication Gatewayを持つ構成に対して追加コストが発生しやすく、本ケースの『追加コストを最小限に抑える』要件には適合しません。「Azure Load Balancer」はリージョン内(またはリージョン間の一部構成)のレイヤー4負荷分散用で、DNSベースのグローバルなリージョン間フェイルオーバーには使用しません。「Azure ExpressRoute」はオンプレミスとAzure間の専用線接続サービスであり、エンドユーザー向けのグローバルルーティングとは無関係です。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターがあります。<br>クラスターを構成する、Podが実際にスケジュールされ稼働する計算リソースの単位を確認する必要があります。",
  question: "Podが実行される計算リソースの単位はどれですか?",
  choices: [
    "Node",
    "Pod",
    "Namespace",
    "ReplicaSet"
  ],
  answer: 0,
  explanation: "Nodeは、Podが実際にスケジュールされ稼働する計算リソース(VM)です。AKSではNodeはAgent Pool(ノードプール)内の仮想マシンとしてAzureが管理し、1つのNodeに複数のPodが配置されます。Node上ではkubelet(Podを管理するエージェント)やcontainer runtimeが動作します。<br>・Podはコンテナーの実行単位で、Node上に配置される側です。<br>・NamespaceはNode上のリソースを分割する論理的な仕切りにすぎません。<br>・ReplicaSetは指定した数のPodのレプリカを維持するコントローラーで、計算リソースそのものではありません。"
},
{
  domain: "インフラ",
  scenario: "AKS上でステートレスWebアプリケーションを稼働させています。<br>Podのレプリカ数を宣言的に管理し、ローリングアップデートにも対応できるリソースを使用する必要があります。",
  question: "この要件を満たすKubernetesリソースはどれですか?",
  choices: [
    "Service",
    "Pod",
    "Namespace",
    "Deployment"
  ],
  answer: 3,
  explanation: "Deploymentは、Podのレプリカ数、更新戦略(ローリングアップデートなど)、ロールバックを宣言的に管理する上位リソースです。内部的にReplicaSetを作成・管理し、ReplicaSetが指定数のPodを維持します。<br>・Podを直接作成すると、障害時に自動再作成されず、更新戦略も持てません。<br>・Serviceは複数のPodへの安定したアクセス経路(ネットワーク)を提供するリソースで、レプリカ数の管理は行いません。<br>・Namespaceはリソースの論理分割にすぎません。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターでDeploymentを1つ作成しました。<br>Deploymentが内部的に、指定したレプリカ数のPodを維持するために作成・利用するリソースを確認する必要があります。",
  question: "Deploymentが指定レプリカ数のPodを維持するために内部的に作成するリソースはどれですか?",
  choices: [
    "Ingress",
    "ReplicaSet",
    "PersistentVolume",
    "Namespace"
  ],
  answer: 1,
  explanation: "ReplicaSetは、指定した数のPodレプリカが常に稼働しているように維持するコントローラーです。Deploymentを作成すると、DeploymentはReplicaSetを自動生成し、実際のPod数の監視・調整(異常終了したPodの再作成など)はReplicaSetが担当します。ローリングアップデート時はDeploymentが新しいReplicaSetを作成し、古いReplicaSetのPod数を徐々に減らします。<br>・Namespaceは論理的な仕切りです。<br>・IngressはHTTP(S)ルーティングを行うリソースです。<br>・PersistentVolumeはストレージを表すリソースで、Pod数の維持とは無関係です。"
},
{
  domain: "インフラ",
  scenario: "AKS(Azure Kubernetes Service)クラスターを初めて構築しています。<br>Kubernetesの基本オブジェクトの定義を確認する必要があります。",
  question: "1つ以上のコンテナーを含み、Kubernetesでデプロイできる最小の実行単位はどれですか?",
  choices: [
    "Pod",
    "Namespace",
    "Deployment",
    "Node"
  ],
  answer: 0,
  explanation: "Podは、Kubernetesでデプロイ・管理できる最小の実行単位です。1つ以上のコンテナーが同居し、同じIPアドレスとストレージボリュームを共有します。通常は1Podに1アプリケーションコンテナーですが、ログ収集用サイドカーなどを追加すると複数コンテナー構成になります。<br>・Nodeは、Podが実際に稼働する物理/仮想マシン(AKSではAgent PoolのVM)です。1つのNodeには複数のPodが配置されます。<br>・Deploymentは、Podのレプリカ数や更新方法を宣言的に管理する上位リソースで、コンテナーを直接含みません。<br>・Namespaceはクラスター内のリソースを論理的に分割する仕切りで、実行単位ではありません。"
},
{
  domain: "インフラ",
  scenario: "オンプレミスで稼働しているLinuxベースの単一コンテナー(モノリシック)Webアプリケーションを、Azureに移行します。<br>・アプリケーションコードの変更は最小限にしたい<br>・コンテナーオーケストレーション(Kubernetesなど)の運用管理は行いたくない<br>・PaaSとしてスケーリングやパッチ適用をAzureに任せたい",
  question: "この要件を満たす移行先はどれですか?",
  choices: [
    "Virtual Machines",
    "Azure Batch",
    "App Service(Linuxコンテナー)",
    "Azure Kubernetes Service"
  ],
  answer: 2,
  explanation: "App Service(Linuxコンテナー)は、単一のLinuxコンテナーイメージをそのままデプロイできるフルマネージドPaaSです。オーケストレーション(Kubernetesクラスターの構築・運用)は不要で、スケーリング、パッチ適用、証明書管理などをAzureが代行します。単一のモノリシックなWebアプリケーションを最小限の変更で移行する用途に適しています。<br>・Azure Kubernetes Serviceは複数マイクロサービスの高度なオーケストレーションが必要な場合に適していますが、本シナリオでは「Kubernetesの運用管理を行いたくない」という要件に反します(オーバースペックかつ運用負荷が大きい)。<br>・Virtual MachinesはIaaSであり、OSパッチやスケーリングの管理を自分たちで行う必要があり、「管理を任せたい」という要件に反します。<br>・Azure Batchは大規模並列バッチ処理用のサービスであり、Webアプリケーションのホスティング用途には適しません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Azure Data Factoryのパイプラインで、インターネットに公開されていないオンプレミスのSQL Serverからデータをコピーする必要があります。",
  question: "この要件を満たすためにADFで構成する必要があるものはどれですか?(2つ選択)",
  choices: [
    "Azure統合ランタイム(Azure IR)のみを使用する",
    "対象データをあらかじめパブリックのBlob Storageにアップロードしておく",
    "セルフホステッド統合ランタイム(Self-hosted Integration Runtime)をオンプレミスサーバーにインストールする",
    "オンプレミスSQL Server用のLinked Serviceを作成し、セルフホステッドIRを参照させる",
    "Data Flowのデバッグセッションを常時起動しておく"
  ],
  answer: [2,3],
  explanation: "インターネットに公開されていないオンプレミスのデータストアにADFから接続するには、セルフホステッド統合ランタイム(Self-hosted IR)をオンプレミスネットワーク内のサーバーにインストールする必要があります。Self-hosted IRはオンプレミス側から出方向にAzureへ接続するため、オンプレミス側でインバウンドのファイアウォール開放を行う必要がありません。<br>その上で、オンプレミスSQL Server用のLinked Service(接続情報)を作成する際に、接続に使用する統合ランタイムとして、作成したSelf-hosted IRを指定する必要があります。<br>・Azure統合ランタイム(Azure IR)は、Azure上のクラウドデータストア間のコピーやデータフロー処理に使用するマネージドランタイムであり、単体ではプライベートなオンプレミスネットワーク内のSQL Serverには到達できません。<br>・Data Flowのデバッグセッションは開発時のデバッグ用機能であり、オンプレミス接続の前提条件ではありません。<br>・データを事前にパブリックのBlob Storageへアップロードする方法は、セキュリティ要件(インターネット非公開)に反するため不適切です。"
},
{
  domain: "インフラ",
  scenario: "複数のApp ServiceアプリケーションとAzure Functionsが、同じ設定値(接続文字列を除く一般設定やフィーチャーフラグ)を共有して使用しています。<br>・設定値をAzure上の単一の場所で一元管理したい<br>・設定変更時にアプリケーションを再デプロイせずに、動的に変更を反映したい<br>・機能のON/OFFを段階的に切り替えるフィーチャーフラグ機能も使いたい",
  question: "この要件を満たすために使用するサービスはどれですか?",
  choices: [
    "Azure Key Vault",
    "Azure Resource Manager テンプレート",
    "Azure App Configuration",
    "Azure Automation State Configuration"
  ],
  answer: 2,
  explanation: "Azure App Configurationは、複数のアプリケーションで共有する設定値やフィーチャーフラグを一元管理するためのマネージドサービスです。アプリケーションはApp Configurationから設定値を動的に取得でき、設定変更時に多くの場合アプリケーションの再デプロイや再起動が不要です。フィーチャーフラグ機能も標準でサポートしています。<br>・Azure Key Vaultは主にシークレット・証明書・暗号キーなど機密情報の管理に特化したサービスであり、一般設定値の一元管理やフィーチャーフラグ機能は主目的ではありません(App Configurationと連携して使われることが多い)。<br>・Azure Automation State Configurationは、VMの構成状態(DSC)を管理する機能であり、アプリケーション設定値の管理用途ではありません。<br>・Azure Resource Manager テンプレートはインフラのデプロイを宣言的に定義する仕組みであり、実行時の動的な設定変更には向きません。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターのAPIサーバーへのアクセス制御を検討しています。<br>・API serverのパブリックFQDN(エンドポイント)は維持したままにしたい(プライベートクラスター化はしない)<br>・特定のオフィスのパブリックIPアドレス範囲からのみkubectl操作を許可したい",
  question: "この要件を満たすために構成する機能はどれですか?",
  choices: [
    "プライベートAKSクラスター",
    "API serverの承認済みIPアドレス範囲(Authorized IP ranges)",
    "Azure Firewall",
    "Network Security Group(NGのNodeサブネットへの適用のみ)"
  ],
  answer: 1,
  explanation: "API serverの承認済みIPアドレス範囲(Authorized IP ranges)を構成すると、API serverはパブリックFQDN/パブリックIPアドレスを維持したまま、指定したIPアドレス範囲からのみAPI serverへのアクセスを許可し、それ以外からのアクセスを拒否します。プライベートクラスター化(API serverのパブリックIP自体を無くす)とは異なり、既存のパブリックエンドポイントの構成を維持しつつアクセス元を制限したい場合に適しています。<br>・プライベートAKSクラスターは、API serverのパブリックIPアドレス自体を無くす構成であり、「パブリックFQDNを維持したい」という要件に反します。<br>・NSGはAKSが管理するAPI serverには直接適用できません(API serverはAzure管理のリソースであるため)。<br>・Azure Firewallは送信(アウトバウンド)トラフィックの制御などに使われることはありますが、API serverへのインバウンドアクセス制限の第一選択ではありません。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "既存のハブスポーク型ネットワーク(VNetピアリング)のハブVNetに、サードパーティ製NVAとAzure Route Serverを導入し、スポークVNetがNVAの広告するルートを動的に学習できるようにします。",
  question: "次の操作を、実施する順序に並べ替えてください。",
  choices: [
    "ハブVNetにAzure Route Serverをデプロイする",
    "スポークVNet側のピアリング設定で「リモート仮想ネットワークのゲートウェイまたはRoute Serverを使用する」を有効にする(ハブ側では「ゲートウェイ転送を許可する」を有効にする)",
    "NVAとAzure Route Server間でBGPピアリングを構成する",
    "ピアリング済みのスポークVNetが、NVA経由のルートを動的に学習し利用する"
  ],
  answer: [0,2,1,3],
  explanation: "まずハブVNet内にAzure Route Serverをデプロイします(1)。次に、既存のNVAとAzure Route Serverの間でBGPピアリングを構成し、NVAが広告するルート情報をRoute Serverが受信できるようにします(2)。続けて、スポークVNet側のピアリング設定で「リモート仮想ネットワークのゲートウェイまたはRoute Serverを使用する」を有効にし、ハブ側では「ゲートウェイ転送を許可する」を有効にします(3)。これにより、Route Serverが学習したルートがピアリング経由でスポークVNetにも伝播するようになります。最終的に、ピアリング済みのスポークVNetは、UDRを個別に手動構成することなく、NVA経由の動的なルート情報を自動的に学習し、それに基づいて通信できるようになります(4)。<br><br>なお、Route Serverの「分岐間接続(Branch-to-branch)」設定は、NVAとExpressRoute/VPN仮想ネットワークゲートウェイとの間でルートを交換するための設定であり、VNetピアリングされたスポークへのルート伝播とは別の仕組みです。今回のようにピアリングされたスポークにルートを伝播させたい場合は、branch-to-branchではなく、スポーク側ピアリング設定での「リモートゲートウェイ/Route Serverの使用」が必要です。"
},
{
  domain: "インフラ",
  scenario: "Application Gateway v2 SKUを可用性ゾーンにまたがる構成でデプロイし、自動スケーリングを有効化します。<br>可用性を確保するための、Microsoftが推奨する最小インスタンス数を確認する必要があります。",
  question: "高可用性を確保するために推奨される最小インスタンス数はいくつですか?",
  choices: [
    "2",
    "5",
    "1",
    "0"
  ],
  answer: 0,
  explanation: "Application Gateway v2 SKUで自動スケーリングを構成する際、Microsoftは高可用性を確保するために最小インスタンス数を2以上に設定することを推奨しています。インスタンスが1つしか無い状態では、そのインスタンスが配置されているゾーンやハードウェアに障害が発生した際にApplication Gateway全体が利用できなくなる可能性があるためです。最小インスタンス数を2以上にすることで、常に複数インスタンスが異なる可用性ゾーンで稼働し、単一障害点を排除できます。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターでVirtual Nodes(ACI連携)の利用を検討しています。<br>Virtual Nodesの前提条件と制約を確認する必要があります。",
  question: "Virtual Nodesを使用する際の制約として正しいものはどれですか?",
  choices: [
    "Basic Load Balancerが必須である",
    "ネットワークプラグインとしてAzure CNIが必要である",
    "Windowsコンテナーのみサポートされる",
    "kubenetでのみ動作する",
    "Podのレプリカ数は手動でのみ変更できる"
  ],
  answer: 1,
  explanation: "Virtual NodesはACI上にPodを配置するために、Podに対してVNet内で直接ルーティング可能なIPアドレスを割り当てる必要があり、そのためネットワークプラグインとしてAzure CNI(kubenetではない)が前提条件になります。<br>・Windowsコンテナーではなく、Linuxコンテナー(Podの一部で)のみをサポートします(執筆時点でWindowsコンテナーはVirtual Nodes非対応)。<br>・Basic Load Balancerは必須要件ではありません。<br>・kubenetでは動作しません(Azure CNIが必須)。<br>・Podのレプリカ数は通常通りDeploymentやHPAで自動/手動どちらでも変更可能で、Virtual Nodes特有の制約ではありません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "AKSクラスターで、特定のPodを特定のNodeグループにのみ配置(専用化)する構成を検討しています。<br>Kubernetesでこの目的のために組み合わせて使用できる仕組みを確認する必要があります。",
  question: "Podのスケジュール先Nodeを制御するために使用できる仕組みはどれですか?(2つ選択)",
  choices: [
    "Horizontal Pod Autoscaler",
    "Taints と Tolerations",
    "Node Selector / Node Affinity",
    "ResourceQuota",
    "PersistentVolumeClaim"
  ],
  answer: [1,2],
  explanation: "Podのスケジュール先Nodeを制御する代表的な仕組みは2つあります。<br>・Taints と Tolerations は、Node側にTaint(拒否条件)を設定し、それを許容するTolerationを持つPodだけがスケジュールされるようにする「排他」の仕組みです。<br>・Node Selector / Node Affinity は、Pod側にラベル条件を指定し、指定したラベルを持つNodeにのみPodがスケジュールされるようにする「選択」の仕組みです。両者は排他的ではなく、組み合わせて使うことでより厳密なノード専用化(例: GPUノードにGPU用Podのみを配置)を実現できます。<br>・ResourceQuotaはNamespace単位のリソース使用量上限を制御するもので、スケジュール先Nodeの制御ではありません。<br>・Horizontal Pod Autoscalerはレプリカ数の増減を行うもので、スケジュール先の制御ではありません。<br>・PersistentVolumeClaimはストレージの要求を表すリソースで、Nodeの選択とは無関係です。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "AKSクラスターと、その上で稼働するアプリケーションの両方について監視を行う必要があります。<br>・クラスターのNode/Podレベルのリソース使用状況やログを収集したい<br>・アプリケーションコード内で発生する例外や、依存関係(外部API呼び出しなど)の応答時間も可視化したい",
  question: "この2つの要件を満たすためにそれぞれ有効化する機能はどれですか?(2つ選択)",
  choices: [
    "Azure Advisor",
    "Network Watcher",
    "Azure Service Health",
    "Application Insights",
    "Container insights"
  ],
  answer: [3,4],
  explanation: "Container insightsは、AKSクラスターのNode・Pod・コンテナー単位のCPU/メモリ使用状況、稼働状況、コンテナーログなど、クラスターおよびインフラレベルの監視データをAzure Monitorに収集する機能です。<br>Application Insightsは、アプリケーションコード内に組み込む(またはコードレス計装する)APM(アプリケーションパフォーマンス管理)機能で、例外、リクエストの応答時間、依存関係(外部API/DB呼び出し)の遅延、分散トレーシングなど、アプリケーションレベルの詳細な可視化を提供します。<br>両者はレイヤーが異なり(インフラ層 vs アプリケーション層)、どちらか一方だけでは不十分なため、両方を有効化することが推奨されます。<br>・Azure Advisorは構成改善の推奨事項を提示する機能です。<br>・Azure Service HealthはAzureプラットフォーム自体の障害情報です。<br>・Network Watcherはネットワークの診断・監視ツールであり、アプリケーションやコンテナーレベルの監視機能ではありません。"
},
{
  domain: "インフラ",
  scenario: "AKS上のDeploymentにHorizontal Pod Autoscaler(HPA)を構成しました。<br>負荷が増加してHPAがしきい値を超えたと判断した場合に、HPAが実際に変更する対象を確認する必要があります。",
  question: "HPAが負荷増加時に自動的に変更するものはどれですか?",
  choices: [
    "Podに割り当てるCPU/メモリの上限値",
    "AKSクラスターのNode数",
    "対象Deploymentのレプリカ(Pod)数",
    "Node(VM)のサイズ"
  ],
  answer: 2,
  explanation: "HPAは、対象のDeployment(またはReplicaSet/StatefulSet)のレプリカ数、つまり稼働させるPodの「個数」を増減させます。既存の各Podのサイズ(CPU/メモリ割り当て)は変更せず、同じ仕様のPodを追加・削除することで全体の処理能力を調整します。<br>・Node(VM)のサイズ変更はHPAの機能ではありません(そもそも稼働中のVMサイズはオンラインで変更できません)。<br>・Podに割り当てるCPU/メモリ上限値を自動調整するのはVertical Pod Autoscaler(VPA)の役割です。<br>・AKSクラスターのNode数を増減させるのはCluster Autoscalerの役割であり、HPAはPodをスケジュールする空き容量が無くなった場合にCluster Autoscalerが動作するきっかけを作ることはあっても、Node数を直接変更する機能は持ちません。"
},
{
  domain: "インフラ",
  scenario: "AKS上で稼働するWebアプリケーションのDeploymentがあります。<br>CPU使用率が高くなった際に、自動的にPodのレプリカ数を増やし、負荷が下がったら減らす仕組みを構成する必要があります。",
  question: "この要件を満たすKubernetesリソースはどれですか?",
  choices: [
    "Horizontal Pod Autoscaler(HPA)",
    "Cluster Autoscaler",
    "Virtual Nodes",
    "Vertical Pod Autoscaler(VPA)"
  ],
  answer: 0,
  explanation: "Horizontal Pod Autoscaler(HPA)は、CPU使用率やメモリ使用率(または任意のカスタムメトリクス)を継続的に監視し、しきい値を超えると対象Deployment(またはReplicaSet)のPodレプリカ数を自動的に増減させるKubernetesリソースです。「Horizontal(水平)」とは、1つのPodを大きくする(垂直)のではなく、同じ大きさのPodの「数」を横に増減させることを意味します。<br>・Cluster Autoscalerは、Podをスケジュールする空き容量が不足したときにNode(VM)の数を増減させるもので、Podのレプリカ数ではなくNode数を調整します。<br>・Vertical Pod Autoscaler(VPA)は、Pod1つあたりのCPU/メモリ割り当て量そのものを自動調整するもので、レプリカ数の増減ではありません。<br>・Virtual NodesはACI上にPodをバーストさせる仕組みで、それ自体は自動スケーリングの判断ロジックを持ちません。"
},
{
  domain: "インフラ",
  scenario: "オンプレミスで稼働している、複数のコンテナー化されたマイクロサービス群をAzureに移行します。<br>・各マイクロサービスはメッセージキューの受信をトリガーにイベント駆動でスケールする<br>・トラフィックが無い時間帯はコストを抑えるためレプリカ数を0にしたい<br>・Kubernetesクラスターそのものの運用管理(ノードのパッチ適用など)は行いたくない",
  question: "この要件を満たす移行先はどれですか?",
  choices: [
    "App Service(単一Linuxコンテナー)",
    "Virtual Machine Scale Sets",
    "Azure Kubernetes Service",
    "Azure Container Apps"
  ],
  answer: 3,
  explanation: "Azure Container Appsは、KEDAをベースにしたイベント駆動のオートスケーリング(メッセージキューやHTTPトラフィックなどに基づくスケール・ツー・ゼロを含む)をサーバーレスに提供するマネージドサービスです。基盤となるKubernetesクラスターやNodeの運用管理(パッチ適用、アップグレードなど)はAzureが行うため、利用者はコンテナーイメージとスケーリングルールを指定するだけで済みます。<br>・Azure Kubernetes ServiceでもKEDAを使えば同様のイベント駆動スケーリングは可能ですが、Node(VM)のパッチ適用やアップグレードなどクラスター自体の運用管理は利用者側の責任になり、「運用管理を行いたくない」という要件に反します。<br>・App Service(単一Linuxコンテナー)は1コンテナー構成が前提であり、複数マイクロサービスをそれぞれ独立してイベント駆動スケールさせる用途には適しません。<br>・Virtual Machine Scale Setsはインフラ層(IaaS)のスケーリングであり、コンテナー単位のイベント駆動スケーリングやスケール・ツー・ゼロは標準機能として提供されません。"
},
{
  domain: "インフラ",
  scenario: "AKS上のアプリケーションに、CPU使用率に基づくスケーリングと、Azure Storageキューの長さに基づくスケーリングの両方を導入したいと考えています。<br>Kubernetesにおいて、これらはいずれもPodの「数」を増減させる、同じ分類のスケーリングであることを確認する必要があります。",
  question: "これらのスケーリング方式に共通する分類はどれですか?",
  choices: [
    "垂直(Vertical)スケーリング",
    "水平(Horizontal)スケーリング",
    "クラスタースケーリング",
    "ストレージスケーリング"
  ],
  answer: 1,
  explanation: "水平(Horizontal)スケーリングとは、1つのPodのサイズ(CPU/メモリの割り当て量)は変えずに、同じ仕様のPodの「数」を増減させることで全体の処理能力を調整する方式です。標準のHPA(CPU/メモリメトリクスに基づく)も、KEDA(Service Busキュー長などの外部メトリクスに基づく)も、いずれも対象のレプリカ数を増減させる点で共通しており、どちらも水平スケーリングに分類されます。「Horizontal(水平)」という名称は、Podを横に並べて増減させるイメージに由来します。<br>・垂直(Vertical)スケーリングは、Pod1つあたりのCPU/メモリ割り当て量そのものを増減させる方式(VPAが該当)で、レプリカ数は変化しません。<br>・クラスタースケーリングという標準用語はKubernetesには無く、Node数の増減はCluster Autoscalerと呼ばれます。<br>・ストレージスケーリングという分類も標準用語ではありません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Private EndpointとService Endpointの違いを整理しています。",
  question: "Private EndpointとService Endpointに関する正しい記述はどれですか?(2つ選択)",
  choices: [
    "Private EndpointとService Endpointは、同一のPaaSリソースに対して同時に構成できない",
    "Service Endpointは、オンプレミスのネットワークから直接使用できる",
    "Private Endpointは、対象PaaSリソースに対してVNet内のプライベートIPアドレスを割り当てる",
    "Private Endpointはオンプレミスのネットワークからは到達できない",
    "Service Endpointは、対象PaaSリソースへのトラフィックをAzureバックボーン経由に維持しつつ、そのPaaSリソース自体にはプライベートIPアドレスを割り当てない"
  ],
  answer: [2,4],
  explanation: "Private Endpointは、対象のPaaSリソース(Storageアカウントなど)専用のネットワークインターフェイスをVNet内に作成し、そのPaaSリソースにVNet内のプライベートIPアドレスを割り当てます。これによりVNet内からはプライベートIPアドレスで直接アクセスでき、パブリックインターネットからのアクセスを遮断できます。<br>Service Endpointは、サブネットを対象のPaaSサービスに「拡張」する仕組みで、トラフィックはAzureのバックボーンネットワークを経由しますが、PaaSリソース自体にプライベートIPアドレスは割り当てられません(PaaSリソース側はパブリックエンドポイントのままです)。<br>・Private Endpointは、VPNやExpressRoute経由でVNetに接続されたオンプレミスネットワークからも到達可能です(VNet内のプライベートIPアドレスであるため)。この選択肢は誤りです。<br>・Service Endpointは、あくまで「VNet内のサブネットからのトラフィック」を識別する仕組みであり、オンプレミスのネットワークから直接使う(オンプレミスのIPアドレスをそのまま許可する)ことはできません。この選択肢は誤りです。<br>・両者は排他的ではなく、移行期などに併用されるケースもあります。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "AKS上のDeploymentに対して、CPU使用率に基づいて自動的にPodのレプリカ数を増減させるHorizontal Pod Autoscaler(HPA)を新規に構成します。",
  question: "次の操作を、実施する順序に並べ替えてください。",
  choices: [
    "対象DeploymentとCPU使用率のしきい値、最小/最大レプリカ数を指定してHPAリソースを作成する",
    "メトリクスサーバーが収集したCPU使用率に基づき、HPAが自動でレプリカ数を調整する",
    "各Podにcpu requests(要求値)を設定してDeploymentを作成する",
    "DeploymentをServiceとして公開する"
  ],
  answer: [2,3,0,1],
  explanation: "HPAはPodのCPU使用率を「requests(要求値)に対する割合」で判定するため、まずPodにCPU requestsを設定したDeploymentを作成する必要があります(1)。次にアプリケーションへの安定したアクセス経路としてServiceを作成します(2、必須ではないが典型的な構成順序)。続けて対象Deployment・しきい値・最小/最大レプリカ数を指定してHPAリソースを作成します(3)。AKSクラスターには標準でmetrics-serverが動作しており、各Podのリソース使用状況を定期的に収集しています。HPAはこのメトリクスサーバーの値を基に、しきい値を超えていればレプリカ数を増やし、下回っていれば減らします(4)。この一連の流れを理解することが、HPAの「何が」「何を監視して」「何を変更するか」を正しく把握するポイントです。"
},
{
  domain: "インフラ",
  scenario: "Azureサブスクリプションで、あるVMが削除されたことを検知し、担当者にすぐに通知したいと考えています。<br>・VMの削除操作(管理操作)が発生したタイミングで通知する必要がある<br>・CPU使用率などのメトリクスではなく、「削除」という操作イベントそのものを対象にする必要がある",
  question: "この要件を満たすために構成するアラートの種類はどれですか?",
  choices: [
    "アクティビティログ アラート(管理操作: 仮想マシンの削除)",
    "Service Healthアラート",
    "メトリックアラート(CPU使用率)",
    "Azure Advisorの推奨事項"
  ],
  answer: 0,
  explanation: "アクティビティログ アラートは、Azureサブスクリプション上で発生した管理操作(リソースの作成・更新・削除など)をイベントとして検知し、条件に一致した際に通知するアラートです。「Microsoft.Compute/virtualMachines/delete」のような操作(カテゴリ: Administrative)を条件に指定することで、特定のVMが削除された(削除操作が成功した)タイミングで通知を受け取れます。<br>・メトリックアラートはCPU使用率やディスクIOPSなど、数値化されたパフォーマンス指標のしきい値超過を検知する仕組みであり、「削除」という操作イベントの検知には使用しません。<br>・Azure Advisorはコスト・信頼性・パフォーマンスなどの改善提案を行う機能であり、リアルタイムの操作イベント通知の仕組みではありません。<br>・Service Healthアラートは、Azureプラットフォーム自体の障害やメンテナンス情報を通知するものであり、個別リソースの削除操作の検知には使用しません。"
},
{
  domain: "インフラ",
  scenario: "既存のAKSクラスターにWindows Serverコンテナーを実行するノードプールを追加する予定です。<br>使用可能なネットワークプラグインを確認する必要があります。",
  question: "Windowsノードプールを追加する際に使用できるネットワークプラグインはどれですか?",
  choices: [
    "Azure CNI",
    "kubenet",
    "クラシック仮想ネットワーク",
    "NAT Gateway"
  ],
  answer: 0,
  explanation: "AKSのWindowsノードプールは、Azure CNI(従来またはOverlay)のみをサポートします。kubenetはWindowsノードプールをサポートしていません。クラスターを作成する際、Windowsノードプールを使う予定があるならkubenetは選択できません。<br>・kubenetは前述の通りWindows非対応です。<br>・「クラシック仮想ネットワーク」はAzureの旧世代のネットワークモデルで、AKSのネットワークプラグインの選択肢ではありません。<br>・NAT Gatewayは送信接続用のリソースであり、Podへのネットワークプラグインではありません。"
},
{
  domain: "インフラ",
  scenario: "AKS上のアプリケーションは、Azure Service BusキューにあるメッセージをPodが処理します。<br>・キューに溜まっているメッセージ数に応じてPodのレプリカ数を自動的に増減させる必要がある<br>・負荷が無い時間帯はレプリカ数を0にしてコストを抑えたい<br>・HPAが標準でサポートするCPU/メモリ以外のメトリクス(Service Busキュー長)で判断させたい",
  question: "この要件を満たすためにAKSに追加で導入するコンポーネントはどれですか?",
  choices: [
    "Vertical Pod Autoscaler(VPA)",
    "Cluster Autoscaler",
    "KEDA(Kubernetes Event-driven Autoscaling)",
    "Virtual Nodes"
  ],
  answer: 2,
  explanation: "KEDA(Kubernetes Event-driven Autoscaling)は、Service Busキューの長さ、Storageキュー、Event Hubsなど、CPU/メモリ以外の多様な外部メトリクス(イベントソース)に基づいてPodのレプリカ数を自動調整できる、Kubernetesネイティブの拡張コンポーネントです。AKSではアドオンとして有効化できます。KEDAは内部的にScaledObjectというカスタムリソースでHPAを制御し、標準のHPAでは扱えない外部メトリクスに基づくスケーリングや、レプリカ数を0まで減らす「スケール・ツー・ゼロ」を実現します。<br>・Cluster AutoscalerはNode(VM)数を調整する機能で、Podのレプリカ数やキューの長さとは関係ありません。<br>・VPAはPod1つあたりのリソース割り当てを調整するもので、レプリカ数の増減ではありません。<br>・Virtual NodesはACI連携によるバースト実行環境であり、キュー長に基づく自動スケーリングの仕組み自体は提供しません。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターのセキュリティを強化しています。<br>・KubernetesのAPIサーバーに、パブリックインターネットから一切到達できないようにする必要がある<br>・API serverへのアクセスはVNet内(ExpressRouteやVPN経由のオンプレミスを含む)からのみに限定する必要がある",
  question: "この要件を満たすために構成するAKSクラスターの種類はどれですか?",
  choices: [
    "パブリックAKSクラスター + API serverの承認済みIPアドレス範囲",
    "kubenetを使用するAKSクラスター",
    "プライベートAKSクラスター",
    "Virtual Nodesを有効化したAKSクラスター"
  ],
  answer: 2,
  explanation: "プライベートAKSクラスターを構成すると、KubernetesのAPIサーバーにパブリックIPアドレスが割り当てられず、AKSが管理するVNet内にプライベートエンドポイントが作成されます。API serverへの通信はVNet内(ピアリングやExpressRoute/VPN経由のオンプレミスを含む)からのみ到達可能になり、パブリックインターネットからは完全に遮断されます。<br>・「パブリックAKSクラスター + 承認済みIPアドレス範囲」は、API serverにパブリックIPアドレスは残したまま、許可したIPアドレスからのみアクセスを許可する構成です。パブリックIPアドレス自体は存在するため、「一切到達できない」という要件には合致しません。<br>・Virtual NodesはACI連携によるバースト機能で、API serverの公開範囲とは無関係です。<br>・kubenetはネットワークプラグインの選択であり、API serverの公開設定とは無関係です。"
},
{
  domain: "インフラ",
  scenario: "オンプレミスのActive DirectoryとMicrosoft Entra IDが、Microsoft Entra Connectで同期されています。<br>・新入社員のオンプレミスADアカウントが特定のセキュリティグループに追加されると、対応するMicrosoft Entra IDのエンタープライズアプリケーション(SaaSアプリ)へのアクセス権が自動的に付与されるようにしたい<br>・IT管理者が新入社員ごとに手動でアプリケーションを割り当てる作業を無くしたい",
  question: "この要件を満たすために構成する機能はどれですか?",
  choices: [
    "Privileged Identity Management(PIM)",
    "エンタープライズアプリケーションのグループベースの割り当て",
    "条件付きアクセスポリシー",
    "Azure Policy"
  ],
  answer: 1,
  explanation: "Microsoft Entra IDのエンタープライズアプリケーションでは、ユーザーを個別に割り当てる代わりに、セキュリティグループ単位でアプリケーションへのアクセス権を割り当てる「グループベースの割り当て」を構成できます。オンプレミスADのセキュリティグループがMicrosoft Entra Connectで同期されている場合、そのグループに新入社員のアカウントを追加するだけで、グループに紐づいたアプリケーションへのアクセス権が自動的に付与され、IT管理者による個別のアプリケーション割り当て作業が不要になります。<br>・条件付きアクセスポリシーは、サインイン時の条件(場所・デバイス状態など)に応じてアクセスを許可/拒否/追加認証要求する仕組みであり、アプリケーションへの自動割り当て自体を行う機能ではありません。<br>・Azure Policyは、Azureリソースの構成をガバナンスするための仕組みであり、Entra IDのアプリケーション割り当てとは異なる機能です。<br>・PIMは、管理者ロールなど特権的なロールへの昇格を一時的かつ承認ベースで行うための仕組みであり、一般的なSaaSアプリケーションへのアクセス割り当てには使用しません。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターに、GPUを搭載した高コストなノードプールがあります。<br>・GPUを必要とする特定のPodのみをこのノードプールにスケジュールさせたい<br>・GPUを必要としない一般のPodが誤ってこのノードプールにスケジュールされないようにしたい",
  question: "この要件を満たすためにNodeに設定する仕組みはどれですか?",
  choices: [
    "NetworkPolicy",
    "Taints(汚染)とTolerations(許容)",
    "ResourceQuota",
    "Namespace"
  ],
  answer: 1,
  explanation: "Taints(汚染)はNode側に設定し、「このTolerationを持たないPodはスケジュールしない」という拒否条件をNodeに付与します。Toleration(許容)はPod側に設定し、特定のTaintを許容できることを宣言します。GPUノードプールにTaintを設定しておけば、対応するTolerationを持つGPU用Podだけがスケジュールされ、一般のPodは自動的に別のノードプールに配置されます。<br>・Namespaceはリソースを論理的に分割する仕切りであり、Podのスケジュール先Nodeを制御する仕組みではありません。<br>・ResourceQuotaはNamespaceごとに使用できるリソース量の上限を設定する仕組みです。<br>・NetworkPolicyはPod間の通信(トラフィック)を制御する仕組みで、スケジュール先の制御ではありません。"
},
{
  domain: "インフラ",
  scenario: "AKS上に複数のレプリカを持つPodがあります。<br>Podは頻繁に再作成されIPアドレスが変わるため、クライアントが安定したエンドポイントでPodにアクセスできるようにする必要があります。",
  question: "この要件を満たすKubernetesリソースはどれですか?",
  choices: [
    "Service",
    "Namespace",
    "Pod",
    "ConfigMap"
  ],
  answer: 0,
  explanation: "Serviceは、ラベルセレクターで選択した複数のPod群に対して、単一の安定したIPアドレス(またはDNS名)でアクセスできるようにするリソースです。Pod自体は再作成のたびにIPアドレスが変わりますが、Serviceが常に最新のPod群にトラフィックを振り分けます(ClusterIP/NodePort/LoadBalancerなどの種類があります)。<br>・Podはアクセス対象そのもので、安定したエンドポイントを提供する側ではありません。<br>・Namespaceは論理的な仕切りです。<br>・ConfigMapは設定値をPodに渡すためのリソースで、ネットワークエンドポイントとは無関係です。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターを構築しています。<br>・kube-systemの主要コンポーネント(CoreDNSなど)を、ユーザーのアプリケーションPodとは別のノードプールで稼働させたい<br>・クラスター作成時に自動的に用意される、システムコンポーネント専用のノードプールの種類を確認する必要がある",
  question: "この用途のために用意されているノードプールの種類はどれですか?",
  choices: [
    "仮想ノードプール",
    "システムノードプール",
    "ユーザーノードプール",
    "スポットノードプール"
  ],
  answer: 1,
  explanation: "AKSクラスターには必ず1つ以上のシステムノードプールが必要です。システムノードプールは、CoreDNSやmetrics-serverなど、クラスターの稼働に必須なシステムPod(kube-system Namespace内)を優先的にスケジュールするためのノードプールです。ユーザーのアプリケーションPodは、別途追加するユーザーノードプールに分離して配置するのがベストプラクティスです(システムノードプールへの負荷集中や競合を避けるため)。<br>・ユーザーノードプールはアプリケーションのワークロード用に追加するノードプールです(必須ではなく任意で追加)。<br>・スポットノードプールはコストを抑えるためにAzureの余剰キャパシティを使う、いつでも回収され得るノードプールの種類です。<br>・「仮想ノードプール」という名称の標準機能はなく、ACI連携はVirtual Nodesと呼ばれます。"
},
{
  domain: "インフラ",
  scenario: "Azure SQL Databaseに、マイナンバーに相当する個人識別情報を含む列があります。<br>・列データを暗号化し、データベースエンジンおよびデータベース管理者を含む高い権限を持つ者であっても、平文を参照できないようにする必要がある<br>・暗号化・復号はアプリケーション(クライアント)側でのみ行われるようにする必要がある",
  question: "この要件を満たす機能はどれですか?",
  choices: [
    "Dynamic Data Masking",
    "Always Encrypted",
    "SQL Database監査(Auditing)",
    "Transparent Data Encryption(TDE)"
  ],
  answer: 1,
  explanation: "Always Encryptedは、暗号化キーをクライアントアプリケーション側(またはクライアントがアクセスできるKey Vault)でのみ管理し、暗号化・復号をクライアントドライバー側で実行する機能です。データベースエンジンは暗号化されたままのデータしか扱わないため、データベース管理者を含め、暗号化キーにアクセスできない者は平文を参照できません。<br>・Dynamic Data Maskingは、格納データ自体は平文のままで、クエリ結果の表示のみをマスクする機能です。データベース管理者(マスキング対象外ロール)は元の値を参照でき、「管理者も平文を参照できないようにする」という本シナリオの要件には合致しません。<br>・Transparent Data Encryption(TDE)は保存時の暗号化であり、正当な権限でクエリを実行すれば平文がそのまま返るため、この要件を満たしません。<br>・SQL Database監査(Auditing)はデータベースへのアクセスログを記録する機能であり、暗号化機能ではありません。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "地理的に離れた3拠点のオンプレミスサーバーに、Azure API Managementのセルフホステッドゲートウェイを導入し、Azure上のAPIMインスタンスから一元管理できるようにします。",
  question: "次の操作を、実施する順序に並べ替えてください。",
  choices: [
    "各オンプレミスサーバーで、取得した構成トークンを使用してゲートウェイをコンテナー(Docker)としてデプロイする",
    "APIM内でセルフホステッドゲートウェイのリソースを作成し、構成トークンを取得する",
    "Azure上にAPI Managementインスタンスを作成する",
    "APIM管理ポータルで各拠点のゲートウェイの状態(オンライン)を確認する"
  ],
  answer: [2,1,0,3],
  explanation: "まずAzure上にAPI Managementインスタンスを作成します(1)。次に、APIM内で「セルフホステッドゲートウェイ」というリソース(ゲートウェイの論理定義)を作成し、各オンプレミスサーバーにデプロイする際に必要となる構成トークン(認証情報を含む)を取得します(2)。続けて、地理的に離れた各オンプレミスサーバー上で、取得した構成トークンを使用してセルフホステッドゲートウェイをDockerコンテナーとしてデプロイします(3)。これにより各拠点のオンプレミスサーバーがAzure上のAPIMインスタンスと接続され、APIの実体をオンプレミスに残したまま、ポリシーやAPIカタログをAzureから一元的に管理できるようになります。最後に、APIM管理ポータルで各ゲートウェイが正常にオンラインとして認識されていることを確認します(4)。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "複数のAzureリージョンにデプロイされたグローバルなWebアプリケーションがあります。<br>・各リージョン内では、パスやホスト名に基づいてバックエンドサービスへ振り分けるL7ルーティングを行う<br>・リージョン間では、DNSベースでユーザーを最も近い/正常なリージョンへ振り分ける",
  question: "この2層構成における、それぞれのサービスの正しい役割はどれですか?(2つ選択)",
  choices: [
    "Traffic Managerは、DNSベースでリージョン間のトラフィックをルーティングする",
    "Application Gatewayは、リージョン内でパスやホスト名に基づくL7ルーティングを行う",
    "両者は同一レイヤーの機能であるため、通常は併用しない",
    "Application Gatewayは、複数リージョンにまたがるDNSベースのフェールオーバーを行う",
    "Traffic ManagerはL7ロードバランサーであり、HTTPヘッダーの内容を検査してルーティングする"
  ],
  answer: [0,1],
  explanation: "Traffic Managerは、DNSレベルで動作するグローバルなトラフィックルーティングサービスです。クライアントからの名前解決要求に対して、選択したルーティング方式(パフォーマンス、優先順位、地理的など)に基づき、複数リージョンの中から適切なリージョンのエンドポイントのIPアドレスを返します。HTTPリクエストの内容(パスやヘッダー)は検査しません。<br>Application Gatewayは、リージョン内で動作するL7(アプリケーション層)ロードバランサーで、HTTPリクエストのパスやホスト名などの内容に基づいて、リージョン内の複数バックエンドサービスへのルーティングを行います。<br>この2つはレイヤーが異なり(グローバル/DNSレイヤー vs リージョン内/L7レイヤー)、多くのマルチリージョン設計で「Traffic Managerでリージョンを選択 → Application Gatewayでリージョン内のサービスに振り分け」という形で併用されます。<br>・TraffiC ManagerはDNSベースであり、HTTPヘッダーなどL7の内容を検査するL7ロードバランサーではありません。<br>・Application Gatewayはリージョン内で動作するリソースであり、複数リージョンにまたがるDNSベースのフェールオーバー機能は持ちません。"
},
{
  domain: "インフラ",
  scenario: "運用中のAKSクラスターがあります。<br>・Kubernetesのバージョンは変更せず、Node(VM)のOSイメージにのみ提供されている最新のセキュリティパッチを適用したい<br>・アプリケーションの互換性検証は別途スケジュールする都合上、Kubernetesバージョンのアップグレードとは独立したタイミングで実施したい",
  question: "この要件を満たすために実行する操作はどれですか?",
  choices: [
    "ノードプールをスケールダウンしてから再度スケールアップする",
    "Kubernetesバージョンのアップグレードを実行する",
    "ノードイメージのアップグレード(Node image upgrade)のみを実行する",
    "クラスター全体を新しいリソースグループに再作成する"
  ],
  answer: 2,
  explanation: "AKSでは、Node(VM)のOSイメージ(セキュリティパッチや最新コンポーネントを含む)のアップグレードと、Kubernetesコントロールプレーン/ノードのバージョンアップグレードは、それぞれ独立して個別にスケジュール・実行できます。Kubernetesバージョンを変更せずにOSイメージのみを最新化したい場合は、ノードイメージのアップグレードのみを実行します(az aks nodepool upgrade の --node-image-only 相当の操作)。これにより、アプリケーション互換性の検証タイミングをKubernetesバージョンアップグレードと切り離すことができます。<br>・Kubernetesバージョンのアップグレードは、Kubernetes自体のバージョンを変更する操作であり、今回の「バージョンは変更しない」という要件に反します。<br>・クラスターの再作成は過剰な操作であり、ダウンタイムや構成の再現コストが発生します。<br>・スケールダウン/アップだけではNodeのOSイメージは更新されません。"
},
{
  domain: "インフラ",
  scenario: "Azure SQL Databaseに、クレジットカード番号を含む列があります。<br>・非特権のアプリケーションユーザーがクエリを実行した際、クレジットカード番号の一部をマスクした状態(例:****-****-****-1234)で結果を返す必要がある<br>・データベース管理者(高い権限を持つロール)は、引き続き元の値を参照できる必要がある<br>・格納されているデータそのものを変更したくない",
  question: "この要件を満たす機能はどれですか?",
  choices: [
    "Customer Managed Keys",
    "Always Encrypted",
    "Transparent Data Encryption(TDE)",
    "Dynamic Data Masking"
  ],
  answer: 3,
  explanation: "Dynamic Data Maskingは、データベースに格納されている実際の値は変更せずに、クエリ結果を返す時点でマスキングルールを適用し、指定した非特権ユーザーには一部を隠した値(マスク済みの値)を返す機能です。データベース管理者などマスキングルールの対象外に設定されたロールは、引き続き元の値をそのまま参照できます。<br>・Always Encryptedは、クライアントアプリケーション側で暗号化・復号を行い、データベースエンジン(および管理者)がそもそも平文を扱えないようにする機能です。「管理者は元の値を参照できる必要がある」という本シナリオの要件には合致しません。<br>・Transparent Data Encryption(TDE)は、データベースファイル自体を保存時に暗号化する機能であり、クエリ結果に対するマスキングは行いません(クエリを実行すれば平文がそのまま返ります)。<br>・Customer Managed Keysは、TDEなどで使用する暗号化キーを顧客自身が管理する仕組みで、マスキング機能ではありません。"
},
{
  domain: "インフラ",
  scenario: "1つのハブVNetと4つのスポークVNetで構成されるハブスポーク型ネットワークがあります。<br>・オンプレミスとの接続にはVPN Gatewayを使用する<br>・VPN Gatewayはハブに1つだけデプロイする<br>・Gateway Transitを有効にしたVNetピアリングにより、すべてのスポークVNetがハブのVPN Gateway経由でオンプレミスと通信できるようにする",
  question: "この構成に必要なVPN Gatewayの数はいくつですか?",
  choices: [
    "5",
    "4",
    "2",
    "1"
  ],
  answer: 3,
  explanation: "Gateway Transitを有効にしたVNetピアリングを使用すると、スポークVNetは自分自身にゲートウェイを持たなくても、ピアリング先(ハブ)のVPN Gatewayを共有して経由できます。そのため、ハブに1つのVPN Gatewayをデプロイするだけで、すべてのスポークVNetがオンプレミスと通信できます。各スポークに個別のVPN Gatewayを作成する必要はなく、コストと管理負荷を抑えられます。"
},
{
  domain: "インフラ",
  scenario: "オンプレミスのSQL ServerからAzure SQL Managed Instanceへ、Azure Database Migration Serviceを使用したオンライン移行(ダウンタイム最小化)を実施します。<br>移行中にソースとターゲットのデータをどのような仕組みで同期し続けるかを確認する必要があります。",
  question: "オンライン移行中にソースとターゲットを同期し続ける仕組みはどれですか?",
  choices: [
    "ストレージスナップショットを定期的にコピーする",
    "トランザクションログを継続的に読み取り、差分を継続的にターゲットへ反映する",
    "アプリケーション層でソースとターゲットに同時書き込み(デュアルライト)する",
    "毎晩フルバックアップを取得し、ターゲットを完全に置き換える"
  ],
  answer: 1,
  explanation: "Azure Database Migration Serviceのオンライン移行では、まず初期のフル同期(バックアップの復元など)でターゲットにデータを反映した後、ソース側のトランザクションログを継続的に読み取り、発生した差分を継続的にターゲットへ反映し続けます。これにより、カットオーバー(切り替え)の直前まで両者の差分を最小化し、実際の切り替え時のダウンタイムを数分程度に抑えることができます。<br>・「毎晩フルバックアップで置き換える」方式は、直近の変更が反映されず長時間のデータロス・ダウンタイムが発生するオフライン移行に近い方式です。<br>・「アプリケーション層でのデュアルライト」はアプリケーションの改修が必要で、Database Migration Serviceが提供する仕組みではありません。<br>・「ストレージスナップショットの定期コピー」はDatabase Migration Serviceのオンライン移行が使う仕組みではありません。"
},
{
  domain: "インフラ",
  scenario: "Azureにデプロイされるアプリケーション(App1)は、次のコンポーネントに直列(すべてが正常である必要がある)で依存しています。<br>・SLAが99.9%のデータベース(DB1)<br>・SLAが99.95%のService1<br>・SLAが99.99%のService2",
  question: "App1に提供可能な最大の合成SLAはどれですか?",
  choices: [
    "99.95%",
    "99.99%",
    "99.84%",
    "99.9%"
  ],
  answer: 2,
  explanation: "複数のコンポーネントが直列(すべてが正常でなければ全体が正常とみなされない)で依存する場合、合成SLAは各コンポーネントのSLAの積で計算します。0.999 × 0.9995 × 0.9999 ≈ 0.99840(約99.84%)となります。直列依存では、コンポーネントの数が増えるほど、また個々のSLAが低いほど、全体のSLAは各コンポーネントの最小値よりもさらに低くなります。<br>・99.9%はDB1単体のSLAであり、他のコンポーネントとの直列依存を考慮していません。<br>・99.95%、99.99%はそれぞれService1、Service2単体のSLAであり、同様に他のコンポーネントを考慮していません。全体のSLAは、直列構成では必ず最も低い個々のSLAよりもさらに低い値になる点がポイントです。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターを設計しています。<br>・すべてのPodに対して、他のAzureリソースと同様にVNet内の直接ルーティング可能なIPアドレスを割り当てる必要がある<br>・Windowsノードプールを使用する予定がある",
  question: "どのネットワークプラグインを推奨しますか?",
  choices: [
    "Azure CNI(従来)",
    "kubenet",
    "Basic Load Balancer",
    "Azure CNI Overlay"
  ],
  answer: 0,
  explanation: "Azure CNI(従来)は、すべてのPodにVNetのサブネットから直接IPアドレスを割り当てます。PodはNode・他のVNetリソースと同じアドレス空間で直接通信でき、Windowsノードプールもサポートします。ただしPodごとにIPアドレスを消費するため、大規模クラスターではサブネットのIPアドレス枯渇に注意が必要です。<br>・kubenetはPodにVNetの実IPアドレスを割り当てず(NAT経由)、Windowsノードプールもサポートしません。<br>・Azure CNI Overlayは独立したオーバーレイアドレス空間からPodにIPを割り当てるため、VNetの実IPアドレスは消費しません(このシナリオの「VNetと同じ直接ルーティング可能なIP」という要件には合致しません)。<br>・Basic Load BalancerはネットワークプラグインではなくロードバランサーのSKUです。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "AKSクラスターのアップグレード運用について、正しい仕様を確認する必要があります。",
  question: "AKSノードプールのアップグレードに関する正しい記述はどれですか?(2つ選択)",
  choices: [
    "ノードイメージのアップグレードと、Kubernetesバージョンのアップグレードは、それぞれ独立してスケジュール・実行できる",
    "Kubernetesバージョンのアップグレードでは、常にすべてのNodeが同時に一括で入れ替わる",
    "ノードイメージのアップグレードを行うと、必ずKubernetesバージョンも同時に上がる",
    "アップグレードは常にクラスター全体を停止してから実施される",
    "既定のMax Surgeは1であり、新しいNodeを追加してから古いNodeをcordon/drainする"
  ],
  answer: [0,4],
  explanation: "AKSのアップグレードに関する正しい仕様は次の2点です。<br>・ノードイメージのアップグレードとKubernetesバージョンのアップグレードは独立した操作であり、それぞれ別のタイミングでスケジュール・実行できます。OSパッチだけを適用したい場合はノードイメージのアップグレードのみを実行できます。<br>・既定のMax Surgeは1です。アップグレード時はまず新しいバージョンのNodeを1台追加(サージ)してから、既存Nodeをcordon・drainして削除するという順序で、1台ずつ(既定値の場合)入れ替えていきます。<br>・「クラスター全体を停止」は誤りです。ローリング方式で入れ替えるため、アップグレード中もサービス提供を継続できるよう設計されています。<br>・「常にすべてのNodeが同時に一括で入れ替わる」も誤りです。既定ではMax Surge=1のため1台ずつ処理されます(Max Surgeの値を変更すれば同時実行数を増やすことは可能です)。<br>・「ノードイメージのアップグレードで必ずKubernetesバージョンも上がる」は誤りです。ノードイメージのアップグレードはOS/コンポーネントの更新のみで、Kubernetesバージョンには影響しません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Recovery Services コンテナーに対して、侵害された高権限アカウントが単独でバックアップの無効化や削除を行えないようにするため、Multi-user Authorization(MUA)の導入を検討しています。",
  question: "MUAを正しく機能させるための構成として正しいものはどれですか?(2つ選択)",
  choices: [
    "バックアップの無効化・削除など保護対象の重要な操作には、通常のバックアップ操作者とは別の承認者による許可が必要になるように構成する",
    "Resource Guardを、保護対象のRecovery Services コンテナーとは別のサブスクリプション(またはテナント)に作成する",
    "MUAは、geo冗長ストレージ(GRS)の設定を自動的に有効化する機能である",
    "MUAを有効化すると、既存のバックアップポリシーは自動的にすべて削除される",
    "Resource Guardを、保護対象のRecovery Services コンテナーと同じサブスクリプションに作成する"
  ],
  answer: [0,1],
  explanation: "Multi-user Authorization(MUA)は、Resource Guardという別リソースを使って、バックアップの無効化・削除・保持期間の変更など「重要な操作」に対して、通常のバックアップ管理者とは別の権限を持つ承認者の許可を必須にする仕組みです。<br>侵害された単一の高権限アカウントが、Recovery Services コンテナーの権限とResource Guardの権限を両方とも保持していると、MUAの防御効果が失われてしまいます。そのため、Resource Guardは保護対象のコンテナーとは別のサブスクリプション(理想的には別のテナントやAzure ADテナントの別管理者が管理するサブスクリプション)に作成することがベストプラクティスとして推奨されます。<br>・「同じサブスクリプションに作成する」は、単一アカウントの侵害で両方の権限が奪われるリスクを残すため、推奨される構成ではありません。<br>・MUAはgeoレプリケーション(GRS)の設定を自動化する機能ではなく、無関係です。<br>・MUAを有効化しても既存のバックアップポリシーが自動削除されることはありません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Azure Policyで、診断設定が存在しないリソースに対して自動的に診断設定をデプロイする、DeployIfNotExists効果のポリシーを構成しています。<br>ポリシーの割り当て後、修復(remediation)タスクが正常にリソースをデプロイできるようにする必要があります。",
  question: "修復タスクが正しく機能するために必要な構成はどれですか?(2つ選択)",
  choices: [
    "Azure Policyの無料枠の上限に達していないことを確認する",
    "ポリシー割り当てにマネージドID(システム割り当てまたはユーザー割り当て)を関連付ける",
    "ポリシーの効果をAuditのみに変更する",
    "そのマネージドIDに、必要なデプロイ操作を実行できるロール(共同作成者など)を割り当てる",
    "対象のリソースグループにリソースロック(削除ロック)を設定する"
  ],
  answer: [1,3],
  explanation: "DeployIfNotExists効果のポリシーは、条件に一致するリソースが存在しない場合、指定したテンプレートを使ってリソース(診断設定など)を自動的にデプロイします。この「デプロイ」操作を実行する主体として、ポリシー割り当てにマネージドID(システム割り当てまたはユーザー割り当て)を関連付ける必要があります。<br>さらに、そのマネージドIDには、実際にデプロイ操作(診断設定の作成など)を実行できる十分な権限を持つAzure RBACロール(共同作成者など、ポリシー定義のroleDefinitionIdsで指定されたロール)を割り当てる必要があります。マネージドIDに権限が無い場合、修復タスクはリソースをデプロイできず失敗します。<br>・効果をAuditのみに変更すると、リソースの検出(非準拠の報告)のみが行われ、自動デプロイ(修復)は行われなくなるため、今回の要件には反します。<br>・リソースロックやAzure Policyの無料枠は、修復タスクの動作要件とは無関係です。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "オンプレミスのSQL ServerからAzure SQL Managed Instanceへ、Azure Database Migration Serviceを使用したダウンタイム最小化のオンライン移行を実施します。",
  question: "次の操作を、実施する順序に並べ替えてください。",
  choices: [
    "初期のフルバックアップの復元により、ターゲットへ初期データを反映する",
    "Azure Database Migration Serviceインスタンスを作成し、ソースとターゲットへの接続を構成する",
    "トランザクションログの継続的な同期により、ソースとターゲットの差分を最小化し続ける",
    "アプリケーションを停止し、最終的な差分を同期した後にターゲットへカットオーバーする"
  ],
  answer: [1,0,2,3],
  explanation: "まずAzure Database Migration Serviceインスタンスを作成し、ソースのオンプレミスSQL ServerとターゲットのSQL Managed Instanceへの接続情報を構成します(1)。次に、初期のフルバックアップをターゲットへ復元することで、移行開始時点のデータをターゲットに反映します(2)。その後、切り替え(カットオーバー)を行うまでの間、ソース側のトランザクションログを継続的に読み取り差分をターゲットへ反映し続けることで、ソースとターゲットの差分を最小限に保ちます(3)。最後に、業務影響を最小化するため短時間だけアプリケーションを停止し、残っている最終的な差分を同期した上でターゲットへカットオーバー(切り替え)します(4)。この流れにより、長時間のフルダウンタイムを避けながら移行を完了できます。"
},
{
  domain: "インフラ",
  scenario: "大規模なAKSクラスターを設計しています。<br>・Podの数が非常に多くなる予定である<br>・VNetのIPアドレス空間が限られており、Pod用にIPアドレス空間を追加で確保できない<br>・PodはVNet内のIPアドレスを直接消費すべきではない",
  question: "どのネットワークプラグインを推奨しますか?",
  choices: [
    "デュアルスタックネットワーク",
    "kubenet",
    "Azure CNI(従来)",
    "Azure CNI Overlay"
  ],
  answer: 3,
  explanation: "Azure CNI Overlayは、Node(VM)にはVNetのIPアドレスを割り当てますが、Podには独立したプライベートなオーバーレイアドレス空間(VNetとは別のCIDR)からIPアドレスを割り当てます。PodのIPアドレスはVNet内をルーティングされず、Node上でオーバーレイ処理されるため、VNetのIPアドレス空間をPodのために消費しません。従来のAzure CNIより大規模なPod数をVNetのIPアドレス枯渇なしにサポートできます。<br>・Azure CNI(従来)はPodごとにVNetの実IPアドレスを消費するため、大規模クラスターではIPアドレス空間の枯渇を招きます。<br>・kubenetもVNetのIPは消費しませんが、ルートテーブルの上限などスケール制約があり、大規模クラスターには推奨されません。<br>・デュアルスタックネットワークはIPv4/IPv6の併用構成であり、この要件の解決策ではありません。"
},
{
  domain: "インフラ",
  scenario: "1つのVNetに、ExpressRoute GatewayとVPN Gatewayを共存させる構成を計画しています。<br>・平常時はExpressRoute経由でオンプレミスと通信する<br>・ExpressRoute障害時はVPN Gateway経由でフェールオーバーする",
  question: "このVNetに作成する必要があるGatewaySubnetの数はいくつですか?",
  choices: [
    "1",
    "2",
    "0(不要)",
    "3"
  ],
  answer: 0,
  explanation: "1つのVNetに作成できるGatewaySubnetは常に1つだけです。ExpressRoute GatewayとVPN Gatewayを同一VNetで共存させる場合でも、両方のゲートウェイは同じ1つのGatewaySubnet内にデプロイされます(GatewaySubnetを複数作成することはできません)。GatewaySubnet自体は1つのサブネットリソースであり、その中に複数のゲートウェイ(リソース)を配置できる点がポイントです。"
},
{
  domain: "インフラ",
  scenario: "Azure Traffic Managerを使用して、プライマリリージョンとフェールオーバー先リージョンの間で自動フェールオーバーを行うPriority(優先順位)ルーティング方式を構成します。",
  question: "Priorityルーティング方式を構成するために最低限必要なエンドポイントの数はいくつですか?",
  choices: [
    "1",
    "4",
    "2",
    "3"
  ],
  answer: 2,
  explanation: "Priorityルーティング方式は、プライマリエンドポイントに障害が発生した場合に次の優先順位のエンドポイントへ自動的にフェールオーバーする仕組みです。フェールオーバーが成立するためには、最低でもプライマリ用とフェールオーバー先用の2つのエンドポイントが必要です。エンドポイントが1つしか無い場合、そもそも「フェールオーバー先」が存在せず、Priorityルーティングの目的を果たせません。3つ目以降のエンドポイントは、さらに多段のフェールオーバー順位を構成したい場合にのみ追加します(必須ではありません)。"
},
{
  domain: "インフラ",
  scenario: "地理的に離れた3拠点のオンプレミスサーバーでそれぞれ独自にAPIをホストしています。<br>・すべてのAPIに対して、認証・レート制限・監視などのポリシーをAzureから一元的に管理したい<br>・APIの実体(バックエンド)はオンプレミスに残したまま、AzureへのAPI移行は行わない",
  question: "この要件を満たす構成はどれですか?",
  choices: [
    "Azure API Management(セルフホステッドゲートウェイを各拠点に配置)",
    "Azure Arc対応Kubernetes",
    "Azure Front Door",
    "Azure API for FHIR"
  ],
  answer: 0,
  explanation: "Azure API Managementのセルフホステッドゲートウェイは、APIMのゲートウェイ機能をコンテナーとしてオンプレミス環境に配置できる機能です。各拠点のオンプレミスサーバーにセルフホステッドゲートウェイをデプロイすることで、APIの実体はオンプレミスに残したまま、認証・レート制限・監視などのポリシーやAPIカタログをAzure上のAPIMインスタンスから一元的に管理できます。<br>・Azure Arc対応Kubernetesは、オンプレミスのKubernetesクラスターをAzure Resource Managerに登録し、Azure Policyなどで統合管理する仕組みですが、本シナリオはAPIのポリシー管理(認証・レート制限)が主目的であり、APIM(セルフホステッドゲートウェイ)がより直接的な解決策です。<br>・Azure API for FHIRは医療データ(FHIR規格)向けの特化型APIサービスであり、汎用APIの一元管理には使用しません。<br>・Azure Front DoorはグローバルなHTTP(S)配信・負荷分散サービスであり、APIポリシーの一元管理機能(認証やレート制限のポリシーエンジン)は持ちません。"
},
{
  domain: "インフラ",
  scenario: "AKSクラスターで、予測不能な短時間の急激なバースト的負荷が時々発生するバッチジョブを実行しています。<br>・バースト時にNode(VM)を事前にプロビジョニングせず、迅速にPodを起動したい<br>・追加の計算容量に対して、稼働しているVMインスタンスの管理を最小限に抑えたい",
  question: "この要件を満たすためにAKSで使用する機能はどれですか?",
  choices: [
    "Standard Load Balancer",
    "Cluster Autoscaler",
    "Virtual Nodes(ACI連携)",
    "Availability Zones"
  ],
  answer: 2,
  explanation: "Virtual Nodesは、AKSクラスターにAzure Container Instances(ACI)を仮想的なNodeとして連携させる機能です。ACIはサーバーレスのコンテナー実行環境のため、Podを起動する際にVM(Node)を事前にプロビジョニング・管理する必要がなく、数秒単位でPodをバーストさせることができます。急激で予測不能な短時間バーストに対して、通常のノードプールにVMを追加するCluster Autoscalerよりもはるかに高速に対応できます。<br>・Cluster Autoscalerは通常のノードプールにVMを追加する方式のため、VMの起動に数分かかり、VM自体の管理(ノードプールとしての存在)も残ります。<br>・Availability Zonesは可用性のための機能で、バースト的なスケーリングとは無関係です。<br>・Standard Load Balancerはトラフィック分散のためのリソースで、コンピュートのバーストスケーリングには関与しません。"
},
{
  domain: "インフラ",
  scenario: "既存のハブスポーク型ネットワーク(VNetピアリングで接続)があり、ハブVNetにサードパーティ製のネットワーク仮想アプライアンス(NVA)がデプロイされています。<br>・NVAとBGPで動的にルートを交換したい<br>・スポークVNetが、NVAが広告するルートを動的に学習できるようにしたい<br>・既存のハブスポーク構成(VNetピアリング)を維持し、Virtual WANへの全面移行は避けたい",
  question: "この要件を満たすためにハブVNetに追加するリソースはどれですか?",
  choices: [
    "Azure Route Server",
    "ExpressRoute Direct",
    "Azure Firewall Manager",
    "Azure Virtual WAN"
  ],
  answer: 0,
  explanation: "Azure Route Serverは、既存のVNet内にデプロイし、NVAとBGPピアリングを確立することで、NVAが広告するルートをRoute Server経由でVNet内に動的に取り込めるようにするサービスです。ピアリングされたスポークVNetにもこのルートを伝播させるには、別途スポーク側のピアリング設定で「リモート仮想ネットワークのゲートウェイまたはRoute Serverを使用する」を有効にする必要があります(単にRoute Serverをデプロイしただけで自動的に全スポークへ伝播するわけではありません)。UDRを手動でメンテナンスすることなく、NVAとAzureネットワークの間で動的なルート交換(推移的なルーティング)を実現できる点が本質的な価値です。既存のハブスポーク構成(VNetピアリング)を維持したまま追加導入できる点も特徴です。<br>・Azure Virtual WANは大規模な支店接続やフルマネージドの推移的ルーティング基盤ですが、既存構成からの移行が必要であり、「既存構成を維持したい」という要件には合致しません。<br>・Azure Firewall ManagerはAzure Firewallのポリシー管理サービスであり、BGPルート交換の機能はありません。<br>・ExpressRoute Directは物理的な専用ポートでExpressRoute回線を確立するためのサービスで、BGPルート交換の仕組みそのものではありません。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "AKS上のアプリケーションを、Azure Service Busキューの長さに基づいて自動的にスケール(スケール・ツー・ゼロを含む)させるようにKEDAを新規構成します。",
  question: "次の操作を、実施する順序に並べ替えてください。",
  choices: [
    "Service Bus接続文字列をKubernetes Secretとして保存する",
    "AKSクラスターでKEDAアドオンを有効化する",
    "KEDAがキューの長さを監視し、対象Deploymentのレプリカ数を自動的に増減させる",
    "対象Deploymentと監視するService Busキュー、スケーリング条件を指定したScaledObjectをデプロイする"
  ],
  answer: [0,1,3,2],
  explanation: "KEDAによるイベント駆動オートスケーリングの構成は次の順序で行います。まずKEDAがService Busキューにアクセスするための接続文字列を、Kubernetes Secretとして安全に保存します(1)。次にAKSクラスターでKEDAアドオンを有効化し、KEDAのコントローラーをクラスターに導入します(2)。続けて、対象のDeployment、監視するService Busキュー、スケーリング条件(しきい値や最小/最大レプリカ数)を指定したScaledObjectというカスタムリソースをデプロイします(3)。これによりKEDAは指定されたキューの長さを継続的に監視し、しきい値に基づいて対象Deploymentのレプリカ数を自動的に増減させます。メッセージが無い場合はレプリカ数を0まで減らすこと(スケール・ツー・ゼロ)も可能です(4)。"
},
{
  domain: "インフラ",
  scenario: "複数の支店(ブランチオフィス)がVPN経由でAzureに接続されているネットワークを設計しています。<br>・支店同士(ブランチ間)が、Azureを経由して自動的に(BGPによる推移的ルーティングで)相互通信できる必要がある<br>・支店の追加時に、既存の支店ごとに個別のUDRやピアリングを手動追加したくない",
  question: "この要件を満たすソリューションはどれですか?",
  choices: [
    "Point-to-Site VPN",
    "Azure Bastion",
    "VNetピアリング",
    "Azure Virtual WAN"
  ],
  answer: 3,
  explanation: "Azure Virtual WANは、多数の支店やVNetを中央のハブに接続し、BGPを使った推移的(Transitive)ルーティングによって、接続されたすべての支店・VNet同士が自動的に相互通信できるようにするマネージドサービスです。支店を追加してもVirtual WANが自動的にルート情報を伝播するため、個別にUDRやフルメッシュのピアリングを手動構成する必要がありません。<br>・VNetピアリングは非推移的であり、支店(VNet)が増えるたびに全組み合わせのピアリングやUDRを手動構成する必要があり、この要件には適しません。<br>・Point-to-Site VPNは個々のクライアント端末からの接続方式であり、支店同士の相互通信の解決策ではありません。<br>・Azure BastionはVMへの安全なRDP/SSH接続用サービスで、ネットワーク間ルーティングとは無関係です。"
},
{
  domain: "インフラ",
  scenario: "東日本リージョンと西日本リージョンにそれぞれ1つずつVNetがあります。<br>・各VNetはそれぞれのリージョンのExpressRoute回線経由でオンプレミスに接続する<br>・ExpressRoute Global Reachを使用して、オンプレミスを経由せずに2つのリージョンのVNet同士を直接通信させる",
  question: "この構成に必要なExpressRoute Gatewayの総数はいくつですか?",
  choices: [
    "4",
    "1",
    "3",
    "2"
  ],
  answer: 3,
  explanation: "ExpressRoute Gatewayは各VNetに1つずつ必要です。東日本のVNetにExpressRoute Gatewayを1つ、西日本のVNetにExpressRoute Gatewayを1つ、合計2つが必要になります。ExpressRoute Global Reachは、既存の2つのExpressRoute回線同士をMicrosoftのバックボーン上でプライベートに接続する機能であり、Gateway自体の数を減らすものではありません(Gatewayを新たに追加する必要もありません)。それぞれのリージョンのVNetが独自にオンプレミスと接続するための最小構成として、リージョンごとに1つのExpressRoute Gatewayが必要です。"
},
{
  domain: "インフラ",
  scenario: "可用性を重視するサービスを、2つの独立したAzureリージョンにそれぞれ1インスタンスずつ、アクティブ/アクティブ構成でデプロイします。<br>・各リージョンのインスタンスのSLAはそれぞれ99.9%である<br>・どちらか一方のリージョンが正常であれば、サービス全体は利用可能とみなす(並列構成)",
  question: "この構成で達成可能な合成SLAはどれですか?",
  choices: [
    "99.9%",
    "99.8%",
    "99.99%",
    "99.9999%"
  ],
  answer: 3,
  explanation: "複数のコンポーネントが並列(いずれか1つでも正常であれば全体が正常とみなされる、冗長構成)の場合、合成SLAは「1 - (各コンポーネントの障害率の積)」で計算します。各インスタンスの障害率は 1 - 0.999 = 0.001 です。両方が同時に障害となる確率は 0.001 × 0.001 = 0.000001 であるため、合成SLAは 1 - 0.000001 = 0.999999(99.9999%)になります。並列(冗長)構成では、個々のコンポーネントのSLAよりも全体のSLAの方が高くなる点が、直列構成とは正反対のポイントです。<br>・99.9%は各インスタンス単体のSLAであり、冗長化による向上を反映していません。<br>・99.99%、99.8%は誤った計算(単純な平均や加算など)による値であり、正しい並列合成の計算式とは異なります。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "AKSクラスターで稼働するアプリケーションの負荷が、時間帯によって大きく変動します。<br>・負荷増加時に、稼働するPodの数を自動的に増やす必要がある<br>・Podをスケジュールする空き容量が不足した場合、Node(VM)の数も自動的に増やす必要がある",
  question: "この2つの要件を満たすためにそれぞれ構成する必要がある機能はどれですか?(2つ選択)",
  choices: [
    "Azure Front Door",
    "Horizontal Pod Autoscaler(HPA)",
    "Vertical Pod Autoscaler(VPA)",
    "Cluster Autoscaler",
    "Azure Bastion"
  ],
  answer: [1,3],
  explanation: "この2つの要件はレイヤーが異なるため、それぞれ別の自動スケーリング機能で対応します。<br>・Horizontal Pod Autoscaler(HPA)は、CPU使用率などのメトリクスに基づいてPodのレプリカ数(数)を自動的に増減させます。「負荷増加時にPod数を増やす」要件に対応します。<br>・Cluster Autoscalerは、Podをスケジュールする空き容量(CPU/メモリ)がNode上に不足した場合、ノードプールにNode(VM)を自動的に追加し、逆に余剰があればNodeを削減します。「Node数を自動的に増やす」要件に対応します。<br>この2つは連動して動作することが多く、HPAがPod数を増やそうとしても空き容量が無い場合、Cluster AutoscalerがNodeを追加してPodをスケジュール可能にします。<br>・Vertical Pod Autoscaler(VPA)はPod1つあたりのリソース割り当てを調整するもので、数の増減ではありません。<br>・Azure BastionはVMへの安全なRDP/SSH接続用サービス、Azure FrontDoorはグローバルなHTTP配信サービスで、いずれもスケーリング機能ではありません。"
},
{
  domain: "インフラ",
  scenario: "1つのハブVNetと4つのスポークVNetで構成されるネットワークを設計しています。<br>・各スポークVNetはハブVNetとのみVNetピアリングされる<br>・スポークVNet同士は直接ピアリングしない(非推移的)",
  question: "この構成に必要なVNetピアリング接続(ハブ-スポークの組み合わせ)の数はいくつですか?",
  choices: [
    "8",
    "6",
    "3",
    "4"
  ],
  answer: 3,
  explanation: "VNetピアリングは非推移的(Non-transitive)であり、直接ピアリングされた2つのVNet間でのみ有効です。ハブVNetと各スポークVNetの組み合わせごとに1つのピアリング接続が必要なため、スポークが4つあれば、ハブ-スポーク1、ハブ-スポーク2、ハブ-スポーク3、ハブ-スポーク4の合計4つのピアリング接続が必要です。スポーク同士は直接ピアリングしないため、スポーク間の通信が必要な場合は別途、ハブに配置したNVAやAzure Firewallを経由するルーティング(UDR)を構成する必要があります(ピアリング自体を6つ追加する全メッシュ構成にはしません)。"
},
{
  domain: "インフラ",
  type: "order",
  scenario: "運用中のAKSノードプールに対して、既定の設定(Max Surge=1)でKubernetesバージョンのアップグレードを実行します。<br>アップグレード中に1台ずつNodeが入れ替わっていく処理の流れを確認する必要があります。",
  question: "既定のMax Surge設定で1台のNodeが入れ替わる際の処理順序を、実施される順に並べ替えてください。",
  choices: [
    "cordonした古いNode上のPodをdrain(退避)し、他のNodeに再スケジュールする",
    "既存の古いNodeの1台をcordon(新規Podのスケジュール禁止)にする",
    "新しいバージョンのNodeを1台(サージノードとして)追加する",
    "Podが退避された古いNodeを削除する"
  ],
  answer: [2,1,0,3],
  explanation: "AKSノードプールのアップグレードは既定でMax Surge=1です。これは「アップグレードのたびに、まず新しいバージョンのNodeを1台追加(サージ)してから、古いNodeを退避・削除する」という意味です。順序は次の通りです。まず新しいバージョンのNodeを1台追加します(1)。次に既存の古いNodeの1台をcordonし、新規Podがスケジュールされないようにします(2)。続けてcordonされたNode上の既存Podをdrainして他のNode(新しいNodeを含む)へ退避させます(3)。最後に、Podが退避されて空になった古いNodeを削除します(4)。<br>重要なポイントは、先に新しいNodeを追加してから古いNodeをcordon/drainする(容量を先に確保してから退避する)順序である点です。先に古いNodeを削除してしまうと、その分のPodをスケジュールする容量が一時的に不足してしまいます。このプロセスをノードプール内の全Nodeに対して1台ずつ繰り返します。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "既存のハブスポーク型ネットワーク(VNetピアリングのみ、Virtual WANやAzure Route Serverは未導入)があります。<br>・スポークVNet間の通信を、必ずハブVNet内のNVA(ネットワーク仮想アプライアンス)経由で行わせ、通信を検査したい<br>・スポーク同士を直接ピアリングすることはしたくない",
  question: "この要件を満たすためにスポークのサブネットとハブのNVAに対して構成する必要があるものはどれですか?(2つ選択)",
  choices: [
    "スポーク同士を直接VNetピアリングする",
    "スポークのサブネットにUDR(ユーザー定義ルート)を関連付け、宛先を他スポークのアドレス範囲、ネクストホップをNVAのプライベートIPアドレスに設定する",
    "NSGでスポーク間のすべての通信を許可するルールを追加する",
    "スポークVNetにVPN Gatewayを追加する",
    "ハブにデプロイしたNVAでIP転送(IP Forwarding)を有効にする"
  ],
  answer: [1,4],
  explanation: "VNetピアリングのみ(Virtual WANやRoute Serverなし)でスポーク間通信をハブのNVA経由に強制するには、静的なルーティング構成が必要です。<br>まず、各スポークのサブネットにUDR(ユーザー定義ルート)を関連付け、他のスポークのアドレス範囲宛てのトラフィックのネクストホップを、ハブに配置したNVAのプライベートIPアドレスに設定します。これにより、スポーク間の通信がいったんNVAを経由するようになります。<br>次に、ハブのNVA自体で、自分宛てではないパケットを転送できるようにするため、IP転送(IP Forwarding)をNVAの仮想マシンのネットワークインターフェイス設定で有効にする必要があります(既定では自分宛てでないパケットは破棄されます)。<br>・スポーク同士を直接ピアリングしてしまうと、通信がNVAを経由せず直接流れてしまうため、要件(NVA経由での検査)に反します。<br>・VPN Gatewayの追加はオンプレミス接続用であり、スポーク間通信のルーティング制御とは無関係です。<br>・NSGでの許可ルールは通信を許可する/拒否するものであり、経路をNVA経由に変更する機能ではありません。"
},
{
  domain: "インフラ",
  scenario: "新しいAKSクラスターのネットワークプラグインを選定しています。<br>・クラスターの規模は大きくなる予定はない<br>・VNetのIPアドレス空間の消費を最小限に抑える必要がある<br>・Windowsノードプールは使用しない",
  question: "どのネットワークプラグインを推奨しますか?",
  choices: [
    "Azure CNI(従来)",
    "Azure CNI Overlay",
    "kubenet",
    "Virtual Network NAT"
  ],
  answer: 1,
  explanation: "Azure CNI Overlayは、PodにVNetのアドレス空間とは別の独自のオーバーレイアドレス空間からIPを割り当てるため、kubenetと同様にVNetのIPアドレス消費を最小限に抑えられます。現在Microsoftは、IPアドレス消費を抑えたい多くのシナリオでAzure CNI Overlayを既定の推奨としており、kubenetは2028年3月31日に廃止(retirement)が予告されているため、新規クラスターでの採用は推奨されません。<br>・kubenetは、この規模・要件だけを見ると条件を満たすように見えますが、上記の廃止予告があるため新規構築では避けるべきです。<br>・Azure CNI(従来)は、すべてのPodにVNet内の実アドレスを事前予約するため、IPアドレス消費が非常に大きくなります。<br>・Virtual Network NATはAKSのネットワークプラグインではなく、送信(アウトバウンド)接続のためのAzureサービスです。"
},
{
  domain: "インフラ",
  scenario: "AKSのオートスケーリング機能を比較検討しています。<br>KEDAが標準のHorizontal Pod Autoscaler(HPA)と何を組み合わせて実現しているかを確認する必要があります。",
  question: "KEDAの位置づけとして正しいものはどれですか?",
  choices: [
    "HPAが利用できるカスタムメトリクス(外部イベントソース)を提供し、HPAの仕組みを拡張するコンポーネント",
    "Podに割り当てるCPU/メモリ量を自動調整するコンポーネント",
    "Ingressコントローラーの一種",
    "HPAを完全に置き換える、Node数を調整するコンポーネント"
  ],
  answer: 0,
  explanation: "KEDAは、Service BusキューやAzure Storageキューなど外部イベントソースのメトリクスをKubernetesのカスタムメトリクスAPIとして公開し、HPAがそのメトリクスを参照してPodのレプリカ数を増減できるようにする拡張コンポーネントです。つまりKEDAはHPAを置き換えるのではなく、HPAが監視できるメトリクスの種類を広げる役割を担います(0レプリカからのスケールアウトも可能にする点が独自機能です)。<br>・Node数の調整はCluster Autoscalerの役割です。<br>・Pod1つあたりのCPU/メモリ量の自動調整はVPAの役割です。<br>・Ingressコントローラーは外部からのHTTP(S)トラフィックをルーティングする仕組みで、スケーリングとは無関係です。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "VNet内にAzure SQL Managed Instanceをデプロイしています。<br>・App ServiceのWebアプリからSQL Managed InstanceへVNet経由で送信(アウトバウンド)接続できるようにする必要がある<br>・同時に、このWebアプリへの着信(インバウンド)アクセスは、同じVNet内からのプライベート接続のみに限定し、パブリックインターネットからのアクセスは遮断する必要がある",
  question: "この2つの要件をそれぞれ満たすために組み合わせて構成する機能はどれですか?(2つ選択)",
  choices: [
    "Hybrid Connections",
    "Private Endpoint",
    "Service Endpoint",
    "Azure Bastion",
    "VNet統合(VNet Integration)"
  ],
  answer: [1,4],
  explanation: "App ServiceのVNet統合(VNet Integration)は、App Serviceからの送信(アウトバウンド)トラフィックをVNet経由でルーティングするための機能です。これにより、WebアプリからVNet内のSQL Managed Instanceへアウトバウンド接続できるようになります。<br>App ServiceのPrivate Endpointは、App Service自体(着信/インバウンド側)にVNet内のプライベートIPアドレスを割り当てる機能です。Private Endpointを構成し、パブリックネットワークアクセスを無効化することで、着信アクセスをVNet内からのプライベート接続のみに限定できます。<br>この2つはApp Serviceにおいて「アウトバウンド用(VNet統合)」と「インバウンド用(Private Endpoint)」という異なる方向の通信を制御するため、両方を組み合わせて構成する必要があります。<br>・Service Endpointは、App Service側ではなくSQL側などPaaSリソース側のアクセス制御に使われることが多く、本シナリオの2方向の要件を直接満たす組み合わせではありません。<br>・Azure BastionはVM管理用のRDP/SSH接続サービス、Hybrid Connectionsは主にオンプレミスの単一TCPエンドポイントへの接続用機能であり、いずれも本シナリオの要件には該当しません。"
},
{
  domain: "インフラ",
  type: "multi",
  scenario: "Standard SKUのLoad Balancerの仕様を確認しています。",
  question: "Standard Load Balancerに関する正しい記述はどれですか?(2つ選択)",
  choices: [
    "内部(Internal)構成はサポートされない",
    "Basic SKUと同様に無料で使用できる",
    "既定で、バックエンドインスタンスからインターネットへの送信(アウトバウンド)接続がすべて許可される",
    "可用性ゾーンをまたがるゾーン冗長(Zone-redundant)構成をサポートする",
    "バックエンドプールに含めるリソースには、Standard SKUのIPアドレスが必要である"
  ],
  answer: [3,4],
  explanation: "Standard Load Balancerは、可用性ゾーンをまたがるゾーン冗長構成をサポートし、リージョン内の複数ゾーンにまたがる高可用性設計に対応します。また、バックエンドプールに含めるすべてのリソース(VM、VMSSなど)は、Standard SKUのIPアドレス(パブリックIP/プライベートIP)を使用している必要があります(Basic SKUのIPアドレスと混在させることはできません)。<br>・Standard Load Balancerは「セキュアバイデフォルト」の設計であり、既定では送信(アウトバウンド)接続は自動的に許可されません。明示的な送信規則、または追加のNAT Gatewayなどを構成しない限り、既定のアウトバウンドアクセスは提供されません(この点はBasic Load Balancerとの大きな違いで、既定動作が逆になる誤りやすいポイントです)。<br>・Standard Load Balancerは有償のSKUであり、無料ではありません。<br>・Standard Load Balancerは、パブリック構成・内部(Internal)構成の両方をサポートします。"
},
{
  domain: "インフラ",
  scenario: "Azure SQL Databaseで、誤って削除されたテーブルのデータを、削除される数分前の状態にポイントインタイムリストア(PITR)で復元しようとしています。<br>PITRを実行するための前提条件を確認する必要があります。",
  question: "PITRを実行するための前提条件はどれですか?",
  choices: [
    "対象データベースでAlways Encryptedが構成されていること",
    "復元したい時点の直前に、手動でフルバックアップを取得しておくこと",
    "復元したい時点が、自動バックアップの保持期間内であること(自動バックアップは既定で有効)",
    "対象データベースでアクティブなgeoレプリケーションが構成されていること"
  ],
  answer: 2,
  explanation: "Azure SQL Databaseでは、自動バックアップ(フルバックアップ・差分バックアップ・ログバックアップ)が既定で有効になっており、追加の設定なしにポイントインタイムリストア(PITR)を利用できます。PITRで復元できる範囲は、この自動バックアップの保持期間(既定7日、Business Criticalなどでは最大35日まで設定可能)内に限られます。つまり前提条件は「自動バックアップを事前に無効化していないこと」「復元したい時点が保持期間内であること」です。<br>・手動でのフルバックアップ取得は、PITRの前提条件ではありません(自動バックアップの仕組みで完結します)。<br>・Always Encryptedは列データの暗号化機能であり、PITRの前提条件とは無関係です。<br>・geoレプリケーションはリージョン間の冗長化機能であり、同一リージョン内のPITR自体の前提条件ではありません(geoレプリケーションが無くてもPITRは利用できます)。"
},
{
  domain: "インフラ",
  scenario: "複数の運用担当者がAKSクラスターに対してkubectlでアクセスします。<br>・KubernetesのRole-based access control(RBAC)の権限管理を、オンプレミスADと同期済みのMicrosoft Entra IDのユーザー・グループと統合して一元管理したい<br>・kubeconfig内に長期間有効な証明書ベースの認証情報を保持したくない",
  question: "この要件を満たすためにAKSクラスターで有効化する機能はどれですか?",
  choices: [
    "Azure CNI Overlay",
    "Cluster Autoscaler",
    "Microsoft Entra ID統合によるAzure RBAC(Kubernetes認可)",
    "Virtual Nodes"
  ],
  answer: 2,
  explanation: "AKSは、Microsoft Entra ID統合を有効化することで、kubectlによるクラスターへのサインインをEntra IDのユーザー・グループで認証し、さらにAzure RBACと統合することでKubernetesのRBAC権限(どのNamespaceでどの操作ができるか等)をAzureのロール割り当てとして一元管理できます。オンプレミスADとMicrosoft Entra Connect等で同期済みの既存ユーザー・グループをそのまま利用でき、証明書ベースのkubeconfig認証情報を長期間配布・保持する必要がなくなります。<br>・Virtual NodesはACI連携によるバーストスケーリング機能で、認証・認可とは無関係です。<br>・Azure CNI Overlayはネットワークプラグインの選択です。<br>・Cluster AutoscalerはNode数の自動調整機能で、認証・認可とは無関係です。"
}
];
