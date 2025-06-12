import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Sankey, Treemap, Label, LabelList } from 'recharts';

const ElectionSimulation = () => {
  const [activeTab, setActiveTab] = useState('baseline');
  const [activePieIndex, setActivePieIndex] = useState(0);
  
  // ベースライン結果データ
  const baselineResults = [
    { party: '自民党', color: '#58A9F2', singleSeat: 34, proportionalSeat: 20, total: 54 },
    { party: '公明党', color: '#92C364', singleSeat: 4, proportionalSeat: 4, total: 8 },
    { party: '国民民主', color: '#BA68C8', singleSeat: 5, proportionalSeat: 5, total: 10 },
    { party: '立憲民主', color: '#F06292', singleSeat: 9, proportionalSeat: 4, total: 13 },
    { party: '維新', color: '#FFB74D', singleSeat: 5, proportionalSeat: 3, total: 8 },
    { party: '共産党', color: '#E57373', singleSeat: 2, proportionalSeat: 3, total: 5 },
    { party: 'れいわ', color: '#FF8A65', singleSeat: 2, proportionalSeat: 1, total: 3 },
    { party: 'その他', color: '#90A4AE', singleSeat: 13, proportionalSeat: 10, total: 23 },
  ];
  
  // 政党グループのデータ
  const partyGroups = [
    { name: '与党', value: 62, fill: '#64B5F6', parties: ['自民党', '公明党'] },
    { name: '与党系', value: 10, fill: '#BA68C8', parties: ['国民民主'] },
    { name: '野党', value: 29, fill: '#EF5350', parties: ['立憲民主', '共産党', 'れいわ', '維新'] },
    { name: 'その他', value: 23, fill: '#90A4AE', parties: ['その他'] }
  ];
  
  // シナリオ分析データ
  const scenarios = [
    { id: 'S-1', name: '与党単独で改選過半数維持', probability: 25, color: '#64B5F6', 
      description: '自民党が選挙区で40議席以上を獲得し、与党だけで過半数の63議席以上を確保するシナリオ。無党派層の投票率が低い場合に実現しやすい。',
      trigger: '自民選挙区40超獲得・無党派投票率低',
      outcome: '与党の安定政権運営継続。石破政権の基盤が強化され、政策実行力が増す。' },
    { id: 'S-2', name: '与党過半数割れ・DPFP補完', probability: 45, color: '#81C784', 
      description: '与党が55-62議席を獲得するが過半数に届かず、国民民主党が閣外協力する形で政権運営を継続するシナリオ。最も実現確率が高い。',
      trigger: 'DPFPが物価対策で連立合意、石破続投',
      outcome: '物価対策・減税協議会が設置され、国民民主党の意向を踏まえた政策運営が必要になる。' },
    { id: 'S-3', name: '野党連携で参院過半数奪取', probability: 15, color: '#EF5350', 
      description: '立憲民主党、国民民主党、日本維新の会、れいわ新選組などの野党が連携し、参議院で65議席以上を獲得して過半数を握るシナリオ。',
      trigger: '32の1人区で統一候補25勝、公明比例失速',
      outcome: '衆参ねじれ状態となり、予算関連法案は衆院優越で成立するものの、重要政策で修正圧力が強まる。' },
    { id: 'S-4', name: '自民惨敗＋石破退陣', probability: 12, color: '#FF8A65', 
      description: '与党が55議席未満に留まり、自民党内で石破総裁の求心力が大きく低下するシナリオ。内閣支持率が25%未満まで下落した場合に実現する可能性が高まる。',
      trigger: '支持率25%未満＋幹事長派「ポスト石破」加速',
      outcome: '選挙区で自民が25議席以下の場合、「責任論」が噴出。有力後継として小林鷹之・萩生田光一・野田佳彦などの名前が挙がる。' },
    { id: 'S-5', name: '選挙後ダブル選・衆院解散', probability: 3, color: '#9575CD', 
      description: '参院選で与党が劣勢となった後、石破総理が主導権を取り戻すために衆議院を解散し、ダブル選挙に打って出るシナリオ。実現確率は非常に低い。',
      trigger: '石破が主導権奪回狙い解散カード行使',
      outcome: '衆参同日もしくは秋口の衆院解散。低支持率での解散は党内抵抗が大きい。' }
  ];
  
  // 単独選挙区（1人区）の勝敗分析データ
  const singleDistrictData = [
    { id: 1, name: '与党有利', count: 7, color: '#64B5F6', description: '与党候補が野党候補を10ポイント以上リード' },
    { id: 2, name: '与党やや有利', count: 10, color: '#90CAF9', description: '与党候補が野党候補を5〜10ポイントリード' },
    { id: 3, name: '接戦', count: 8, color: '#E0E0E0', description: '両候補の差が5ポイント未満' },
    { id: 4, name: '野党やや有利', count: 5, color: '#FFAB91', description: '野党候補が与党候補を5〜10ポイントリード' },
    { id: 5, name: '野党有利', count: 2, color: '#FF8A65', description: '野党候補が与党候補を10ポイント以上リード' }
  ];
  
  // リスク要因データ
  const riskFactors = [
    { name: '物価高第２波', impact: 9, probability: 7, score: 63, color: '#EF5350', description: 'コメ高騰などによる物価高が再発し、支持率が想定以上に悪化するリスク' },
    { name: 'トランプ関税再交渉', impact: 8, probability: 6, score: 48, color: '#FF8A65', description: 'アメリカとの関税再交渉の失敗により、与党基盤に打撃を与えるリスク' },
    { name: '野党一本化交渉', impact: 7, probability: 8, score: 56, color: '#FFD54F', description: '32選挙区での候補調整がカギとなる野党一本化交渉の成否によるリスク' },
    { name: '公明の基礎票減少', impact: 6, probability: 5, score: 30, color: '#81C784', description: '支持母体の高齢化による公明党の基礎票減少で比例区5議席割れの懸念' }
  ];
  
  // 政党支持率とシミュレーション結果の関係データ
  const supportRateSimulation = [
    { support: 25, seats: 42, majority: 'No', result: 'S-4/S-5' },
    { support: 27, seats: 48, majority: 'No', result: 'S-4/S-3' },
    { support: 30, seats: 56, majority: 'No', result: 'S-2' },
    { support: 33, seats: 61, majority: 'No', result: 'S-2' },
    { support: 35, seats: 64, majority: 'Yes', result: 'S-1' },
    { support: 38, seats: 69, majority: 'Yes', result: 'S-1' },
  ];
  
  // シナリオの詳細表示用コンポーネント
  const ScenarioDetail = ({ scenario }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex items-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4" style={{ backgroundColor: scenario.color }}>
          <span className="text-white font-bold">{scenario.id}</span>
        </div>
        <div>
          <h3 className="font-medium text-lg">{scenario.name}</h3>
          <div className="text-sm text-gray-600">実現確率: <span className="font-medium">{scenario.probability}%</span></div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-800 mb-3">{scenario.description}</p>
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-xs text-gray-600 mb-1">トリガー条件:</p>
          <p className="text-sm font-medium">{scenario.trigger}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded mt-3">
          <p className="text-xs text-blue-800 mb-1">想定される結果:</p>
          <p className="text-sm">{scenario.outcome}</p>
        </div>
      </div>
    </div>
  );
  
  // アクティブなシナリオセクターをレンダリングするコンポーネント
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-lg font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#666">
          確率: {value}%
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill="#666" className="text-xs">
          クリックして詳細を表示
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };
  
  // 基本分析タブのコンテンツ
  const renderBaselineTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">参院選ベースライン予測結果（10万回シミュレーション平均）</h3>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-blue-800 mb-3">主要ポイント</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>改選過半数（63議席）まで<strong>与党-1議席</strong>の予測</li>
          <li>国民民主を加えると「与党系」72議席で過半数確保</li>
          <li>選挙区では自民党が34議席、立憲民主が9議席</li>
          <li>比例区では自民党が20議席、国民民主と立憲民主がそれぞれ5議席と4議席</li>
        </ul>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">政党別獲得議席予測（合計）</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={baselineResults.sort((a, b) => b.total - a.total)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 60]} />
            <YAxis dataKey="party" type="category" width={80} />
            <Tooltip />
            <Legend />
            <Bar dataKey="singleSeat" name="選挙区" stackId="a" fill="#2196F3" />
            <Bar dataKey="proportionalSeat" name="比例区" stackId="a" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-2">議席構成（政党グループ別）</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={partyGroups}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {partyGroups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}議席`, '予測議席数']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">選挙区/比例区の議席配分</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                {name: '選挙区', '与党': 38, '野党': 23, 'その他': 13},
                {name: '比例区', '与党': 24, '野党': 16, 'その他': 10}
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="与党" stackId="a" fill="#64B5F6" />
              <Bar dataKey="野党" stackId="a" fill="#EF5350" />
              <Bar dataKey="その他" stackId="a" fill="#90A4AE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded shadow-sm">
        <h4 className="font-medium mb-3">シミュレーション計算方法</h4>
        <div className="text-sm space-y-2">
          <p>• 改選124議席（選挙区74＋比例50）</p>
          <p>• 各世論調査の政党支持率を①比例票配分、②32の１人区は「与党 vs 野党統一候補」の過去５回平均補正、③複数区はドント式で配当</p>
          <p>• ５月平均値を基準にモンテカルロ10万回シミュレーション</p>
          <p>• 勝敗ライン：過半数獲得には<strong>63議席</strong>必要</p>
        </div>
      </div>
    </div>
  );
  
  // シナリオ分析タブのコンテンツ
  const renderScenariosTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">選挙シナリオ分析（実現確率とインパクト）</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-2">シナリオ別実現確率</h4>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                activeIndex={activePieIndex}
                activeShape={renderActiveShape}
                data={scenarios}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#8884d8"
                dataKey="probability"
                onMouseEnter={(_, index) => setActivePieIndex(index)}
                onClick={(_, index) => setActivePieIndex(index)}
              >
                {scenarios.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">選択シナリオの詳細</h4>
          <ScenarioDetail scenario={scenarios[activePieIndex]} />
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">シナリオ実現性と政党支持率の関係</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={supportRateSimulation}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="support" label={{ value: '自民党支持率(%)', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: '予測獲得議席数', angle: -90, position: 'insideLeft' }} domain={[40, 70]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="seats" name="自民党予測議席" stroke="#2196F3" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="result" name="想定シナリオ" stroke="#FF5722" strokeWidth={1} dot={{ r: 3 }} />
            <Line y={63} stroke="#FF0000" strokeDasharray="3 3" label="過半数ライン" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">単独選挙区（1人区）の勝敗予測</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={singleDistrictData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="選挙区数" fill={(entry) => entry.color} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-1">※32の1人区における与野党の競争状況の予測</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-3">シナリオ分析の結論</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>最も可能性が高いのは「<strong>与党過半数割れ・国民民主党の閣外協力</strong>」シナリオ（確率45%）</li>
          <li>与党単独での過半数獲得も25%の確率で実現可能</li>
          <li>野党連携による参院過半数奪取（15%）や自民惨敗・石破退陣（12%）は低確率だが可能性あり</li>
          <li>モンテカルロシミュレーションでは、選挙区の接戦区の勝敗が全体結果を大きく左右</li>
        </ul>
      </div>
    </div>
  );
  
  // リスク分析タブのコンテンツ
  const renderRisksTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">参院選に影響するリスク要因と注視点</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">主要リスク要因（影響度×確率）</h4>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            data={riskFactors}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" label={{ value: 'リスクスコア', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 10]} label={{ value: '確率/影響度', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="score" name="リスクスコア" barSize={30} fill={(entry) => entry.color}>
              <LabelList dataKey="score" position="top" />
            </Bar>
            <Line yAxisId="right" type="monotone" dataKey="impact" name="影響度" stroke="#2196F3" dot={{ r: 5 }} />
            <Line yAxisId="right" type="monotone" dataKey="probability" name="発生確率" stroke="#FF5722" dot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-2">リスク要因のレーダーチャート</h4>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart outerRadius={120} width={500} height={350} data={riskFactors}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} />
              <Radar name="影響度" dataKey="impact" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="発生確率" dataKey="probability" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">リスク要因の詳細分析</h4>
          {riskFactors.map((risk, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: risk.color }}></div>
                <h5 className="font-medium">{risk.name}</h5>
              </div>
              <div className="text-sm pl-5">
                <p className="text-gray-700 mb-1">{risk.description}</p>
                <div className="flex text-xs text-gray-600">
                  <span className="mr-4">影響度: <strong>{risk.impact}/10</strong></span>
                  <span>確率: <strong>{risk.probability}/10</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">注視すべき政治イベントタイムライン</h4>
        <div className="relative">
          <div className="bg-gray-200 h-3 absolute top-6 left-0 right-0 rounded-full"></div>
          <div className="grid grid-cols-4 relative">
            {[
              { month: '5月末', event: '最新世論調査データ反映', color: '#E0E0E0' },
              { month: '6月中旬', event: '政府追加経済対策発表', color: '#90CAF9' },
              { month: '6月末', event: '選挙公示・野党候補一本化', color: '#FFB74D' },
              { month: '7月中旬', event: '投開票日', color: '#EF5350' }
            ].map((item, index) => (
              <div key={index} className="text-center p-2">
                <div className="w-8 h-8 rounded-full bg-white border-4 mx-auto mb-2 z-10 relative" style={{ borderColor: item.color }}></div>
                <div className="font-medium">{item.month}</div>
                <div className="text-sm text-gray-600">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-3">リスク要因の総合評価</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>物価高第２波</strong>が最大のリスク要因。コメ高騰などが与党支持率に大きく影響する可能性</li>
          <li><strong>野党一本化交渉</strong>の成否が32選挙区の結果を左右。維新主導の予備選がカギとなる</li>
          <li><strong>トランプ関税再交渉</strong>の成否が夏場に顕在化し、失敗なら与党基盤に打撃となる可能性</li>
          <li><strong>公明党の基礎票減少</strong>（支持母体の高齢化）で比例区5議席割れの懸念も</li>
        </ul>
      </div>
    </div>
  );
  
  // 政治情勢タブのコンテンツ
  const renderPoliticsTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">選挙後の政治情勢シミュレーション</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-3">石破続投パターン（S-1/S-2 70%）</h4>
          <div className="text-sm space-y-3">
            <p>• 国民民主党と「物価対策・減税協議会」設置</p>
            <p>• ガソリン補助延長で臨時国会を乗り切る</p>
            <p>• 支持率が30%台前半で底打ち、党内反乱は当面沈静</p>
            <p>• 石破内閣は継続するが、重要法案は常に国民民主党との調整が必須に</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
          <h4 className="font-medium text-orange-800 mb-3">石破退陣・ポスト石破（S-4 12%）</h4>
          <div className="text-sm space-y-3">
            <p>• 選挙区で自民が25議席以下の場合、「責任論」が噴出</p>
            <p>• 有力後継：小林鷹之・萩生田光一・野田佳彦（自公連立解消時）</p>
            <p>• 党内混乱で政策停滞のリスク</p>
            <p>• 次期総選挙までの「繋ぎ」政権の可能性大</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
          <h4 className="font-medium text-red-800 mb-3">野党主導の「参院多数」（S-3 15%）</h4>
          <div className="text-sm space-y-3">
            <p>• 予算関連法案は衆院優越で成立も、重要政策で修正圧力</p>
            <p>• 憲法改正は参院３分の２に遠く、議論停滞</p>
            <p>• 野党間の政策調整が複雑化し、一貫性を欠く可能性</p>
            <p>• 国民民主党が与野党の橋渡し役として存在感を高める</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
          <h4 className="font-medium text-purple-800 mb-3">ダブル選挙・再信任（S-5 3%）</h4>
          <div className="text-sm space-y-3">
            <p>• 衆参同日もしくは秋口の衆院解散</p>
            <p>• 低支持率での解散は党内抵抗大</p>
            <p>• 石破総理の「捨て身」の賭けとなる可能性</p>
            <p>• 政局の不安定化と市場の混乱リスク</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-3">選挙後の政策変化予測</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">シナリオ</th>
                <th className="py-2 px-4 border-b text-left">財政政策</th>
                <th className="py-2 px-4 border-b text-left">経済対策</th>
                <th className="py-2 px-4 border-b text-left">外交・防衛</th>
                <th className="py-2 px-4 border-b text-left">憲法改正</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="py-2 px-4 border-b font-medium">S-1 与党過半数維持</td>
                <td className="py-2 px-4 border-b">現行路線継続</td>
                <td className="py-2 px-4 border-b">小規模対策</td>
                <td className="py-2 px-4 border-b">同盟強化推進</td>
                <td className="py-2 px-4 border-b">積極推進</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-medium">S-2 DPFP閣外協力</td>
                <td className="py-2 px-4 border-b">大型減税導入</td>
                <td className="py-2 px-4 border-b">物価対策強化</td>
                <td className="py-2 px-4 border-b">現状維持</td>
                <td className="py-2 px-4 border-b">議論継続</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-medium">S-3 野党参院過半数</td>
                <td className="py-2 px-4 border-b">大幅修正</td>
                <td className="py-2 px-4 border-b">給付金拡大</td>
                <td className="py-2 px-4 border-b">歳出見直し</td>
                <td className="py-2 px-4 border-b">議論停滞</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b font-medium">S-4 石破退陣</td>
                <td className="py-2 px-4 border-b">方針不明確化</td>
                <td className="py-2 px-4 border-b">大型対策</td>
                <td className="py-2 px-4 border-b">一時停滞</td>
                <td className="py-2 px-4 border-b">棚上げ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-3">政治情勢シミュレーションの結論</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>最も可能性の高いシナリオは「<strong>与党過半数割れ・国民民主党による閣外協力</strong>」パターン</li>
          <li>この場合、石破政権は継続するが<strong>物価対策・減税が政権運営の焦点</strong>となる</li>
          <li>野党参院過半数となった場合でも、衆院優越で予算関連法案は成立するが、重要政策に修正圧力</li>
          <li>いずれのシナリオでも<strong>財政規律が緩む可能性が高い</strong>（減税・歳出増の圧力）</li>
        </ul>
      </div>
    </div>
  );
  
  // まとめタブのコンテンツ
  const renderSummaryTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">参院選シミュレーション総括と提言</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">主要な発見</h4>
        
        <div className="space-y-4">
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-blue-500">
            <h5 className="font-medium text-blue-800">1. 参院選の勝敗ライン</h5>
            <p className="mt-1 text-sm">「与党改選60議席」が実質的な勝敗ライン。これを切れば政権運営は常に国民民主党頼みとなる。現時点の予測は与党62議席で非常に僅差の状況。</p>
          </div>
          
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-purple-500">
            <h5 className="font-medium text-purple-800">2. 無党派動員と物価対策の成否が決定的</h5>
            <p className="mt-1 text-sm">政府は６月補正で"減税より即効性"の現金給付や燃料補助上積みが急務。特に物価高第２波（コメ高騰など）への対策が選挙結果を左右する。</p>
          </div>
          
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-green-500">
            <h5 className="font-medium text-green-800">3. 野党側は統一候補での32区25勝が条件</h5>
            <p className="mt-1 text-sm">維新・立憲の連携が鍵だが共産党排除では比例票が伸びず、ジレンマを抱える。一人区での候補者一本化の成否が全体結果を大きく左右する。</p>
          </div>
          
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-yellow-500">
            <h5 className="font-medium text-yellow-800">4. 市場・行政へのインプリケーション</h5>
            <p className="mt-1 text-sm">与党過半数割れでも国民民主党協力が主流シナリオで急激な政策転換は限定的。ただし減税・歳出増で財政規律リスクは高まる。</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">選挙結果によるシナリオ発生確率</h4>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart
            data={[
              { seats: "70以上", s1: 90, s2: 10, s3: 0, s4: 0, s5: 0 },
              { seats: "63-69", s1: 80, s2: 20, s3: 0, s4: 0, s5: 0 },
              { seats: "58-62", s1: 0, s2: 85, s3: 10, s4: 0, s5: 5 },
              { seats: "50-57", s1: 0, s2: 60, s3: 30, s4: 5, s5: 5 },
              { seats: "45-49", s1: 0, s2: 15, s3: 45, s4: 35, s5: 5 },
              { seats: "45未満", s1: 0, s2: 0, s3: 20, s4: 70, s5: 10 },
            ]}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="seats" label={{ value: '与党獲得議席数', position: 'insideBottom', offset: -5 }} />
            <YAxis label={{ value: 'シナリオ発生確率(%)', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="s1" name="S-1: 与党過半数維持" stackId="a" fill="#64B5F6" />
            <Bar dataKey="s2" name="S-2: 国民民主閣外協力" stackId="a" fill="#81C784" />
            <Bar dataKey="s3" name="S-3: 野党参院過半数" stackId="a" fill="#EF5350" />
            <Bar dataKey="s4" name="S-4: 石破退陣" stackId="a" fill="#FF8A65" />
            <Bar dataKey="s5" name="S-5: ダブル選挙" stackId="a" fill="#9575CD" />
            <Line type="monotone" dataKey="s2" name="S-2確率" stroke="#000000" dot={false} activeDot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="font-medium mb-3">与党（自民・公明）</h4>
          <div className="text-4xl font-bold text-blue-600 mb-2">62議席</div>
          <p className="text-sm text-gray-600">過半数ライン: 63議席</p>
          <p className="text-sm text-gray-600">改選前議席数: 69議席</p>
          <p className="mt-3 text-sm">予測では与党単独で過半数に1議席足りないが、国民民主党を加えると72議席で安定多数を確保。</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="font-medium mb-3">野党（立民・共産・れいわ・維新）</h4>
          <div className="text-4xl font-bold text-red-600 mb-2">29議席</div>
          <p className="text-sm text-gray-600">現状議席数: 33議席</p>
          <p className="text-sm text-gray-600">統一候補獲得数: 16議席/32区</p>
          <p className="mt-3 text-sm">統一候補の1人区での勝利数が20を超えなければ、野党が過半数を獲得する可能性は低い。</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="font-medium mb-3">国民民主党</h4>
          <div className="text-4xl font-bold text-purple-600 mb-2">10議席</div>
          <p className="text-sm text-gray-600">現状議席数: 6議席</p>
          <p className="text-sm text-gray-600">キャスティングボート</p>
          <p className="mt-3 text-sm">最も可能性の高いシナリオでは、国民民主党が「キングメーカー」となり、政権運営の鍵を握る。</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-3">最終提言</h4>
        <div className="space-y-3 text-sm">
          <p>今回の参院選シミュレーションによれば、最も可能性の高いシナリオは<strong>「与党過半数割れ・国民民主党の閣外協力」</strong>（確率45%）である。</p>
          <p>政府・与党は今後1ヶ月の間に、<strong>物価対策の強化と無党派層への訴求</strong>を最優先課題とすべきである。特に6月の補正予算で減税よりも即効性のある現金給付や燃料補助の上積みが得票に直結する。</p>
          <p>一方、野党側は<strong>32の一人区での候補者一本化</strong>が成否を分ける。ただし維新と立憲民主党の連携が鍵となる中で、共産党排除のジレンマを抱えている。</p>
          <p>いずれのシナリオでも、選挙後は<strong>財政規律が緩む方向</strong>に向かう可能性が高く、市場関係者は財政リスクの高まりに注意が必要である。</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mt-8">
        <p>今後１か月で公示前最後の大型調査が相次ぎます。最新データを反映し次回シミュレーションを更新いたします。</p>
      </div>
    </div>
  );
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">参議院選挙シミュレーション分析（2025年）</h2>
      
      <div className="mb-6">
        <div className="flex flex-wrap border-b">
          <button 
            className={`px-4 py-2 ${activeTab === 'baseline' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('baseline')}
          >
            基本分析
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'scenarios' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('scenarios')}
          >
            シナリオ分析
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'risks' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('risks')}
          >
            リスク要因
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'politics' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('politics')}
          >
            政治情勢
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('summary')}
          >
            総括と提言
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg">
        {activeTab === 'baseline' && renderBaselineTab()}
        {activeTab === 'scenarios' && renderScenariosTab()}
        {activeTab === 'risks' && renderRisksTab()}
        {activeTab === 'politics' && renderPoliticsTab()}
        {activeTab === 'summary' && renderSummaryTab()}
      </div>
    </div>
  );
};

export default ElectionSimulation;