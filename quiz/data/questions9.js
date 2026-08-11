// AZ-305: Azure Solutions Architect Expert
// MS形式 実戦 C（ID・ガバナンス・監視）（71問） - 再受験対策
// MS公式プラクティス評価と同じ簡潔な文体（選択肢はサービス名/設定名/SKU名/数値のみ）。
// 冒頭7問はケーススタディ形式。弱点3分野（データストレージ／高可用性／ログ監視）を重点的に、
// AZ-305出題範囲全体をカバー。解説は基礎から詳しく記載。

const QUESTIONS_SET9 = [
{
  domain: "ID・ガバナンス・監視",
  caseStudy: {
    title: "ケーススタディ: 月山工業株式会社",
    body: "<strong>会社概要</strong><br>・月山工業株式会社は、自動車部品向け精密部品を製造する従業員約1,200名の製造業。<br>・本社は東京にあり、生産拠点として大阪工場と名古屋工場を運営している。<br><br><strong>既存環境 - ID</strong><br>・オンプレミスに単一ドメインのActive Directory Domain Services(AD DS)を運用している。<br>・Microsoft Entra Connectのパスワードハッシュ同期を使用し、オンプレミスのユーザーアカウントをMicrosoft Entra IDへ同期済みである。<br><br><strong>既存環境 - Azureの管理グループとサブスクリプション</strong><br>・テナントのルート管理グループの直下に、MG-Corp、MG-Manufacturing、MG-Sandboxという3つの管理グループを作成済みである。<br>・MG-Corp配下にはSub-Corp-ProdとSub-Corp-Devの2つのサブスクリプションがある。<br>・MG-Manufacturing配下にはSub-Osaka、Sub-Nagoya、Sub-Sharedの3つのサブスクリプションがある。<br>・MG-Sandbox配下にはSub-Sandboxの1つのサブスクリプションがある。<br><br><strong>既存環境 - ネットワーク</strong><br>・日本東部リージョンに1つのハブVNetを配置しており、GatewaySubnetとAzureFirewallSubnetの2つのサブネットを持つ。<br>・Sub-Corp-Prod、Sub-Osaka、Sub-Nagoyaのそれぞれに1つずつ、合計3つのスポークVNetを作成し、各スポークVNetはハブVNetとのみピアリング接続している(スポークVNet同士は直接ピアリングしない)。<br>・各スポークVNetには、アプリケーション層用サブネットとデータベース層用サブネットの2つのサブネットを作成している。<br>・Sub-SharedとSub-Sandboxには現時点でVNetを作成していない。<br><br><strong>ガバナンス要件</strong><br>・ルート管理グループには、リソースの作成先を日本東部リージョンと日本西部リージョンのみに制限する「許可されるリソースの場所」ポリシーを1つ割り当て済みである。<br>・MG-Manufacturingには、(1)すべてのリソースにCostCenterタグを必須にするポリシーと、(2)仮想マシン作成時に診断設定を自動的に構成してLog Analyticsワークスペースへログを送信するDeployIfNotExists効果のポリシーの、合計2つを新たに割り当てる計画である。<br>・Sub-Osakaサブスクリプションには、サブスクリプション単位でパブリックIPアドレスの作成を拒否するポリシーを1つ、追加で割り当てる計画である。<br>・MG-Manufacturing配下の各サブスクリプションに対する管理者ロール(所有者・共同作成者など)は、常時割り当てられた状態をなくし、必要なときにのみ一定時間だけ昇格できるようにする必要がある。<br><br><strong>監視要件</strong><br>・全6サブスクリプションのリソースログとアクティビティログを、1つの中央Log Analyticsワークスペースに集約する。<br>・コンプライアンス担当者が過去90日分のログをKusto Query Language(KQL)で検索できるようにする。<br>・本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みを構築する。<br><br><strong>ビジネス要件</strong><br>・運用チームの人数が限られているため、管理作業を最小限に抑えられる構成を優先する。<br>・全体のコストを最小限に抑える。"
  },
  scenario: "ガバナンス構成の見直しの一環として、管理グループとサブスクリプションの構成を棚卸ししています。",
  question: "月山工業株式会社が保有するAzureサブスクリプションの総数はいくつですか?",
  choices: [
    "7",
    "6",
    "4",
    "5"
  ],
  answer: 1,
  explanation: "サブスクリプションの総数は、各管理グループ配下のサブスクリプション数を単純に合計すればよい。MG-Corp配下がSub-Corp-ProdとSub-Corp-Devの2つ、MG-Manufacturing配下がSub-Osaka、Sub-Nagoya、Sub-Sharedの3つ、MG-Sandbox配下がSub-Sandboxの1つで、2+3+1=<strong>6</strong>となる。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>管理グループ階層とサブスクリプション数</div><div class='exp-compare'><div class='cmp-col'><div class='cmp-head'>MG-Corp</div><div>Sub-Corp-Prod</div><div>Sub-Corp-Dev</div><div>計 2</div></div><div class='cmp-col'><div class='cmp-head'>MG-Manufacturing</div><div>Sub-Osaka</div><div>Sub-Nagoya</div><div>Sub-Shared</div><div>計 3</div></div><div class='cmp-col'><div class='cmp-head'>MG-Sandbox</div><div>Sub-Sandbox</div><div>計 1</div></div></div><div style='margin-top:8px'>2 + 3 + 1 = <strong>6サブスクリプション</strong></div></div><br>「4」はMG-Manufacturing配下の一部(Sub-Sharedなど)を数え忘れた場合、「5」はMG-Sandbox配下を数え忘れた場合に生じやすい誤り。「7」はテナントのルート管理グループ自体を誤ってサブスクリプションとして数えてしまった場合の誤りで、管理グループそのものはサブスクリプションではない点に注意する。"
},
{
  domain: "インフラ",
  caseStudy: {
    title: "ケーススタディ: 月山工業株式会社",
    body: "<strong>会社概要</strong><br>・月山工業株式会社は、自動車部品向け精密部品を製造する従業員約1,200名の製造業。<br>・本社は東京にあり、生産拠点として大阪工場と名古屋工場を運営している。<br><br><strong>既存環境 - ID</strong><br>・オンプレミスに単一ドメインのActive Directory Domain Services(AD DS)を運用している。<br>・Microsoft Entra Connectのパスワードハッシュ同期を使用し、オンプレミスのユーザーアカウントをMicrosoft Entra IDへ同期済みである。<br><br><strong>既存環境 - Azureの管理グループとサブスクリプション</strong><br>・テナントのルート管理グループの直下に、MG-Corp、MG-Manufacturing、MG-Sandboxという3つの管理グループを作成済みである。<br>・MG-Corp配下にはSub-Corp-ProdとSub-Corp-Devの2つのサブスクリプションがある。<br>・MG-Manufacturing配下にはSub-Osaka、Sub-Nagoya、Sub-Sharedの3つのサブスクリプションがある。<br>・MG-Sandbox配下にはSub-Sandboxの1つのサブスクリプションがある。<br><br><strong>既存環境 - ネットワーク</strong><br>・日本東部リージョンに1つのハブVNetを配置しており、GatewaySubnetとAzureFirewallSubnetの2つのサブネットを持つ。<br>・Sub-Corp-Prod、Sub-Osaka、Sub-Nagoyaのそれぞれに1つずつ、合計3つのスポークVNetを作成し、各スポークVNetはハブVNetとのみピアリング接続している(スポークVNet同士は直接ピアリングしない)。<br>・各スポークVNetには、アプリケーション層用サブネットとデータベース層用サブネットの2つのサブネットを作成している。<br>・Sub-SharedとSub-Sandboxには現時点でVNetを作成していない。<br><br><strong>ガバナンス要件</strong><br>・ルート管理グループには、リソースの作成先を日本東部リージョンと日本西部リージョンのみに制限する「許可されるリソースの場所」ポリシーを1つ割り当て済みである。<br>・MG-Manufacturingには、(1)すべてのリソースにCostCenterタグを必須にするポリシーと、(2)仮想マシン作成時に診断設定を自動的に構成してLog Analyticsワークスペースへログを送信するDeployIfNotExists効果のポリシーの、合計2つを新たに割り当てる計画である。<br>・Sub-Osakaサブスクリプションには、サブスクリプション単位でパブリックIPアドレスの作成を拒否するポリシーを1つ、追加で割り当てる計画である。<br>・MG-Manufacturing配下の各サブスクリプションに対する管理者ロール(所有者・共同作成者など)は、常時割り当てられた状態をなくし、必要なときにのみ一定時間だけ昇格できるようにする必要がある。<br><br><strong>監視要件</strong><br>・全6サブスクリプションのリソースログとアクティビティログを、1つの中央Log Analyticsワークスペースに集約する。<br>・コンプライアンス担当者が過去90日分のログをKusto Query Language(KQL)で検索できるようにする。<br>・本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みを構築する。<br><br><strong>ビジネス要件</strong><br>・運用チームの人数が限られているため、管理作業を最小限に抑えられる構成を優先する。<br>・全体のコストを最小限に抑える。"
  },
  scenario: "ネットワークトポロジのサブネット構成を棚卸ししています。GatewaySubnetやAzureFirewallSubnetのような特殊な用途のサブネットも、通常のサブネットと同様に1つのサブネットとして数えるものとします。",
  question: "ハブVNetと3つのスポークVNetに作成されているサブネットの総数はいくつですか?",
  choices: [
    "8",
    "10",
    "4",
    "6"
  ],
  answer: 0,
  explanation: "ハブVNetにはGatewaySubnetとAzureFirewallSubnetの2つのサブネットがある。スポークVNetは3つあり、各スポークVNetにはアプリケーション層用サブネットとデータベース層用サブネットの2つずつがあるため、スポーク側の合計は3×2=6サブネットになる。ハブの2とスポークの6を合わせて、2+6=<strong>8</strong>サブネットが正解。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>サブネット数の内訳</div><div class='exp-compare'><div class='cmp-col'><div class='cmp-head'>ハブVNet ×1</div><div>GatewaySubnet</div><div>AzureFirewallSubnet</div><div>計 2</div></div><div class='cmp-col'><div class='cmp-head'>スポークVNet ×3</div><div>アプリ層サブネット×3</div><div>DB層サブネット×3</div><div>計 6</div></div></div><div style='margin-top:8px'>2 + 6 = <strong>8サブネット</strong></div></div><br>「4」はスポークVNetのアプリケーション層サブネットのみ、あるいはVNetの総数(4)と混同した誤り。「6」はハブVNetのサブネットを数え忘れてスポーク分のみを合計した誤り。「10」はハブVNetのサブネットを実際より多く見積もった場合などに生じる誤りで、いずれも本文に明記された数と一致しない。"
},
{
  domain: "ID・ガバナンス・監視",
  caseStudy: {
    title: "ケーススタディ: 月山工業株式会社",
    body: "<strong>会社概要</strong><br>・月山工業株式会社は、自動車部品向け精密部品を製造する従業員約1,200名の製造業。<br>・本社は東京にあり、生産拠点として大阪工場と名古屋工場を運営している。<br><br><strong>既存環境 - ID</strong><br>・オンプレミスに単一ドメインのActive Directory Domain Services(AD DS)を運用している。<br>・Microsoft Entra Connectのパスワードハッシュ同期を使用し、オンプレミスのユーザーアカウントをMicrosoft Entra IDへ同期済みである。<br><br><strong>既存環境 - Azureの管理グループとサブスクリプション</strong><br>・テナントのルート管理グループの直下に、MG-Corp、MG-Manufacturing、MG-Sandboxという3つの管理グループを作成済みである。<br>・MG-Corp配下にはSub-Corp-ProdとSub-Corp-Devの2つのサブスクリプションがある。<br>・MG-Manufacturing配下にはSub-Osaka、Sub-Nagoya、Sub-Sharedの3つのサブスクリプションがある。<br>・MG-Sandbox配下にはSub-Sandboxの1つのサブスクリプションがある。<br><br><strong>既存環境 - ネットワーク</strong><br>・日本東部リージョンに1つのハブVNetを配置しており、GatewaySubnetとAzureFirewallSubnetの2つのサブネットを持つ。<br>・Sub-Corp-Prod、Sub-Osaka、Sub-Nagoyaのそれぞれに1つずつ、合計3つのスポークVNetを作成し、各スポークVNetはハブVNetとのみピアリング接続している(スポークVNet同士は直接ピアリングしない)。<br>・各スポークVNetには、アプリケーション層用サブネットとデータベース層用サブネットの2つのサブネットを作成している。<br>・Sub-SharedとSub-Sandboxには現時点でVNetを作成していない。<br><br><strong>ガバナンス要件</strong><br>・ルート管理グループには、リソースの作成先を日本東部リージョンと日本西部リージョンのみに制限する「許可されるリソースの場所」ポリシーを1つ割り当て済みである。<br>・MG-Manufacturingには、(1)すべてのリソースにCostCenterタグを必須にするポリシーと、(2)仮想マシン作成時に診断設定を自動的に構成してLog Analyticsワークスペースへログを送信するDeployIfNotExists効果のポリシーの、合計2つを新たに割り当てる計画である。<br>・Sub-Osakaサブスクリプションには、サブスクリプション単位でパブリックIPアドレスの作成を拒否するポリシーを1つ、追加で割り当てる計画である。<br>・MG-Manufacturing配下の各サブスクリプションに対する管理者ロール(所有者・共同作成者など)は、常時割り当てられた状態をなくし、必要なときにのみ一定時間だけ昇格できるようにする必要がある。<br><br><strong>監視要件</strong><br>・全6サブスクリプションのリソースログとアクティビティログを、1つの中央Log Analyticsワークスペースに集約する。<br>・コンプライアンス担当者が過去90日分のログをKusto Query Language(KQL)で検索できるようにする。<br>・本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みを構築する。<br><br><strong>ビジネス要件</strong><br>・運用チームの人数が限られているため、管理作業を最小限に抑えられる構成を優先する。<br>・全体のコストを最小限に抑える。"
  },
  scenario: "MG-Manufacturingへの新しいポリシー割り当て、およびSub-Osakaへの追加のポリシー割り当てを計画通りに完了させた後の状態を確認しています。",
  question: "管理グループの継承を考慮した場合、Sub-Osakaサブスクリプション内のリソースに適用されるポリシー割り当ての総数はいくつですか?",
  choices: [
    "1",
    "3",
    "4",
    "2"
  ],
  answer: 2,
  explanation: "Azure Policyの割り当ては、割り当てられたスコープ(管理グループやサブスクリプション)配下のすべての子リソースに自動的に継承される。Sub-Osakaは「ルート管理グループ → MG-Manufacturing → Sub-Osaka」という階層に属するため、この経路上のすべてのスコープに割り当てられたポリシーが累積的に適用される。<br>内訳は、(1)ルート管理グループの「許可されるリソースの場所」ポリシー1つ、(2)MG-Manufacturingの必須タグポリシーとDeployIfNotExists効果ポリシーの2つ、(3)Sub-Osaka自体に割り当てるパブリックIP拒否ポリシー1つの、合計1+2+1=<strong>4</strong>個。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>ポリシー継承の内訳(Sub-Osaka)</div><div class='exp-compare'><div class='cmp-col'><div class='cmp-head'>ルート管理グループ</div><div>許可されるリソースの場所</div><div>計 1</div></div><div class='cmp-col'><div class='cmp-head'>MG-Manufacturing</div><div>CostCenterタグ必須</div><div>診断設定DeployIfNotExists</div><div>計 2</div></div><div class='cmp-col'><div class='cmp-head'>Sub-Osaka</div><div>パブリックIP作成拒否</div><div>計 1</div></div></div><div style='margin-top:8px'>1 + 2 + 1 = <strong>4個のポリシー割り当て</strong></div></div><br>「1」や「2」はSub-Osaka自体、あるいはMG-Manufacturingの割り当てしか数えておらず、上位スコープからの継承を見落としている誤り。「3」はルート管理グループの割り当てを数え忘れた場合に生じやすい誤りで、管理グループやサブスクリプションのポリシーは上書きされるのではなく、原則としてすべて累積して適用される点を理解しておく必要がある。"
},
{
  domain: "ID・ガバナンス・監視",
  caseStudy: {
    title: "ケーススタディ: 月山工業株式会社",
    body: "<strong>会社概要</strong><br>・月山工業株式会社は、自動車部品向け精密部品を製造する従業員約1,200名の製造業。<br>・本社は東京にあり、生産拠点として大阪工場と名古屋工場を運営している。<br><br><strong>既存環境 - ID</strong><br>・オンプレミスに単一ドメインのActive Directory Domain Services(AD DS)を運用している。<br>・Microsoft Entra Connectのパスワードハッシュ同期を使用し、オンプレミスのユーザーアカウントをMicrosoft Entra IDへ同期済みである。<br><br><strong>既存環境 - Azureの管理グループとサブスクリプション</strong><br>・テナントのルート管理グループの直下に、MG-Corp、MG-Manufacturing、MG-Sandboxという3つの管理グループを作成済みである。<br>・MG-Corp配下にはSub-Corp-ProdとSub-Corp-Devの2つのサブスクリプションがある。<br>・MG-Manufacturing配下にはSub-Osaka、Sub-Nagoya、Sub-Sharedの3つのサブスクリプションがある。<br>・MG-Sandbox配下にはSub-Sandboxの1つのサブスクリプションがある。<br><br><strong>既存環境 - ネットワーク</strong><br>・日本東部リージョンに1つのハブVNetを配置しており、GatewaySubnetとAzureFirewallSubnetの2つのサブネットを持つ。<br>・Sub-Corp-Prod、Sub-Osaka、Sub-Nagoyaのそれぞれに1つずつ、合計3つのスポークVNetを作成し、各スポークVNetはハブVNetとのみピアリング接続している(スポークVNet同士は直接ピアリングしない)。<br>・各スポークVNetには、アプリケーション層用サブネットとデータベース層用サブネットの2つのサブネットを作成している。<br>・Sub-SharedとSub-Sandboxには現時点でVNetを作成していない。<br><br><strong>ガバナンス要件</strong><br>・ルート管理グループには、リソースの作成先を日本東部リージョンと日本西部リージョンのみに制限する「許可されるリソースの場所」ポリシーを1つ割り当て済みである。<br>・MG-Manufacturingには、(1)すべてのリソースにCostCenterタグを必須にするポリシーと、(2)仮想マシン作成時に診断設定を自動的に構成してLog Analyticsワークスペースへログを送信するDeployIfNotExists効果のポリシーの、合計2つを新たに割り当てる計画である。<br>・Sub-Osakaサブスクリプションには、サブスクリプション単位でパブリックIPアドレスの作成を拒否するポリシーを1つ、追加で割り当てる計画である。<br>・MG-Manufacturing配下の各サブスクリプションに対する管理者ロール(所有者・共同作成者など)は、常時割り当てられた状態をなくし、必要なときにのみ一定時間だけ昇格できるようにする必要がある。<br><br><strong>監視要件</strong><br>・全6サブスクリプションのリソースログとアクティビティログを、1つの中央Log Analyticsワークスペースに集約する。<br>・コンプライアンス担当者が過去90日分のログをKusto Query Language(KQL)で検索できるようにする。<br>・本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みを構築する。<br><br><strong>ビジネス要件</strong><br>・運用チームの人数が限られているため、管理作業を最小限に抑えられる構成を優先する。<br>・全体のコストを最小限に抑える。"
  },
  scenario: "セキュリティ強化の一環として、MG-Manufacturing配下のサブスクリプションに対する管理者ロールの常時割り当てをなくし、必要なときにのみ一定時間だけ昇格できるようにする設計を検討しています。",
  question: "この要件を満たすために推奨される機能はどれですか?",
  choices: [
    "条件付きアクセスポリシー",
    "Microsoft Entra管理単位(Administrative Units)",
    "Microsoft Entra Privileged Identity Management (PIM)",
    "Azure Policyの拒否(Deny)効果"
  ],
  answer: 2,
  explanation: "Microsoft Entra Privileged Identity Management(PIM)は、Azureロール(サブスクリプションの所有者・共同作成者など)やMicrosoft Entraロールに対して「適格(Eligible)」という状態の割り当てを作成できる機能。適格な割り当ては通常は無効な状態で、ユーザーが実際に作業する必要があるときだけ、承認・多要素認証・理由の入力などを経て一定時間だけ「アクティブ化」し、時間が経過すると自動的に権限が失効する。これにより「常時割り当てをなくし、必要なときだけ一時的に昇格する」という要件を満たすことができる。<br><br>他の選択肢が誤りである理由:<br>- 条件付きアクセスポリシーは、サインイン時にMFAを要求する・特定の場所からのみ許可するなど「サインインの条件」を制御する仕組みであり、ロールの割り当てそのものを時限化する機能ではない。<br>- Azure Policyの拒否効果は、特定の種類のリソース作成やタグ不足などを拒否する仕組みであり、管理者ロールの割り当て自体を制御するものではない。<br>- Microsoft Entra管理単位(Administrative Units)は、ユーザーやグループなどのディレクトリオブジェクトを部門ごとに区切って委任管理するための機能であり、サブスクリプションに対するロールの時限的な昇格とは無関係。"
},
{
  domain: "ID・ガバナンス・監視",
  caseStudy: {
    title: "ケーススタディ: 月山工業株式会社",
    body: "<strong>会社概要</strong><br>・月山工業株式会社は、自動車部品向け精密部品を製造する従業員約1,200名の製造業。<br>・本社は東京にあり、生産拠点として大阪工場と名古屋工場を運営している。<br><br><strong>既存環境 - ID</strong><br>・オンプレミスに単一ドメインのActive Directory Domain Services(AD DS)を運用している。<br>・Microsoft Entra Connectのパスワードハッシュ同期を使用し、オンプレミスのユーザーアカウントをMicrosoft Entra IDへ同期済みである。<br><br><strong>既存環境 - Azureの管理グループとサブスクリプション</strong><br>・テナントのルート管理グループの直下に、MG-Corp、MG-Manufacturing、MG-Sandboxという3つの管理グループを作成済みである。<br>・MG-Corp配下にはSub-Corp-ProdとSub-Corp-Devの2つのサブスクリプションがある。<br>・MG-Manufacturing配下にはSub-Osaka、Sub-Nagoya、Sub-Sharedの3つのサブスクリプションがある。<br>・MG-Sandbox配下にはSub-Sandboxの1つのサブスクリプションがある。<br><br><strong>既存環境 - ネットワーク</strong><br>・日本東部リージョンに1つのハブVNetを配置しており、GatewaySubnetとAzureFirewallSubnetの2つのサブネットを持つ。<br>・Sub-Corp-Prod、Sub-Osaka、Sub-Nagoyaのそれぞれに1つずつ、合計3つのスポークVNetを作成し、各スポークVNetはハブVNetとのみピアリング接続している(スポークVNet同士は直接ピアリングしない)。<br>・各スポークVNetには、アプリケーション層用サブネットとデータベース層用サブネットの2つのサブネットを作成している。<br>・Sub-SharedとSub-Sandboxには現時点でVNetを作成していない。<br><br><strong>ガバナンス要件</strong><br>・ルート管理グループには、リソースの作成先を日本東部リージョンと日本西部リージョンのみに制限する「許可されるリソースの場所」ポリシーを1つ割り当て済みである。<br>・MG-Manufacturingには、(1)すべてのリソースにCostCenterタグを必須にするポリシーと、(2)仮想マシン作成時に診断設定を自動的に構成してLog Analyticsワークスペースへログを送信するDeployIfNotExists効果のポリシーの、合計2つを新たに割り当てる計画である。<br>・Sub-Osakaサブスクリプションには、サブスクリプション単位でパブリックIPアドレスの作成を拒否するポリシーを1つ、追加で割り当てる計画である。<br>・MG-Manufacturing配下の各サブスクリプションに対する管理者ロール(所有者・共同作成者など)は、常時割り当てられた状態をなくし、必要なときにのみ一定時間だけ昇格できるようにする必要がある。<br><br><strong>監視要件</strong><br>・全6サブスクリプションのリソースログとアクティビティログを、1つの中央Log Analyticsワークスペースに集約する。<br>・コンプライアンス担当者が過去90日分のログをKusto Query Language(KQL)で検索できるようにする。<br>・本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みを構築する。<br><br><strong>ビジネス要件</strong><br>・運用チームの人数が限られているため、管理作業を最小限に抑えられる構成を優先する。<br>・全体のコストを最小限に抑える。"
  },
  scenario: "MG-Manufacturingに割り当てるDeployIfNotExists効果のポリシー(仮想マシンの診断設定を自動構成し、Log Analyticsワークスペースへログを送信する)について、非準拠リソースへの修復タスクを構成しています。",
  question: "修復タスクが非準拠のリソースに対して診断設定のデプロイを実行できるようにするために、ポリシー割り当てに関連付ける必要があるものはどれですか?",
  choices: [
    "Azure Lighthouseの委任",
    "マネージドID",
    "共有アクセス署名(SAS)トークン",
    "サービスプリンシパルのクライアントシークレット"
  ],
  answer: 1,
  explanation: "DeployIfNotExists(DINE)やModify効果のAzure Policyは、条件に一致した非準拠のリソースに対して、ポリシー自身がAzure Resource Managerを通じてデプロイや変更を実行する。そのためには、ポリシー割り当てに何らかのIDを持たせ、そのIDにデプロイ先スコープで必要なロール(この場合は診断設定を構成する権限など)をRBACで付与しておく必要がある。Azure Policyでは、このIDとしてシステム割り当てマネージドIDまたはユーザー割り当てマネージドIDを使用する。マネージドIDはMicrosoft Entra ID上に自動的に作成される識別情報で、パスワードやシークレットを開発者が管理する必要がなく、修復タスクの実行時にAzureが自動的に認証トークンを取得して利用する仕組み。<br><br>他の選択肢が誤りである理由:<br>- サービスプリンシパルのクライアントシークレットは、アプリケーション登録に紐づく資格情報だが、シークレットの管理(保管・更新・失効)が別途必要になり、Azure Policyの修復タスクの認証方式としては使用しない。<br>- Azure Lighthouseの委任は、複数テナントにまたがってリソースを委任管理するための仕組みであり、単一テナント内のポリシー修復タスクの認証手段ではない。<br>- 共有アクセス署名(SAS)トークンは、Azure Storageなど特定のリソースへの限定的なアクセスを許可するための仕組みであり、ポリシーの修復タスクがARM操作を実行するための認証には使用されない。"
},
{
  domain: "ID・ガバナンス・監視",
  caseStudy: {
    title: "ケーススタディ: 月山工業株式会社",
    body: "<strong>会社概要</strong><br>・月山工業株式会社は、自動車部品向け精密部品を製造する従業員約1,200名の製造業。<br>・本社は東京にあり、生産拠点として大阪工場と名古屋工場を運営している。<br><br><strong>既存環境 - ID</strong><br>・オンプレミスに単一ドメインのActive Directory Domain Services(AD DS)を運用している。<br>・Microsoft Entra Connectのパスワードハッシュ同期を使用し、オンプレミスのユーザーアカウントをMicrosoft Entra IDへ同期済みである。<br><br><strong>既存環境 - Azureの管理グループとサブスクリプション</strong><br>・テナントのルート管理グループの直下に、MG-Corp、MG-Manufacturing、MG-Sandboxという3つの管理グループを作成済みである。<br>・MG-Corp配下にはSub-Corp-ProdとSub-Corp-Devの2つのサブスクリプションがある。<br>・MG-Manufacturing配下にはSub-Osaka、Sub-Nagoya、Sub-Sharedの3つのサブスクリプションがある。<br>・MG-Sandbox配下にはSub-Sandboxの1つのサブスクリプションがある。<br><br><strong>既存環境 - ネットワーク</strong><br>・日本東部リージョンに1つのハブVNetを配置しており、GatewaySubnetとAzureFirewallSubnetの2つのサブネットを持つ。<br>・Sub-Corp-Prod、Sub-Osaka、Sub-Nagoyaのそれぞれに1つずつ、合計3つのスポークVNetを作成し、各スポークVNetはハブVNetとのみピアリング接続している(スポークVNet同士は直接ピアリングしない)。<br>・各スポークVNetには、アプリケーション層用サブネットとデータベース層用サブネットの2つのサブネットを作成している。<br>・Sub-SharedとSub-Sandboxには現時点でVNetを作成していない。<br><br><strong>ガバナンス要件</strong><br>・ルート管理グループには、リソースの作成先を日本東部リージョンと日本西部リージョンのみに制限する「許可されるリソースの場所」ポリシーを1つ割り当て済みである。<br>・MG-Manufacturingには、(1)すべてのリソースにCostCenterタグを必須にするポリシーと、(2)仮想マシン作成時に診断設定を自動的に構成してLog Analyticsワークスペースへログを送信するDeployIfNotExists効果のポリシーの、合計2つを新たに割り当てる計画である。<br>・Sub-Osakaサブスクリプションには、サブスクリプション単位でパブリックIPアドレスの作成を拒否するポリシーを1つ、追加で割り当てる計画である。<br>・MG-Manufacturing配下の各サブスクリプションに対する管理者ロール(所有者・共同作成者など)は、常時割り当てられた状態をなくし、必要なときにのみ一定時間だけ昇格できるようにする必要がある。<br><br><strong>監視要件</strong><br>・全6サブスクリプションのリソースログとアクティビティログを、1つの中央Log Analyticsワークスペースに集約する。<br>・コンプライアンス担当者が過去90日分のログをKusto Query Language(KQL)で検索できるようにする。<br>・本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みを構築する。<br><br><strong>ビジネス要件</strong><br>・運用チームの人数が限られているため、管理作業を最小限に抑えられる構成を優先する。<br>・全体のコストを最小限に抑える。"
  },
  scenario: "全6サブスクリプションのリソースログとアクティビティログを1つの中央Log Analyticsワークスペースに集約する監視要件があります。",
  question: "各サブスクリプションのリソースからログを中央のLog Analyticsワークスペースへ送信するために、リソースごとに構成する必要があるものはどれですか?",
  choices: [
    "Azure Advisorの推奨事項",
    "診断設定",
    "Azure Monitorのブック",
    "Log Analyticsのソリューションギャラリー"
  ],
  answer: 1,
  explanation: "Azure Monitorの<strong>診断設定(Diagnostic settings)</strong>は、リソースログ(リソース固有のログ)・メトリック・(サブスクリプションレベルでは)アクティビティログの送信先を指定する構成で、Log Analyticsワークスペース、Azure Storage、Event Hubsなどを送信先として選べる。中央のLog Analyticsワークスペースにログを集約するには、対象となる各リソース(仮想マシン、Key Vault、データベースなど)、および各サブスクリプションのアクティビティログに対して診断設定を作成し、送信先を同じ1つのワークスペースに揃える必要がある。<br><br>他の選択肢が誤りである理由:<br>- Azure Monitorのブック(Workbooks)は、収集済みのログやメトリックを組み合わせて可視化するダッシュボード機能であり、ログの収集経路そのものを構成する機能ではない。<br>- Log Analyticsのソリューションギャラリーは、特定用途向けの分析ソリューション(モニタリングソリューション)を追加する仕組みで、リソースからのログ送信経路を構成するものではない。<br>- Azure Advisorの推奨事項は、コスト・信頼性・パフォーマンスなどの観点でベストプラクティスを提案する機能であり、ログの集約構成には関与しない。"
},
{
  domain: "ID・ガバナンス・監視",
  caseStudy: {
    title: "ケーススタディ: 月山工業株式会社",
    body: "<strong>会社概要</strong><br>・月山工業株式会社は、自動車部品向け精密部品を製造する従業員約1,200名の製造業。<br>・本社は東京にあり、生産拠点として大阪工場と名古屋工場を運営している。<br><br><strong>既存環境 - ID</strong><br>・オンプレミスに単一ドメインのActive Directory Domain Services(AD DS)を運用している。<br>・Microsoft Entra Connectのパスワードハッシュ同期を使用し、オンプレミスのユーザーアカウントをMicrosoft Entra IDへ同期済みである。<br><br><strong>既存環境 - Azureの管理グループとサブスクリプション</strong><br>・テナントのルート管理グループの直下に、MG-Corp、MG-Manufacturing、MG-Sandboxという3つの管理グループを作成済みである。<br>・MG-Corp配下にはSub-Corp-ProdとSub-Corp-Devの2つのサブスクリプションがある。<br>・MG-Manufacturing配下にはSub-Osaka、Sub-Nagoya、Sub-Sharedの3つのサブスクリプションがある。<br>・MG-Sandbox配下にはSub-Sandboxの1つのサブスクリプションがある。<br><br><strong>既存環境 - ネットワーク</strong><br>・日本東部リージョンに1つのハブVNetを配置しており、GatewaySubnetとAzureFirewallSubnetの2つのサブネットを持つ。<br>・Sub-Corp-Prod、Sub-Osaka、Sub-Nagoyaのそれぞれに1つずつ、合計3つのスポークVNetを作成し、各スポークVNetはハブVNetとのみピアリング接続している(スポークVNet同士は直接ピアリングしない)。<br>・各スポークVNetには、アプリケーション層用サブネットとデータベース層用サブネットの2つのサブネットを作成している。<br>・Sub-SharedとSub-Sandboxには現時点でVNetを作成していない。<br><br><strong>ガバナンス要件</strong><br>・ルート管理グループには、リソースの作成先を日本東部リージョンと日本西部リージョンのみに制限する「許可されるリソースの場所」ポリシーを1つ割り当て済みである。<br>・MG-Manufacturingには、(1)すべてのリソースにCostCenterタグを必須にするポリシーと、(2)仮想マシン作成時に診断設定を自動的に構成してLog Analyticsワークスペースへログを送信するDeployIfNotExists効果のポリシーの、合計2つを新たに割り当てる計画である。<br>・Sub-Osakaサブスクリプションには、サブスクリプション単位でパブリックIPアドレスの作成を拒否するポリシーを1つ、追加で割り当てる計画である。<br>・MG-Manufacturing配下の各サブスクリプションに対する管理者ロール(所有者・共同作成者など)は、常時割り当てられた状態をなくし、必要なときにのみ一定時間だけ昇格できるようにする必要がある。<br><br><strong>監視要件</strong><br>・全6サブスクリプションのリソースログとアクティビティログを、1つの中央Log Analyticsワークスペースに集約する。<br>・コンプライアンス担当者が過去90日分のログをKusto Query Language(KQL)で検索できるようにする。<br>・本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みを構築する。<br><br><strong>ビジネス要件</strong><br>・運用チームの人数が限られているため、管理作業を最小限に抑えられる構成を優先する。<br>・全体のコストを最小限に抑える。"
  },
  scenario: "本番環境で稼働する重要な仮想マシンが誤って削除された場合、管理者に即座にメール通知する仕組みが必要です。",
  question: "この要件を満たすために、Azure Monitorで構成すべきアラートの種類はどれですか?",
  choices: [
    "スマート検出アラート",
    "アクティビティログのアラートルール",
    "メトリックアラートルール",
    "ログ検索アラートルール"
  ],
  answer: 1,
  explanation: "<strong>アクティビティログのアラートルール</strong>は、サブスクリプション内で発生した特定の管理操作(リソースの作成・更新・削除など、いわゆるコントロールプレーンのイベント)を対象に、そのイベントが発生した時点でほぼリアルタイムに評価・通知されるアラート。仮想マシンの削除操作(Microsoft.Compute/virtualMachines/delete)を条件に指定すれば、削除が実行された直後にアクション グループ経由で管理者へメール通知できる。「誤って削除された場合に即座に通知する」という要件に最も適合する。<br><br>他の選択肢が誤りである理由:<br>- メトリックアラートルールは、CPU使用率やディスクIOPSなど数値化されたテレメトリのしきい値超過を検知する仕組みであり、「リソースが削除された」というコントロールプレーンの操作イベントは対象にしない。<br>- ログ検索アラートルール(Log Analyticsのログクエリベースのアラート)は、収集済みのログに対してKQLクエリを定期的な間隔(例: 5分ごと)で評価する方式のため、ログが取り込まれ評価が実行されるまでにある程度の遅延が生じ、削除操作に対する「即座の」通知としてはアクティビティログのアラートルールに劣る。<br>- スマート検出アラートは、Application Insightsが収集したアプリケーションのパフォーマンスや例外率の異常を機械学習的に検出する機能であり、仮想マシンの削除操作の検知には使用しない。<br><br><div class='exp-diagram'><div class='exp-diagram-title'>アラート種類の比較</div><div class='exp-compare'><div class='cmp-col'><div class='cmp-head'>アクティビティログ アラート</div><div>対象: 管理操作(作成/削除等)</div><div>検知速度: ほぼリアルタイム</div></div><div class='cmp-col'><div class='cmp-head'>メトリックアラート</div><div>対象: 数値テレメトリ</div><div>検知速度: 短い間隔で評価</div></div><div class='cmp-col'><div class='cmp-head'>ログ検索アラート</div><div>対象: KQLクエリ結果</div><div>検知速度: 定期評価(遅延あり)</div></div></div></div>"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "PIMでロールをアクティブ化する際、常に多要素認証と準拠デバイスからのアクセスを要求したいと考えています。",
  question: "この要件を実現するために、PIMのロール設定に加えて何を構成しますか?",
  choices: [
    "Log Analyticsのアラートルール",
    "ロールのアクティブ化に適用する条件付きアクセスポリシー",
    "Azure Policyのイニシアチブ",
    "リソースロック"
  ],
  answer: 1,
  explanation: "PIM自体もアクティブ化時のMFA要求を設定できますが、「準拠デバイスからのアクセス」はConditional Accessのグラント制御の1つです。ロールのアクティブ化に伴うサインインイベントを対象にした条件付きアクセスポリシーを併用することで、MFaに加えて準拠デバイスであることも要求できます。Policyイニシアチブはリソース構成のガバナンスであり、サインイン条件は扱いません。リソースロックやMonitorのアラートルールもこの要件とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "特権ロールの割り当て状況について、過去の変更履歴を確認できるようにし、さらに定期的に割り当ての正当性を確認して不要なものを取り消せるようにしたいと考えています。",
  question: "使用する機能を2つ選択してください。",
  choices: [
    "タグポリシー",
    "監査履歴",
    "アクセスレビュー",
    "リソースロック"
  ],
  answer: [1,2],
  explanation: "PIMの監査履歴は、ロール割り当てや有効化に関するすべてのイベントの過去の記録を確認できます。アクセスレビューは、レビュー担当者が定期的に各割り当ての継続的な必要性を確認し、承認または取り消しを行う繰り返しのワークフローを提供します。リソースロックはリソースの削除/変更防止機能であり、タグポリシーはタグに関するガバナンスであり、いずれも特権ロール割り当ての監査・見直しとは関係ありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "詳細な診断ログを大量に取り込みつつ、次の両方でコストを最小化したいと考えています。<br>・取り込み(インジェスト)コストを抑えたい。ログはまれにしか検索されない。<br>・法規制により2年間の保持が必要だが、90日を超えるデータへのアクセス頻度は極めて低い。",
  question: "構成すべき設定を2つ選択してください。",
  choices: [
    "アーカイブ層への保持期間延長",
    "Sentinelの有効化",
    "Analyticsテーブルプランへの変更",
    "Basic Logsテーブルプラン"
  ],
  answer: [0,3],
  explanation: "Basic Logsはテーブルごとに選べる低コストの取り込みプランで、大量かつ低頻度アクセスのログの取り込みコストを大きく下げられます。アーカイブ層は対話型保持期間を超えたデータの保存コストを下げつつ、必要な総保持期間(2年間)を満たすための設定です。この2つを組み合わせることで取り込みと長期保持の両方のコストを最適化できます。Analyticsプランはフル機能・フル価格であり、コスト最適化の目的とは逆です。Sentinelの有効化はSIEM機能を追加するものでログの保存/取り込みコストを下げるものではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Fabrikam社のAzureサブスクリプションには、Log Analyticsワークスペース「WorkspaceA」と「WorkspaceB」があります。<br>・WorkspaceAは、ExpressRoute経由で接続されたオンプレミスのネットワークからのみアクセスできるようにし、インターネットからのアクセスは完全に遮断したい<br>・WorkspaceBは、これまでどおりインターネット経由でもアクセスできる状態を維持したい",
  question: "両方の要件を満たすために取るべき対応はどれですか?",
  choices: [
    "WorkspaceAのみをAMPLSのスコープに登録してPrivate Endpointを構成し、WorkspaceAのパブリックネットワークアクセスを無効にする。WorkspaceBはAMPLSに登録しない",
    "2つのワークスペースを1つに統合したうえでAMPLSを構成する",
    "WorkspaceBを削除し、WorkspaceAのみを残す",
    "WorkspaceAとWorkspaceBの両方を同じAMPLSのスコープに登録し、AMPLS全体でパブリックアクセスを無効にする"
  ],
  answer: 0,
  explanation: "AMPLSは、明示的にスコープとして登録したリソースにのみ影響します。<strong>WorkspaceAだけをAMPLSのスコープに登録</strong>してPrivate Endpointを構成し、WorkspaceA自体のパブリックネットワークアクセスを無効にすれば、WorkspaceAはオンプレミスからのプライベート経路のみでアクセス可能になります。一方、<strong>WorkspaceBはAMPLSに登録しない</strong>ため何の影響も受けず、既存どおりインターネット経由のアクセスを維持できます。<br><br>両方を同じAMPLSに登録してAMPLS全体でパブリックアクセスを無効にすると、WorkspaceBもインターネットからアクセスできなくなり、WorkspaceBの要件に反します。2つのワークスペースを統合する方法は、要件で求められていない不要なデータ移行・アプリケーション側の変更を伴い、過剰な対応です。WorkspaceBを削除する方法は、WorkspaceBのデータ・機能そのものを失うため要件を満たしません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "本番仮想マシンについて、次の両方を実現したいと考えています。<br>・削除された場合にすぐに通知を受け取る。<br>・後から、誰がいつ削除操作を実行したかを調査できるようにする。",
  question: "実装すべき項目を2つ選択してください。",
  choices: [
    "Azure Backupの有効化",
    "アクティビティログをLog Analyticsへ送信する診断設定",
    "「仮想マシンの削除」操作を対象としたアクティビティログアラート",
    "Traffic Managerプロファイルの作成"
  ],
  answer: [1,2],
  explanation: "「仮想マシンの削除」操作を対象としたアクティビティログアラートは、削除発生時にほぼリアルタイムで通知します。一方、アラート通知自体は長期的に検索可能な記録を提供しないため、後から誰がいつ削除したかを調査できるようにするには、アクティビティログをLog Analyticsワークスペースへ送信する診断設定を構成し、KQLで検索可能な形で保持しておく必要があります。Azure Backupはデータの復元用でありVMリソース自体の削除イベントの検知・監査とは異なります。Traffic Managerはトラフィックルーティングのサービスであり、この要件とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "AMPLS(Azure Monitor プライベートリンクスコープ)の仕組みについて確認しています。",
  question: "正しい説明を2つ選択してください。",
  choices: [
    "AMPLSを利用するには、スコープに含めるLog Analyticsワークスペースごとに個別のPrivate Endpointを作成する必要がある",
    "1つのAMPLSに、複数のLog AnalyticsワークスペースやApplication Insightsリソースをスコープとして関連付けられる",
    "AMPLSはAzure Kubernetes Service (AKS) の監視データにのみ使用できる専用リソースである",
    "AMPLSに対して作成した1つのPrivate Endpointは、そのAMPLSにスコープとして登録された全てのリソースへのプライベート接続を提供する"
  ],
  answer: [1,3],
  explanation: "AMPLSは、複数の監視リソース(Log Analyticsワークスペース・Application Insights)を1つの「スコープ」としてまとめて登録できる点が最大の特徴です。VNetごとに作成する1つのPrivate Endpointは、個々のワークスペースに紐づくのではなく<strong>AMPLS(スコープ)に紐づく</strong>ため、そのAMPLSにスコープ登録された全てのリソースへ、追加のPrivate Endpointを作らずにプライベート接続できます。<br><br>「ワークスペースごとに個別のPrivate Endpointが必要」という説明は、AMPLSの目的(Private Endpointの数を減らし運用負荷を抑えること)そのものと矛盾するため誤りです。AMPLSはAKS専用の機能ではなく、Log AnalyticsワークスペースやApplication Insightsを使うあらゆるシナリオで利用できる汎用のリソースです。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "order",
  scenario: "Azure Policy(DeployIfNotExists効果)を使用して、非準拠のリソースに対して自動的に修復を行う一連の流れを考えます。",
  question: "正しい順序に並べ替えてください。",
  choices: [
    "修復タスクを作成する",
    "Azure Policyが対象リソースの準拠状態を評価する",
    "マネージドIDがテンプレートをデプロイして準拠状態にする",
    "マネージドIDを指定してポリシーを割り当てる"
  ],
  answer: [3,1,0,2],
  explanation: "まずマネージドID(および必要なロール)を指定してDeployIfNotExists効果を持つポリシーを割り当てます。次にAzure Policyが対象スコープ内のリソースの準拠状態を評価します。非準拠と判定されたリソースに対しては修復タスクを作成します(自動トリガーまたは手動トリガー)。最後に、マネージドIDが付与された権限を使って指定のテンプレート/リソースをデプロイし、リソースが準拠状態になります。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "使用中のAzureリージョンで予定されているメンテナンス作業について、事前に通知を受け取りたいと考えています。",
  question: "何を使用しますか?",
  choices: [
    "Azure Advisor",
    "Azure Policy",
    "Azure Service Health",
    "Microsoft Sentinel"
  ],
  answer: 2,
  explanation: "Service Healthは、自分が利用しているサブスクリプション・リージョン・サービスに影響するAzureプラットフォームの障害、計画メンテナンス、健全性アドバイザリを追跡し、これらに対するアラートを構成できます。Advisorはリソース構成に対する推奨事項であり、プラットフォームイベントの通知ではありません。Policyはガバナンス/コンプライアンスの仕組みです。Sentinelはセキュリティ向けSIEMです。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "DeployIfNotExists効果を持つAzure Policyの割り当てを作成し、修復タスクが正しく動作するように構成しています。",
  question: "ポリシー割り当ての作成時に指定する必要がある項目を2つ選択してください。",
  choices: [
    "リソースロックの種類",
    "ポリシーの適用除外理由",
    "マネージドIDの種類(システム/ユーザー割り当て)",
    "マネージドIDに付与するロール定義"
  ],
  answer: [2,3],
  explanation: "DeployIfNotExists(またはModify)効果を持つポリシーを割り当てる際は、修復タスクを実行するマネージドIDの種類(システム割り当て/ユーザー割り当て)を選択し、そのIDに割り当てスコープで付与するロール定義(対象リソースをデプロイ/変更できるだけの権限)を指定する必要があります。適用除外理由は、後から特定のリソースを除外する際にのみ使う項目です。リソースロックの種類はポリシーの修復設定とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "コストを部門ごとに分類し、レポートを作成したいと考えています。また、環境(本番/開発)ごとにリソースをフィルタリングできるようにしたいと考えています。",
  question: "何を使用しますか?",
  choices: [
    "診断設定",
    "管理グループ名",
    "タグ",
    "リソースロック"
  ],
  answer: 2,
  explanation: "タグはリソース/リソースグループ/サブスクリプションに付与できるキーと値のメタデータで、Cost Managementではタグ単位でのコスト集計・レポートが可能なほか、環境(env=prod/devなど)による分類・フィルタリングにも使えます。リソースロックは削除/変更防止の機能です。管理グループ名はスコープ階層の識別には使えますが、リソース単位での柔軟な分類には向きません。診断設定はログのルーティングであり分類とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "重大なアラートが発生した際、担当者の携帯電話に音声通話で即座に連絡したいと考えています。",
  question: "アクショングループにどの通知の種類を追加しますか?",
  choices: [
    "SMS",
    "メール",
    "音声",
    "プッシュ通知"
  ],
  answer: 2,
  explanation: "アクショングループの通知の種類には音声・SMS・メール・Azureアプリへのプッシュ通知などがあります。「音声通話で即座に」という要件には音声(Voice)通知が直接対応します。メールは確認が遅れる可能性があり即時性に欠けます。SMSはテキストのみで通話ではありません。プッシュ通知はAzureモバイルアプリがインストールされ、サインインしている場合にのみ有効です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Contoso社は、複数のAzureリージョンにまたがる10個のLog Analyticsワークスペースと5個のApplication Insightsリソースを運用しています。<br>・すべてのワークスペースとApplication Insightsへのアクセスをプライベートネットワーク経由に限定したい<br>・ワークスペースごとに個別のPrivate Endpointを作成・管理する運用負荷は避けたい",
  question: "この要件を満たすために使用すべきリソースはどれですか?",
  choices: [
    "Azure Firewall",
    "Azure Bastion",
    "Network Security Group (NSG)",
    "Azure Monitor プライベートリンクスコープ (AMPLS)"
  ],
  answer: 3,
  explanation: "<strong>Azure Monitor プライベートリンクスコープ(AMPLS)</strong>は、複数のLog AnalyticsワークスペースやApplication Insightsリソースを1つの「スコープ」としてまとめて登録できるリソースです。AMPLSに対して(VNetごとに)1つのPrivate Endpointを作成するだけで、そのAMPLSにスコープとして登録した全てのワークスペース・Application Insightsへプライベートに接続できるようになります。ワークスペースの数だけPrivate Endpointを個別に作る必要がないため、多数の監視リソースを扱う環境でも運用負荷を抑えられます。<br><br>NSGはサブネット/NIC単位の通信許可・拒否ルールであり、Log AnalyticsやApplication Insightsへの経路そのものをプライベート化する機能ではありません。Azure BastionはVMへの安全なリモート接続用のサービス、Azure Firewallはネットワーク全体の送受信トラフィックを検査・制御するファイアウォールサービスであり、いずれも今回の要件(監視リソースへのプライベートアクセスの一元化)には直接関係しません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "使用率が著しく低い仮想マシンSKUを特定し、コスト削減のためにサイズ変更を推奨してほしいと考えています。",
  question: "何を使用しますか?",
  choices: [
    "Azure Service Health",
    "Azure Advisor",
    "Microsoft Sentinel",
    "Azure Monitorアラート"
  ],
  answer: 1,
  explanation: "Advisorはリソースの構成と使用状況のテレメトリを分析し、コスト・信頼性・セキュリティ・運用の優秀性・パフォーマンスの各観点でパーソナライズされた推奨事項を提示します。使用率の低い仮想マシンのサイズ変更推奨はコストカテゴリの典型例です。Service HealthはAzureプラットフォーム側の障害・メンテナンス情報であり、自分のリソースのコスト効率とは無関係です。Monitorアラートは自分で定義した条件の通知であり、能動的な推奨提示ではありません。Sentinelはセキュリティ向けのSIEMです。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "セキュリティ監査ログを7年間保持する必要がありますが、過去90日を超えるデータへの問い合わせはまれで、コストを抑えたいと考えています。",
  question: "90日を超えるデータに何を設定しますか?",
  choices: [
    "Sentinelの有効化",
    "Basic Logsへの変更",
    "アーカイブ層への移行",
    "診断設定の削除"
  ],
  answer: 2,
  explanation: "Log Analyticsの対話型保持は即座にクエリ可能な期間で、コストが高くなります。アーカイブ層に移すと、データを保持したまま(最長12年程度まで)低コストで保管でき、まれなアクセスは検索ジョブや期間の復元によって対応できます。Basic Logsは取り込み時点のプラン選択であり、既に取り込んだデータの長期保持コストを直接解決するものではありません。Sentinelの有効化は保持コストの管理とは無関係です。診断設定を削除すると新しいデータの流入が止まるだけで、保持要件は満たせません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "本番データベースが完全に利用できない状態を検知するアラートルールを作成しています。この事象は即時対応が必要な最重要事象です。",
  question: "どの重大度を設定しますか?",
  choices: [
    "Sev 4",
    "Sev 2",
    "Sev 0",
    "Sev 1"
  ],
  answer: 2,
  explanation: "Azure Monitorのアラート重大度はSev 0(重大)からSev 4(詳細)まで5段階あります。Sev 0は即時対応が必要な最重要事象(サービス完全停止など)に使用します。Sev 1はエラー(重大だが即時性はやや劣る)、Sev 2は警告、Sev 4は情報レベルの詳細ログに相当し、いずれも完全停止のような最重要事象には不十分な重大度です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組織は、本番環境と非本番環境で異なるガバナンスルール(許可されるリージョンやSKUなど)を適用したいと考えています。",
  question: "最初に何を設計する必要がありますか?",
  choices: [
    "環境ごとに分けた管理グループ階層",
    "単一のリソースグループへの統合",
    "すべてのサブスクリプションを1つの管理グループに統合",
    "各リソースへの個別ロック"
  ],
  answer: 0,
  explanation: "本番用・非本番用など環境ごとに管理グループを分けて設計すれば、各管理グループに異なるポリシーを割り当て、配下のサブスクリプションを該当する管理グループに移動するだけでルールが自動的に継承されます。リソースグループはサブスクリプションを格納できないため統合先にはなりません。すべてを1つの管理グループにまとめてしまうと環境ごとの差別化ができなくなります。個々のリソースロックは削除/変更のブロックであり、ガバナンスルールの適用範囲設計とは異なります。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "パブリックに公開しているWebアプリケーションが、世界中の複数の地点から常に外部アクセス可能かどうかを定期的に確認し、ダウンタイムを検知したいと考えています。",
  question: "Application Insightsの何を使用しますか?",
  choices: [
    "ライブメトリック",
    "スマート検出",
    "可用性テスト",
    "アプリケーションマップ"
  ],
  answer: 2,
  explanation: "可用性テスト(標準テスト)は、世界中の複数のポイントから定期的に外部到達性を確認する合成監視で、一定割合の地点で失敗した場合にダウンタイムとして検知・アラートできます(旧来のURL PingテストやマルチステップテストはWeb Testレコーダーとともに順次廃止され、現在は標準テストへの一本化が進められています)。スマート検出は失敗率の急上昇などテレメトリのパターンを自動分析する機能で、外部からの疎通確認ではありません。アプリケーションマップはコンポーネント間の依存関係を可視化するものです。ライブメトリックはアプリ内部の準リアルタイムテレメトリのストリーミングであり、外部からの可用性確認ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "組織はMicrosoft Sentinelを新規に有効化し、Microsoft 365やファイアウォールなどのログソースを取り込みたいと考えています。",
  question: "Sentinelを有効化する前提として必要な要素を2つ選択してください。",
  choices: [
    "Recovery Servicesコンテナー",
    "Application Insightsリソース",
    "データコネクタの構成",
    "Log Analyticsワークスペース"
  ],
  answer: [2,3],
  explanation: "Sentinelは既存または新規のLog Analyticsワークスペース上に展開されるソリューションであり、単独のリソースではありません。さらにMicrosoft 365やファイアウォールなどの実際のログソースを取り込むには、それぞれに対応するデータコネクタを構成する必要があります。Application Insightsはアプリケーションテレメトリ専用で、Sentinelの前提要素ではありません。Recovery ServicesコンテナーはBackup/Site Recovery用であり無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "規制要件により、リソースログを最低10年間、改ざん耐性を持たせた形で保持する必要があります。頻繁にクエリする必要はありません。",
  question: "診断設定のログ送信先として何を選択しますか?",
  choices: [
    "不変ポリシー付きのAzure Storageアカウント",
    "Log Analyticsワークスペース",
    "Application Insights",
    "Event Hub"
  ],
  answer: 0,
  explanation: "Storageアカウントは長期・低コストのアーカイブに適しており、不変性ポリシー(WORM)を設定することで規制が求める改ざん耐性を満たせます。Log Analyticsの保持期間には上限があり(対話型+アーカイブを合わせても一般的に最長12年程度)、コストも高く、不変ポリシーのような機能もありません。Event Hubはストリーミング配信用であり保存先ではありません。Application Insightsはアプリケーションテレメトリ専用のサービスです。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "あるユーザーに、Microsoft Entra IDでユーザーアカウントを作成・管理する権限を付与する必要があります。Azureリソース(仮想マシンやストレージなど)への権限は不要です。",
  question: "何を使用して権限を付与しますか?",
  choices: [
    "Microsoft Entra IDのロール(ユーザー管理者など)",
    "Azure RBACのロール(共同作成者など)",
    "Azure Policy",
    "リソースロック"
  ],
  answer: 0,
  explanation: "Microsoft Entra IDのロール(ユーザー管理者、グローバル管理者など)はディレクトリレベルの操作(ユーザー/グループオブジェクトの作成・管理など)を制御する、Azure RBACとは別個の権限体系です。Azure RBACのロールはAzureリソース(サブスクリプション/リソースグループ/リソース)へのアクセスを扱うもので、ディレクトリのユーザー管理権限は付与しません。PolicyやリソースロックもID管理の権限付与とは関係ありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "現在、仮想マシンでLog Analyticsエージェント(MMA/OMS)を使用してログを収集していますが、このエージェントは非推奨(廃止予定)になったと知りました。",
  question: "移行先として何を推奨しますか?",
  choices: [
    "Network Watcherエージェント",
    "Microsoft Defenderエージェント",
    "Application Insights SDK",
    "Azure Monitor Agent (AMA)"
  ],
  answer: 3,
  explanation: "Azure Monitor Agent (AMA)は、廃止が予定されているレガシーなLog Analyticsエージェント(MMA/OMSエージェント)の後継で、データ収集ルールを使った統一的な収集方式により拡張性・セキュリティが向上しています。Application Insights SDKはアプリケーションコードに組み込む計測用SDKで、OSレベルのログ/パフォーマンス収集の代替にはなりません。Network Watcherはネットワーク診断用、Defenderエージェントはセキュリティ体制のためのものであり、いずれも汎用ログ収集エージェントの置き換えではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組織には10個のサブスクリプションがあり、すべてのサブスクリプションで一貫してリソースへのタグ付けルールを強制したいと考えています。サブスクリプションごとに個別にポリシーを割り当てる作業は避けたいと考えています。",
  question: "ポリシーをどのスコープに割り当てますか?",
  choices: [
    "個々のリソース",
    "個々のサブスクリプション",
    "個々のリソースグループ",
    "管理グループ"
  ],
  answer: 3,
  explanation: "10個のサブスクリプションすべてを含む管理グループにポリシーを割り当てると、その配下のすべてのサブスクリプション・リソースグループ・リソースに1回の割り当てで自動的に継承されます。個々のサブスクリプション、リソースグループ、リソースへの割り当ては、対象数だけ繰り返し作業が必要になり、まさに避けたい手間そのものです。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "オンプレミスのActive DirectoryはMicrosoft Entra Connectを使用してMicrosoft Entra IDと同期されています。新入社員のアカウントがオンプレミスADで作成されると、その従業員が使用するSaaSアプリケーション(SCIM 2.0対応)にも自動的にユーザーアカウントを作成したいと考えています。",
  question: "何を構成する必要がありますか?",
  choices: [
    "条件付きアクセスポリシー",
    "Microsoft Entra Connect Health",
    "Privileged Identity Management",
    "エンタープライズアプリケーションの自動プロビジョニング"
  ],
  answer: 3,
  explanation: "Microsoft Entra IDのエンタープライズアプリケーションには、SCIM 2.0に対応した外部SaaSアプリへユーザーアカウントを自動的に作成・更新・無効化する「自動プロビジョニング」機能があります。オンプレADで作成されたアカウントがEntra Connectで同期されEntra IDに反映されると、このプロビジョニング機能が対象アプリへ自動的にアカウントを作成します。条件付きアクセスはサインイン条件の制御であり、アカウントの作成は行いません。PIMは特権ロールの時限昇格の仕組みです。Entra Connect Healthは同期の稼働状況を監視するものであり、プロビジョニング自体は行いません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "定期的に、特権ロールの割り当てが依然として正当かどうかを見直し、不要なアクセスを取り消したいと考えています。",
  question: "PIMのどの機能を使用しますか?",
  choices: [
    "アクセスレビュー",
    "監査履歴のみ",
    "通知設定のみ",
    "承認ワークフローのみ"
  ],
  answer: 0,
  explanation: "アクセスレビューは、対象資格/アクティブな特権ロール割り当てについて、レビュー担当者(本人または他の担当者)が定期的に必要性を確認し、不要な割り当てを取り消せる仕組みです。監査履歴は過去の操作の記録を見るだけでレビュー・取り消しのワークフローは提供しません。承認ワークフローは個々の有効化リクエストの承認を扱うもので、定期的な棚卸しとは目的が異なります。通知設定は情報を知らせるだけでレビューは実行しません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "本番環境の仮想マシンが誤って削除された場合に、運用チームへ速やかに通知したいと考えています。",
  question: "何を構成する必要がありますか?",
  choices: [
    "CPU使用率のメトリックアラート",
    "「仮想マシンの削除」操作を対象としたアクティビティログアラート",
    "Azure Policyの監査効果",
    "Azure Advisorの推奨事項"
  ],
  answer: 1,
  explanation: "アクティビティログには、リソースの作成・更新・削除などのコントロールプレーン操作がすべて記録されます。アクティビティログアラートは、「Microsoft.Compute/virtualMachines/delete」のような特定の操作シグネチャを対象に構成でき、削除操作が発生した時点でほぼリアルタイムに通知できます。メトリックアラートはCPUなどの数値テレメトリを監視するものであり、削除イベントそのものは検知できません。Advisorは構成上の推奨事項を提示するだけでリアルタイム通知機能ではありません。Policyの監査効果は非準拠を記録するだけで、削除操作の通知は行いません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "特定の1台の仮想マシンが正常に動作しているかどうか(基盤のAzureプラットフォームの問題によるものかどうかを含めて)を個別に確認したいと考えています。",
  question: "何を確認しますか?",
  choices: [
    "Azure Advisor",
    "アクティビティログ",
    "Service Health",
    "Resource Health"
  ],
  answer: 3,
  explanation: "Resource Healthは個々のリソースインスタンスの現在および過去の健全性状態を示し、プラットフォーム起因の問題かユーザー起因の問題かを区別して表示します。Service Healthはサービス/リージョン単位の広範な問題を扱い、個別リソース1台の健全性を示すものではありません。Advisorは構成上の推奨事項です。アクティビティログはコントロールプレーン操作の記録であり、現在のリアルタイムな健全性状態を示すものではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Azure Policyの割り当て(DeployIfNotExists効果)を使用して、非準拠の仮想マシンに対してLog Analytics拡張機能を自動デプロイする修復タスクを構成しています。修復タスクの実行に使用するマネージドIDには適切なロールを付与する必要があります。",
  question: "マネージドIDに付与すべきロールはどれですか?",
  choices: [
    "閲覧者",
    "仮想マシン共同作成者",
    "課金閲覧者",
    "セキュリティ閲覧者"
  ],
  answer: 1,
  explanation: "DeployIfNotExists効果による修復は、対象リソースに拡張機能をデプロイ(書き込み)する操作を伴うため、マネージドIDには実際にその変更を行うだけの権限、この場合は仮想マシン共同作成者のような書き込み系ロールが必要です。閲覧者ロールは読み取り専用のため、修復タスクはアクセス拒否で失敗します。課金閲覧者やセキュリティ閲覧者も読み取り専用の別領域のロールであり、仮想マシンへのデプロイ権限を持ちません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "特定のSKU以外の仮想マシンのデプロイを完全にブロックしたいと考えています。デプロイ自体を拒否する必要があります。",
  question: "どのポリシー効果を使用しますか?",
  choices: [
    "Audit",
    "AuditIfNotExists",
    "DeployIfNotExists",
    "Deny"
  ],
  answer: 3,
  explanation: "Deny効果は、ポリシールールに違反するリソースの書き込み/デプロイそのものをブロックします。Audit・AuditIfNotExistsは非準拠をコンプライアンスレポート上でフラグ付けするだけでデプロイ自体は止めません。DeployIfNotExistsは元のデプロイ後に関連リソースを追加でデプロイする効果であり、元のデプロイをブロックする機能ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "Azureリソースの診断ログについて、次の両方の要件を満たす必要があります。<br>・監査目的で7年間、低コストで保持する。<br>・社内の非Azure製SIEMツールへほぼリアルタイムでストリーミング配信する。",
  question: "診断設定の送信先として構成すべきものを2つ選択してください。",
  choices: [
    "Log Analyticsワークスペース",
    "Application Insights",
    "Azure Storageアカウント",
    "Event Hub"
  ],
  answer: [2,3],
  explanation: "Storageアカウントは低コストでの長期アーカイブに適しており、複数年にわたる監査保持要件を満たせます。Event Hubはデータをほぼリアルタイムにストリーム配信する送信先で、非Azure製SIEMなど外部ツールが取り込むのに使われます。Log Analyticsワークスペースは主にAzureネイティブなクエリ/分析・アラート用途に最適化されており、低コストな7年保持や外部SIEMへのストリーミングという2つの要件には最適な選択ではありません。Application Insightsはアプリケーションテレメトリ専用の製品で、汎用的な診断設定の送信先ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "AMPLS(Azure Monitor プライベートリンクスコープ)とPrivate Endpointを使用して、Log Analyticsワークスペース「Workspace1」へのアクセス経路をプライベートネットワーク経由に構成しました。<br>この状態を確認したところ、インターネット経由でもWorkspace1へのログ取り込み・クエリが引き続き可能であることが分かりました。",
  question: "インターネット経由のアクセスを完全に遮断するために、Workspace1側で追加設定すべき項目はどれですか?",
  choices: [
    "診断設定を削除する",
    "パブリックネットワークアクセスを無効にする(取り込み・クエリとも)",
    "コミットメント階層(容量予約)を有効にする",
    "ワークスペースのリソースロックを「削除の防止」に設定する"
  ],
  answer: 1,
  explanation: "AMPLSとPrivate Endpointを作成しただけでは、ワークスペース自体のパブリックエンドポイントが自動的に無効になるわけではありません。プライベート経路が「使えるようになる」ことと、パブリック経路が「使えなくなる」ことは別々の設定です。インターネット経由のアクセスを完全に遮断するには、ワークスペースのネットワーク分離設定で、<strong>取り込み(ログの受信)とクエリ(検索)の両方についてパブリックネットワークアクセスを無効</strong>にする必要があります。これにより、Private Endpoint経由(プライベートリンク)以外の経路からのアクセスができなくなります。<br><br>コミットメント階層は取り込みデータ量に応じた単価を下げる課金設定、診断設定はAzureリソースのログ・メトリックの送信先を定義する設定、リソースロックはリソースの誤削除・誤変更を防ぐガバナンス機能であり、いずれもネットワークアクセス経路の制御(パブリック/プライベート)とは直接関係しません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "Microsoft Sentinelで、特定の攻撃パターンに一致するイベントを検出した際に、自動的にユーザーアカウントを無効化するなどの対応を自動実行したいと考えています。",
  question: "構成すべき機能を2つ選択してください。",
  choices: [
    "分析ルール",
    "Logic Appsプレイブック",
    "ハンティングクエリ",
    "ワークブック"
  ],
  answer: [0,1],
  explanation: "分析ルール(スケジュールクエリなど)は指定した攻撃パターンに一致するイベントを検出してアラート/インシデントを生成します。プレイブック(Sentinelからトリガーされるロジックアプリ)は、検出後にアカウントの無効化のような自動対応アクションを実行します。検出だけの分析ルールでは実際のアクションは行われず、トリガー元のない単独のプレイブックも実行されないため、両方をセットで構成する必要があります。ワークブックは可視化・レポート用、ハンティングクエリはアナリストによる手動の調査用であり、いずれも自動検出・自動対応の仕組みではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "特権ロールのアクティブ化(有効化)にあたり、次の両方を必須にしたいと考えています。<br>・アクティブ化の直前に多要素認証で本人確認を行う。<br>・指定した承認者がリクエストを承認するまでロールが有効にならない。",
  question: "PIMのロール設定で有効にする項目を2つ選択してください。",
  choices: [
    "ロールを永続的なアクティブ割り当てにする",
    "アクティブ化時の多要素認証を必須にする",
    "承認を必須にする",
    "有効期間を無期限にする"
  ],
  answer: [1,2],
  explanation: "PIMのロール設定では、アクティブ化時にMFAを必須にするオプションと、指定した承認者による承認を必須にするオプションをそれぞれ独立して有効化でき、両方を同時に設定できます。ロールを永続的なアクティブ割り当てにしてしまうと、そもそもジャストインタイムでの有効化・承認のプロセス自体が発生しなくなり(常時有効な状態になり)要件に反します。有効期間を無期限にすることも、特権アクセスの時間を最小化するという目的に反します。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組織は、すべての新規ストレージアカウントで確実にHTTPS通信のみを許可し、それ以外の構成でのデプロイを拒否したいと考えています。",
  question: "何を使用して、リソースのデプロイ時に許可される構成を制限しますか?",
  choices: [
    "Privileged Identity Management",
    "Azure Policy",
    "Microsoft Entra Conditional Access",
    "Azure RBAC"
  ],
  answer: 1,
  explanation: "Azure PolicyはDeny効果などを使い、誰がデプロイしようとしても許可されない構成のリソース作成をブロックできます。「何が許可される構成か」を強制する仕組みです。Azure RBACは操作権限の付与であり、構成値そのものは制限しません。Conditional Accessはサインイン時の条件(場所・デバイス・リスクなど)を評価する仕組みで、リソース構成とは無関係です。PIMは特権ロールの時限的な昇格を扱う機能であり、構成の許可/拒否とは関係ありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "特定のユーザーが通常と異なる時間帯や場所からサインインするなど、行動の異常を検知して自動的にリスクスコアを算出したいと考えています。",
  question: "Microsoft Sentinelのどの機能を使用しますか?",
  choices: [
    "単純なスケジュールクエリの分析ルールのみ",
    "UEBA (ユーザーとエンティティの行動分析)",
    "Logic Appsプレイブック",
    "データコネクタ"
  ],
  answer: 1,
  explanation: "UEBA(ユーザーとエンティティの行動分析)は、ユーザーやエンティティごとの通常の行動パターンをベースラインとして学習し、通常と異なるサインイン場所・時間・横方向移動などの異常を検知して調査優先度(リスクスコア)を算出します。単純なスケジュールクエリの分析ルールは固定条件への一致を検出するもので、適応的な行動ベースラインは扱いません。プレイブックは検出後の自動対応を実行する機能です。データコネクタはログソースを取り込む仕組みにすぎません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "あるAzureリソースについて、操作/診断ログとメトリックの両方をLog Analyticsワークスペースに送信したいと考えています。",
  question: "診断設定で選択するカテゴリの種類を2つ選択してください。",
  choices: [
    "メトリックカテゴリ",
    "ログカテゴリ",
    "セキュリティアラートカテゴリ",
    "コンプライアンスカテゴリ"
  ],
  answer: [0,1],
  explanation: "診断設定では、ログカテゴリ(リソース固有の操作/診断ログなど)とメトリックカテゴリ(AllMetricsなど)をそれぞれ個別に選択でき、両方を同じ診断設定内で有効にすることでログとメトリックの両方を送信先にルーティングできます。「セキュリティアラート」はDefender for Cloudが生成するものであり、「コンプライアンス」はAzure Policyの概念であり、いずれも診断設定のカテゴリ種類ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "1つのAzureリソースに対して、送信先の異なる複数の診断設定を作成し、ログの種類ごとに送信先を分けたいと考えています。",
  question: "1つのリソースにつき作成できる診断設定の最大数はいくつですか?",
  choices: [
    "5",
    "10",
    "1",
    "3"
  ],
  answer: 0,
  explanation: "1つのAzureリソースにつき作成できる診断設定は最大5つです。それぞれの診断設定で異なる送信先(Log Analyticsワークスペース、Storageアカウント、Event Hubなど)や異なるログ/メトリックカテゴリの組み合わせを指定できるため、用途ごとに送信先を分けたい場合でも十分な数が確保されています。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "複数のオンプレミスADフォレストが分かれた組織があり、複雑なフィルタリングや同期のカスタマイズなしに、シンプルな軽量エージェントで複数フォレストのユーザーをMicrosoft Entra IDに同期したいと考えています。",
  question: "推奨するソリューションはどれですか?",
  choices: [
    "AD FS",
    "Microsoft Entra Cloud Sync",
    "Microsoft Entra Domain Services",
    "Microsoft Entra Connect Sync (フル機能)"
  ],
  answer: 1,
  explanation: "Microsoft Entra Cloud Syncは軽量エージェントを使用し、クラウド側で同期ロジックを管理するため、複数の分離したADフォレストからのシンプルな同期に適しています。フル機能のEntra Connect Syncは属性のライトバックや複雑なフィルタリングなど高度なカスタマイズが可能ですが、構成がより複雑で、通常は単一の同期エンジン構成が中心になります。Entra Domain Servicesはマネージドドメインサービスを提供するもので、オンプレADとの同期そのものではありません。AD FSはフェデレーション認証の仕組みであり、ディレクトリ同期とは異なります。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "本番環境の重要なリソースについて、削除権限を持つユーザーであっても誤ってリソースを削除できないようにする、追加の保護レイヤーを設けたいと考えています。",
  question: "何を構成しますか?",
  choices: [
    "CanNotDeleteロック",
    "RBACの共同作成者ロールの削除",
    "Azure Policyの監査効果",
    "タグの追加"
  ],
  answer: 0,
  explanation: "CanNotDeleteロックは、呼び出し元のRBAC権限に関係なく削除操作をブロックする追加の保護レイヤーで、ロック自体を解除しない限り削除できません。共同作成者ロールを単純に削除すると、正当な作業に必要な権限まで失われてしまいます。Policyの監査効果は問題を記録するだけで削除はブロックしません。タグは単なるメタデータで保護機能はありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組織はセキュリティインシデントの検出、調査、自動対応(SOAR)を一元的に行いたいと考えています。単なるログの収集・クエリだけでなく、インシデント管理と自動化されたプレイブックによる対応が必要です。",
  question: "何を有効にすることを推奨しますか?",
  choices: [
    "Log Analyticsワークスペースのみ",
    "Microsoft Sentinel",
    "Azure Monitorメトリック",
    "Azure Advisor"
  ],
  answer: 1,
  explanation: "Microsoft SentinelはLog Analyticsワークスペース上に構築されるクラウドネイティブなSIEM/SOARで、検出用の分析ルール、インシデント管理、UEBA、脅威インテリジェンス連携、Logic Appsベースのプレイブックによる自動対応まで備えています。素のLog Analyticsワークスペースだけではデータの保存・クエリはできてもインシデント管理やSOAR機能はありません。Azure Monitorメトリックは数値テレメトリのみを扱います。Advisorは構成上の推奨事項を示すもので、セキュリティインシデント対応とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "特権管理者ロールを持つすべてのユーザーに対して、サインイン時に必ず多要素認証を要求したいと考えています。",
  question: "何を構成しますか?",
  choices: [
    "Azure Policy",
    "リソースロック",
    "条件付きアクセスポリシー",
    "診断設定"
  ],
  answer: 2,
  explanation: "条件付きアクセスポリシーはサインイン時のコンテキスト(ユーザー/ロール、場所、デバイス、リスクなど)を評価し、特権ロールメンバーに対してMFAを許可制御として要求するように構成できます。Azure PolicyはAzureリソースの構成を扱うもので、サインインの制御には使いません。リソースロックは削除/変更の防止、診断設定はログのルーティングであり、いずれもサインイン制御には関係しません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "複数のサブスクリプションに同一のAzure Policy割り当て(DeployIfNotExists効果)を展開し、修復タスクで使用するIDを一括管理・再利用したいと考えています。<br>・IDのライフサイクルをポリシー割り当てから独立して管理したい。<br>・同一のIDを複数の割り当てで共有したい。",
  question: "修復タスクにはどの種類のマネージドIDを使用しますか?",
  choices: [
    "ユーザー割り当てマネージドID",
    "Microsoft Entra B2Cゲストアカウント",
    "システム割り当てマネージドID",
    "サービスプリンシパル(証明書)"
  ],
  answer: 0,
  explanation: "ユーザー割り当てマネージドIDは、特定のリソース(この場合はポリシー割り当て)から独立して存在する単体のリソースであり、複数のポリシー割り当てで同じIDを共有し、ロール割り当てなどのライフサイクルを一元管理できます。一方システム割り当てマネージドIDはポリシー割り当てに1対1で紐づき、割り当てを削除するとIDも自動的に削除されるため、複数の割り当てで共有することはできません。サービスプリンシパル(証明書ベース)やゲストアカウントは、Azure Policyの修復タスクの実行主体としては使用されません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "セキュリティ関連の複数のポリシー定義(暗号化必須、許可リージョン制限、タグ必須など)をまとめて1つの単位として、複数のサブスクリプションに一括で割り当てたいと考えています。",
  question: "何を作成しますか?",
  choices: [
    "Azure Blueprint",
    "ポリシーイニシアチブ(ポリシーセット)",
    "リソースロック",
    "単一のポリシー定義"
  ],
  answer: 1,
  explanation: "ポリシーイニシアチブ(ポリシーセット)は複数の関連するポリシー定義をグループ化し、まとめて1つの単位として割り当て・コンプライアンス追跡できる仕組みです。単一のポリシー定義は1つのルールしか表現できません。Blueprintはテンプレート・ポリシー・RBACなどをパッケージ化して環境を反復デプロイする仕組みであり、単純に複数ポリシーをグループ化する目的とは異なります。リソースロックは削除/変更のブロックであり、ポリシーのグループ化とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "サードパーティのSIEMツール(Azure外)にAzureリソースのログをリアルタイムでストリーミングしたいと考えています。",
  question: "診断設定のログ送信先として何を選択しますか?",
  choices: [
    "Azure Storageアカウント",
    "Log Analyticsワークスペース",
    "Event Hub",
    "Azure Backup"
  ],
  answer: 2,
  explanation: "Event Hubはストリーミング配信用の送信先で、外部(非Azure)のツールを含む消費者がほぼリアルタイムにデータを取り込めます。サードパーティSIEMとの連携によく使われます。Storageはアーカイブ用途で即時性がありません。Log AnalyticsはAzureネイティブなクエリ・分析用であり、外部ツールが直接ストリームとして消費する一般的な仕組みではありません。Azure Backupはログ送信先ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組織はPrivileged Identity Managementを使用して特権ロールの管理を行いたいと考えています。",
  question: "どのMicrosoft Entra IDライセンスが必要ですか?",
  choices: [
    "Microsoft Entra ID Free",
    "Microsoft 365 E3のみ",
    "Microsoft Entra ID P1",
    "Microsoft Entra ID P2"
  ],
  answer: 3,
  explanation: "PIMを使用するにはMicrosoft Entra ID P2(またはMicrosoft Entra ID Governance)ライセンスが必要です。FreeやP1のライセンスにはPIM機能は含まれません。標準的なMicrosoft 365 E3にはEntra ID P2の機能が自動的に含まれるわけではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "order",
  scenario: "PIMで対象資格(eligible)ロールが割り当てられたユーザーが、承認と多要素認証が必須に構成された特権ロールを実際に使用できるようになるまでの流れを考えます。",
  question: "正しい順序に並べ替えてください。",
  choices: [
    "承認者がリクエストを承認する",
    "多要素認証で本人確認を行う",
    "ロールが一定時間だけアクティブになる",
    "ユーザーが有効化をリクエストする"
  ],
  answer: [3,1,0,2],
  explanation: "まずユーザーが対象資格ロールの有効化(アクティブ化)をリクエストします。ロール設定でMFAが必須の場合、続けて多要素認証による本人確認が求められます。承認が必須に構成されている場合、リクエストは保留状態となり、指定された承認者が承認するまでロールは有効になりません。承認されると、構成された最大時間の範囲でロールが一定時間だけアクティブになり、時間経過後は自動的に非アクティブに戻ります。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "AKSクラスターでマイクロサービスアプリケーションを稼働させています。<br>・ノードやPodのリソース使用率、コントローラーの状態などインフラレベルの監視が必要。<br>・サービス間の呼び出しの依存関係やレスポンスタイムなど、アプリケーションコードレベルの分散トレースも必要。",
  question: "何を有効にする必要がありますか。該当するものを2つ選択してください。",
  choices: [
    "Service Health",
    "Container insights",
    "Azure Advisor",
    "Application Insights"
  ],
  answer: [1,3],
  explanation: "Container insights(Azure Monitorの機能)は、ノード/Podのリソース使用率、コントローラーやレプリカセットの状態、コンテナーログなどAKSクラスターのインフラレベルのテレメトリを収集します。「クラスター自体が健全か」を把握するための機能です。一方Application Insights(APM)はアプリケーションコードに計測を組み込み、サービス間呼び出しの依存関係やレスポンスタイム、例外などコードレベルの分散トレースを提供します。「自分のコードやサービス間呼び出しが健全か」を把握する機能です。インフラレベルとコードレベルの両方を可視化するには、どちらか一方では不十分で両方を有効にする必要があります。Advisorは構成推奨、Service Healthはプラットフォーム障害情報であり、いずれもこの監視要件には対応しません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Log Analyticsワークスペース全体の既定保持期間は90日ですが、特定の1つのテーブルだけ30日で十分だとわかりました。ワークスペース全体の設定を変更せずにこのテーブルだけ短くしたいと考えています。",
  question: "何を構成しますか?",
  choices: [
    "テーブルレベルの保持期間の上書き",
    "ワークスペース全体の既定保持期間の変更",
    "診断設定の送信先変更",
    "Basic Logsへのテーブル変更"
  ],
  answer: 0,
  explanation: "Log Analyticsではワークスペース全体の既定保持期間とは別に、テーブルごとに個別の保持期間を上書き設定できます。これにより他のテーブルに影響を与えずに特定テーブルだけ保持期間を調整できます。ワークスペース全体の既定値を変更すると全テーブルに影響してしまいます。Basic Logsへの変更は取り込みコストとクエリ機能に関わるプラン変更であり、単純な保持期間の調整とは目的が異なります。診断設定の送信先変更は保持期間の制御にはなりません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "現在、組織全体でどのリソースがどのポリシーに準拠していないかを一元的に確認したいと考えています。",
  question: "何を確認しますか?",
  choices: [
    "Service Healthのダッシュボード",
    "Azure Policyのコンプライアンス",
    "コストの分析",
    "Azure Advisorのスコア"
  ],
  answer: 1,
  explanation: "Azure Policyのコンプライアンスビューは、割り当てられたポリシー/イニシアチブの準拠状況をスコープ横断で集計し、非準拠リソースを一覧表示します。Advisorスコアはベストプラクティスの採用度を示す関連はあるが別の指標で、特定のポリシー割り当てとは連動しません。Service Healthはプラットフォーム側の問題を示すものです。コスト分析は支出状況を示すものであり、ポリシーの準拠状況とは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "次の両方を検知できる監視ソリューションを構成する必要があります。<br>・リソースの可用性やパフォーマンス低下(例: CPU使用率の急上昇)。<br>・リソースの構成変更操作(例: ネットワークセキュリティグループのルール変更)。",
  question: "構成すべきアラートの種類を2つ選択してください。",
  choices: [
    "メトリックアラート",
    "スマート検出",
    "アクティビティログアラート",
    "Service Healthアラート"
  ],
  answer: [0,2],
  explanation: "メトリックアラートはCPU使用率などの数値テレメトリを準リアルタイムで評価し、パフォーマンス/可用性低下を検知します。アクティビティログアラートはアクティビティログに記録される特定のコントロールプレーン操作(NSGルールの変更などの構成変更操作)を対象に発報できます。スマート検出はApplication Insightsのアプリレベルの異常検知機能であり、汎用的なリソースメトリックや構成変更は対象外です。Service Healthアラートは自分のリソースではなくAzureプラットフォーム側の問題を対象とします。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "特定の1つのリソースだけ、正当な理由により一時的にポリシーの評価対象から除外したいと考えていますが、他のリソースには引き続きポリシーを適用し続ける必要があります。",
  question: "何を使用しますか?",
  choices: [
    "ポリシー割り当ての削除",
    "リソースの移動",
    "ポリシーの適用除外(Exemption)",
    "ポリシー定義の削除"
  ],
  answer: 2,
  explanation: "ポリシーの適用除外(Exemption)は、特定のスコープ/リソースだけを、特定のポリシー割り当ての評価対象から除外する機能で、理由や有効期限も設定できます。割り当て自体は他のすべてのリソースに引き続き適用されます。割り当てを削除すると全リソースで強制がなくなります。リソースの移動やポリシー定義の削除は影響範囲が広すぎ、1つのリソースだけを対象にした除外にはなりません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組織には複数の開発チームがあり、開発者がリソースグループ内でリソースを作成・変更できるが、削除はできないようにしたいと考えています。",
  question: "何を使用して、ユーザーが実行できる操作(作成・更新・削除など)を制御しますか?",
  choices: [
    "Microsoft Defender for Cloud",
    "Azure Policy",
    "Azure RBAC",
    "Azure Blueprints"
  ],
  answer: 2,
  explanation: "Azure RBACは「誰が何をできるか」を制御する仕組みで、セキュリティプリンシパル・ロール定義・スコープの組み合わせで操作(読み取り/書き込み/削除など)の可否を割り当てます。Azure Policyはリソースの構成が許可された内容かどうかを評価・強制するもので、ユーザーの操作権限自体は変更しません。Defender for Cloudはセキュリティ体制の可視化と脅威検出が目的です。Blueprints(レガシー)はテンプレート・ポリシー・RBACをまとめてデプロイする仕組みであり、それ自体が権限制御機能ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "詳細なデバッグ用ログを大量に取り込む必要がありますが、通常はほとんど検索されず、まれにトラブルシューティング時にのみクエリを実行します。取り込みコストを最小限に抑えたいと考えています。",
  question: "このテーブルにどのログプランを設定しますか?",
  choices: [
    "Sentinelの分析ルール",
    "Basic Logs",
    "Analytics Logs",
    "アーカイブのみ"
  ],
  answer: 1,
  explanation: "Basic Logsはテーブルごとに選択できる低コストのログプランで、大量かつ低頻度アクセスの診断ログの取り込みコストを大幅に抑えられます。トレードオフとして、利用できるKQLの機能が制限され(複雑な結合が不可など)、既定の対話型保持期間も短くなります。まれにしか検索しないデバッグログには最適です。Analytics Logsはフル機能・フル価格のプランでコスト最適化には不向きです。アーカイブは取り込み後のデータ保持コストを下げる設定であり、取り込みコスト自体を下げるものではありません。Sentinelの分析ルールはテーブルプランとは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Azure Monitor Agentを使用して仮想マシンからパフォーマンスカウンターと特定のWindowsイベントログのみを収集し、Log Analyticsワークスペースに送信したいと考えています。収集するデータの種類を細かく制御する必要があります。",
  question: "何を構成しますか?",
  choices: [
    "データ収集ルール(DCR)",
    "Azure Policyのみ",
    "Recovery Servicesコンテナー",
    "診断設定のみ"
  ],
  answer: 0,
  explanation: "Azure Monitor Agentを使用する場合、収集するデータの種類(特定のパフォーマンスカウンターやイベントログクエリなど)と送信先はデータ収集ルール(DCR)で定義し、対象の仮想マシンに関連付けます。診断設定はAzureリソース側(コントロールプレーン)のログ/メトリックを扱うもので、ゲストOS内のエージェントが収集するテレメトリの粒度制御には使いません。Policyは大規模なDCR関連付けの強制には使えますが、収集データの内容自体は定義しません。Recovery Servicesはバックアップ/サイト回復用です。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "Microsoft Entra IDのエンタープライズアプリケーションで、対象のSaaSアプリ(SCIM 2.0対応)へユーザーアカウントを自動的にプロビジョニングしたいと考えています。",
  question: "構成が必要な要素を2つ選択してください。",
  choices: [
    "条件付きアクセスポリシー",
    "プロビジョニングモードの自動化への設定",
    "PIMの資格(eligible)割り当て",
    "SCIMエンドポイントURLと認証トークン"
  ],
  answer: [1,3],
  explanation: "エンタープライズアプリケーションで自動プロビジョニングを有効にするには、プロビジョニングモードを「自動」に設定し、さらに対象アプリのSCIMエンドポイントURLと認証用トークン(または管理者資格情報)を指定して、Entra IDがそのアプリのSCIM APIを呼び出せるようにする必要があります。条件付きアクセスはサインイン制御であり、アカウントのプロビジョニングとは関係ありません。PIMの資格割り当ては特権ロールの時限昇格の仕組みであり、SaaSアプリへのユーザープロビジョニングとは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組み込みロールのいずれも要件に完全には一致せず、特定の2つのアクション(仮想マシンの再起動と読み取り)のみを許可する独自のロールを作成したいと考えています。",
  question: "何を作成しますか?",
  choices: [
    "管理グループ",
    "組み込みロールの共同作成者",
    "カスタムロール",
    "Azure Policyの割り当て"
  ],
  answer: 2,
  explanation: "組み込みロールが要件に一致しない場合、許可するActions(必要なら拒否するNotActionsも)を細かく指定したカスタムロールを定義し、組み込みロールと同様に割り当てて使用できます。共同作成者ロールは要件よりはるかに広い権限を持ちます。Policyの割り当ては権限そのものを付与しません。管理グループは組織構造上のスコープであり、ロール定義ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Azure Monitorのアラートが発生した際に、ServiceNowに自動的にインシデントチケットを起票したいと考えています。",
  question: "アクショングループにどのアクションの種類を追加しますか?",
  choices: [
    "セキュアスコアの更新",
    "音声通知",
    "SMS通知",
    "ITSMコネクタ"
  ],
  answer: 3,
  explanation: "アクショングループにはITSMツール(ServiceNowなど)と連携するための専用のアクション種類「ITSMコネクタ」があり、ITSM接続を事前に構成しておくことでアラート発生時に自動的に作業項目/インシデントを起票できます。音声通知やSMS通知は人への直接連絡手段であり、ITSMへのチケット起票は行いません。セキュアスコアはMicrosoft Defender for Cloudのセキュリティ体制スコアであり、アクショングループのアクション種類ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "組織は、管理者権限が常時有効(スタンディングアクセス)になっていることによるリスクを減らし、必要なときだけ一時的に昇格できるようにしたいと考えています。",
  question: "何を使用しますか?",
  choices: [
    "Azure Policy",
    "Privileged Identity Management (PIM)",
    "条件付きアクセス",
    "Azure RBACの永続的なロール割り当て"
  ],
  answer: 1,
  explanation: "PIMは「対象資格(eligible)」のロール割り当てを可能にし、実際に権限を使うときだけジャストインタイムでアクティブ化(MFAや承認、時間制限を伴う場合もある)できる仕組みで、常時有効な特権アクセスを排除できます。永続的なロール割り当ては常にアクティブな状態、つまりスタンディングアクセスそのものであり、求める要件と逆です。条件付きアクセスはサインイン条件の制御でロールの有効化ライフサイクルは扱いません。Policyはリソース構成のガバナンスです。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "収集済みのセキュリティデータを対話型のダッシュボードで可視化し、傾向を経営層に報告したいと考えています。新たな検出ルールの作成は不要です。",
  question: "Microsoft Sentinelの何を使用しますか?",
  choices: [
    "ハンティングクエリ",
    "インシデント",
    "分析ルール",
    "ワークブック"
  ],
  answer: 3,
  explanation: "ワークブックは対話型かつカスタマイズ可能なダッシュボード/レポートを作成する機能で、データの傾向を視覚的に報告するのに適しています。分析ルールはクエリからアラート/インシデントを生成する検出の仕組みであり、可視化・報告目的ではありません。ハンティングクエリはアナリストによる能動的な調査用のアドホッククエリです。インシデントはアラートがまとめられた案件レコードであり、レポート用の可視化機能ではありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "order",
  scenario: "オンプレミスADとMicrosoft Entra IDが同期されている環境で、新入社員のアカウントが最終的にSCIM対応のSaaSアプリにも自動作成されるまでの流れを考えます。",
  question: "正しい順序に並べ替えてください。",
  choices: [
    "オンプレミスのADでユーザーアカウントを作成する",
    "Microsoft Entra Connect(Cloud Sync)が同期サイクルを実行する",
    "Microsoft Entra IDにユーザーアカウントが作成される",
    "エンタープライズアプリのプロビジョニングがSCIM経由でSaaSアプリにアカウントを作成する"
  ],
  answer: [0,1,2,3],
  explanation: "アカウントはまずオンプレミスのAD上で作成されます。次にMicrosoft Entra Connect(またはCloud Sync)が同期サイクルを実行し、そのユーザーオブジェクトをMicrosoft Entra IDに反映します。Entra ID側にアカウントが作成されると、エンタープライズアプリケーションに構成された自動プロビジョニングジョブ(独自のスケジュールで定期実行)が新規/変更されたユーザーを検出し、SCIM APIを通じて対象のSaaSアプリ側にアカウントを作成します。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "Advisorが、可用性ゾーンをまたいだ冗長化がされていないリソースを検出し、回復性を高める推奨事項を表示しています。",
  question: "この推奨事項はAdvisorのどのカテゴリに分類されますか?",
  choices: [
    "セキュリティ",
    "信頼性",
    "コスト",
    "運用の優秀性"
  ],
  answer: 1,
  explanation: "Advisorの推奨事項は信頼性・コスト・セキュリティ・運用の優秀性・パフォーマンスの5つのカテゴリに分類されます。可用性ゾーンをまたぐ冗長化のような回復性(可用性)に関する内容は信頼性カテゴリに該当します。コストは支出削減、セキュリティは保護体制の強化、運用の優秀性はデプロイ・運用プロセスの改善に関する推奨事項です。"
},
{
  domain: "ID・ガバナンス・監視",
  scenario: "PIMを使用して、あるユーザーにグローバル管理者ロールを対象資格(eligible)として割り当てました。",
  question: "ユーザーがそのロールを実際に使用できるようにするには何をする必要がありますか?",
  choices: [
    "Azure Policyを割り当てる",
    "何もせず自動的に付与される",
    "サブスクリプションを移動する",
    "ロールの有効化(アクティブ化)をリクエストする"
  ],
  answer: 3,
  explanation: "対象資格(eligible)の割り当ては、それ自体では権限を持ちません。ユーザーは実際に権限が必要なときに有効化(アクティブ化)をリクエストする必要があり、ロール設定によってはMFAや承認、理由の入力が求められ、承認後に一定時間だけロールがアクティブになります。自動的に付与されることはなく、Policyの割り当てやサブスクリプションの移動はこの仕組みとは無関係です。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "監視対象システムで、次のアラート通知要件があります。<br>・Sev 0(重大)のアラートは担当者への電話呼び出しで即時通知する。<br>・Sev 3(情報)のアラートはメールのみでチームに通知する。",
  question: "構成すべき要素を2つ選択してください。",
  choices: [
    "音声通知を含むアクショングループ",
    "重大度ごとに異なるアクショングループを割り当てたアラートルール",
    "単一のリソースロック",
    "Azure Advisorの推奨事項"
  ],
  answer: [0,1],
  explanation: "重大度によって通知先を分けるには、各アラートルールに重大度を設定したうえで、重大度ごとに異なるアクショングループを割り当てます。さらにSev 0向けには電話呼び出しを行う音声通知を含んだアクショングループが必要です。この2つを組み合わせることで初めて「重大度に応じた異なるチャネルへの通知」が実現できます。リソースロックは削除/変更の防止機能、Advisorの推奨事項は構成改善の提案であり、いずれも通知の振り分けとは関係ありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "組織の10個のサブスクリプションすべてに、同一のポリシーイニシアチブを一括で適用し、今後追加される新しいサブスクリプションにも自動的に適用されるようにしたいと考えています。",
  question: "実施すべき手順を2つ選択してください。",
  choices: [
    "サブスクリプションごとに個別にイニシアチブを割り当てる",
    "各リソースグループにタグを追加する",
    "サブスクリプションを共通の管理グループの配下に整理する",
    "管理グループのスコープでイニシアチブを割り当てる"
  ],
  answer: [2,3],
  explanation: "まず対象の10個のサブスクリプションを共通の管理グループの配下に整理し、次にその管理グループのスコープでイニシアチブを1回割り当てます。これにより配下の全サブスクリプション(今後追加されるものも含む)に自動的に継承されます。サブスクリプションごとに個別に割り当てるのは、まさに避けたい繰り返し作業です。リソースグループへのタグ付けはポリシーの適用や継承とは関係ありません。"
},
{
  domain: "ID・ガバナンス・監視",
  type: "multi",
  scenario: "Azure RBACでユーザーに特定のリソースグループへのアクセス権を付与するロール割り当てを作成しています。",
  question: "ロール割り当ての作成時に指定する必要がある要素を2つ選択してください。",
  choices: [
    "ロール定義",
    "カスタムロールの説明文",
    "セキュリティプリンシパル(ユーザー/グループ/サービスプリンシパル)",
    "リソースへのタグ条件"
  ],
  answer: [0,2],
  explanation: "ロール割り当ては、誰に対して(セキュリティプリンシパル)、どの権限を(ロール定義)、どのスコープで付与するかの組み合わせで構成されます。このシナリオではスコープ(対象のリソースグループ)は既に決まっているため、割り当て作成時に明示的に選ぶ要素はセキュリティプリンシパルとロール定義です。タグ条件は標準のロール割り当てには含まれない要素です。説明文はカスタムロール定義の任意メタデータであり、個々のロール割り当てで毎回指定するものではありません。"
}
];
