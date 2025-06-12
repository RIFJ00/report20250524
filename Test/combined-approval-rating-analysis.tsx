import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Cell, PieChart, Pie, Sector, ScatterChart, Scatter, ZAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap } from 'recharts';

const CombinedAnalysis = () => {
  // メインタブ選択用のステート
  const [mainTab, setMainTab] = useState('cabinet');
  
  // 内閣支持率分析用のサブタブ選択用のステート
  const [cabinetTab, setCabinetTab] = useState('summary');
  
  // 政党支持率分析用のサブタブ選択用のステート
  const [partyTab, setPartyTab] = useState('overview');
  
  // ====== 内閣支持率データ ======
  
  // データ定義
  const rawData = [
    { media: "共同通信", date: "2025年3月", approval: 32.6, disapproval: 53.8 },
    { media: "共同通信", date: "2025年4月", approval: 27.6, disapproval: 57.8 },
    { media: "共同通信", date: "2025年5月", approval: 27.4, disapproval: 55.1 },
    { media: "朝日新聞", date: "2025年3月", approval: 30.0, disapproval: 59.0 },
    { media: "朝日新聞", date: "2025年4月", approval: 30.0, disapproval: 56.0 },
    { media: "朝日新聞", date: "2025年5月", approval: 33.0, disapproval: 56.0 },
    { media: "毎日新聞", date: "2025年3月", approval: 24.0, disapproval: 61.0 },
    { media: "毎日新聞", date: "2025年4月", approval: 23.0, disapproval: 62.0 },
    { media: "毎日新聞", date: "2025年5月", approval: 22.0, disapproval: 62.0 },
    { media: "読売新聞", date: "2025年3月", approval: 31.0, disapproval: 58.0 },
    { media: "読売新聞", date: "2025年4月", approval: 31.0, disapproval: 56.0 },
    { media: "読売新聞", date: "2025年5月", approval: 31.0, disapproval: 56.0 },
    { media: "ANN（テレビ朝日）", date: "2025年3月", approval: 29.2, disapproval: 52.2 },
    { media: "ANN（テレビ朝日）", date: "2025年4月", approval: 31.4, disapproval: 47.4 },
    { media: "ANN（テレビ朝日）", date: "2025年5月", approval: 27.6, disapproval: 48.7 },
    { media: "時事通信", date: "2025年3月", approval: 27.9, disapproval: 44.1 },
    { media: "時事通信", date: "2025年4月", approval: 26.8, disapproval: 48.0 },
    { media: "時事通信", date: "2025年5月", approval: 23.1, disapproval: 51.2 },
    { media: "NHK", date: "2025年3月", approval: 35.0, disapproval: 45.0 },
    { media: "NHK", date: "2025年4月", approval: 35.0, disapproval: 45.0 },
    { media: "NHK", date: "2025年5月", approval: 33.4, disapproval: 48.1 },
    { media: "日経新聞", date: "2025年3月", approval: 35.0, disapproval: 59.0 },
    { media: "日経新聞", date: "2025年4月", approval: 33.0, disapproval: 60.0 },
    { media: "日経新聞", date: "2025年5月", approval: 33.0, disapproval: 60.0 },
    { media: "産経新聞", date: "2025年3月", approval: 30.4, disapproval: 63.0 },
    { media: "産経新聞", date: "2025年4月", approval: 33.3, disapproval: 61.5 },
    { media: "産経新聞", date: "2025年5月", approval: 33.3, disapproval: 61.5 },
    { media: "JNN（TBS）", date: "2025年3月", approval: 30.6, disapproval: 66.1 },
    { media: "JNN（TBS）", date: "2025年4月", approval: 30.6, disapproval: 66.1 },
    { media: "JNN（TBS）", date: "2025年5月", approval: 33.3, disapproval: 62.1 }
  ];

  // メディアリスト
  const mediaList = [...new Set(rawData.map(d => d.media))];
  
  // 月別集計データ
  const monthlyData = [
    { month: "2025年3月", avgApproval: 30.57, avgDisapproval: 56.12, gap: 25.55 },
    { month: "2025年4月", avgApproval: 30.17, avgDisapproval: 55.98, gap: 25.81 },
    { month: "2025年5月", avgApproval: 29.71, avgDisapproval: 56.07, gap: 26.36 }
  ];
  
  // メディア別平均データ（支持率の高い順）
  const mediaAverages = [
    { media: "NHK", avgApproval: 34.47, avgDisapproval: 46.03, gap: 11.56 },
    { media: "日経新聞", avgApproval: 33.67, avgDisapproval: 59.67, gap: 26.00 },
    { media: "産経新聞", avgApproval: 32.33, avgDisapproval: 62.00, gap: 29.67 },
    { media: "JNN（TBS）", avgApproval: 31.50, avgDisapproval: 64.77, gap: 33.27 },
    { media: "朝日新聞", avgApproval: 31.00, avgDisapproval: 57.00, gap: 26.00 },
    { media: "読売新聞", avgApproval: 31.00, avgDisapproval: 56.67, gap: 25.67 },
    { media: "ANN（テレビ朝日）", avgApproval: 29.40, avgDisapproval: 49.43, gap: 20.03 },
    { media: "共同通信", avgApproval: 29.20, avgDisapproval: 55.57, gap: 26.37 },
    { media: "時事通信", avgApproval: 25.93, avgDisapproval: 47.77, gap: 21.84 },
    { media: "毎日新聞", avgApproval: 23.00, avgDisapproval: 61.67, gap: 38.67 }
  ];
  
  // 支持率変化データ（変化の大きい順）
  const mediaChanges = [
    { media: "朝日新聞", approvalChange: 3.00, disapprovalChange: -3.00 },
    { media: "産経新聞", approvalChange: 2.90, disapprovalChange: -1.50 },
    { media: "JNN（TBS）", approvalChange: 2.70, disapprovalChange: -4.00 },
    { media: "読売新聞", approvalChange: 0.00, disapprovalChange: -2.00 },
    { media: "ANN（テレビ朝日）", approvalChange: -1.60, disapprovalChange: -3.50 },
    { media: "NHK", approvalChange: -1.60, disapprovalChange: 3.10 },
    { media: "毎日新聞", approvalChange: -2.00, disapprovalChange: 1.00 },
    { media: "日経新聞", approvalChange: -2.00, disapprovalChange: 1.00 },
    { media: "時事通信", approvalChange: -4.80, disapprovalChange: 7.10 },
    { media: "共同通信", approvalChange: -5.20, disapprovalChange: 1.30 }
  ];

  const monthlyVariance = [
    { month: "2025年3月", approvalVariance: 9.61, disapprovalVariance: 47.98 },
    { month: "2025年4月", approvalVariance: 11.29, disapprovalVariance: 44.65 },
    { month: "2025年5月", approvalVariance: 17.56, disapprovalVariance: 25.90 }
  ];

  // ====== 政党支持率データ ======
  
  // 主要政党の月別支持率推移データ
  const monthlyTrendData = [
    { month: '2025年3月', '自民党': 26.7, '国民民主党': 11.4, '立憲民主党': 7.8, '維新': 3.3, '公明党': 2.8, 'れいわ': 3.7, '共産党': 2.2, '無党派': 34.8 },
    { month: '2025年4月', '自民党': 28.4, '国民民主党': 13.2, '立憲民主党': 8.9, '維新': 3.4, '公明党': 3.0, 'れいわ': 3.3, '共産党': 2.3, '無党派': 32.7 },
    { month: '2025年5月', '自民党': 26.5, '国民民主党': 11.1, '立憲民主党': 7.7, '維新': 3.2, '公明党': 3.1, 'れいわ': 3.6, '共産党': 2.2, '無党派': 34.6 }
  ];
  
  // 政党カテゴリ分類
  const partyGroups = [
    { name: '主要3政党', march: 45.9, april: 50.5, may: 45.3 },
    { name: 'その他政党', march: 12.0, april: 12.0, may: 12.1 },
    { name: '無党派層', march: 34.8, april: 32.7, may: 34.6 }
  ];
  
  // 政党別支持率の5月データ
  const partyShareMay = [
    { name: '自民党', value: 26.5, fill: '#58A9F2' },
    { name: '国民民主党', value: 11.1, fill: '#BA68C8' },
    { name: '立憲民主党', value: 7.7, fill: '#F06292' },
    { name: '維新', value: 3.2, fill: '#FFB74D' },
    { name: '公明党', value: 3.1, fill: '#4DB6AC' },
    { name: 'れいわ', value: 3.6, fill: '#FF8A65' },
    { name: '共産党', value: 2.2, fill: '#E57373' },
    { name: '無党派', value: 34.6, fill: '#90A4AE' }
  ];
  
  // メディア別の自民党支持率データ
  const mediaLiberal = [
    { media: 'NHK', march: 29.2, april: 27.0, may: 26.4, trend: -2.8, type: '公共放送' },
    { media: '産経/FNN', march: 20.8, april: 23.7, may: 22.9, trend: 2.1, type: '保守系' },
    { media: 'JNN', march: 26.0, april: 30.6, may: 23.5, trend: -2.5, type: '中道系' },
    { media: 'ANN', march: 27.2, april: 34.8, may: 33.8, trend: 6.6, type: '中道系' },
    { media: '日経/TX', march: 31.0, april: 33.0, may: 31.0, trend: 0.0, type: '経済系' },
    { media: '読売', march: 26.0, april: 27.0, may: 25.0, trend: -1.0, type: '中道系' },
    { media: '朝日', march: null, april: 23.0, may: 23.0, trend: null, type: 'リベラル系' }
  ];
  
  // 政党支持率変化データ
  const partyChangeData = [
    { party: '公明党', change: 0.3, percentChange: 11.5, color: '#4DB6AC' },
    { party: '共産党', change: 0.1, percentChange: 2.3, color: '#E57373' },
    { party: '維新', change: -0.1, percentChange: -3.8, color: '#FFB74D' },
    { party: 'れいわ', change: -0.1, percentChange: -2.8, color: '#FF8A65' },
    { party: '立憲民主党', change: -0.2, percentChange: -2.2, color: '#F06292' },
    { party: '無党派', change: -0.2, percentChange: -0.6, color: '#90A4AE' },
    { party: '自民党', change: -0.2, percentChange: -0.7, color: '#58A9F2' },
    { party: '国民民主党', change: -0.3, percentChange: -2.7, color: '#BA68C8' }
  ];
  
  // 報道機関別の政党支持率ばらつき（分散）
  const partyVarianceData = [
    { party: '自民党', mean: 26.5, stdDev: 4.0, min: 22.9, max: 33.8, range: 10.9 },
    { party: '国民民主党', mean: 11.1, stdDev: 1.9, min: 7.2, max: 14, range: 6.8 },
    { party: '立憲民主党', mean: 7.7, stdDev: 1.6, min: 5.6, max: 10, range: 4.4 },
    { party: '無党派', mean: 34.6, stdDev: 6.3, min: 24.6, max: 41, range: 16.4 }
  ];
  
  // 無党派層の推移データ
  const nonPartisanTrend = [
    { month: '2025年3月', average: 34.8, min: 25, max: 41 },
    { month: '2025年4月', average: 32.7, min: 21.7, max: 39 },
    { month: '2025年5月', average: 34.6, min: 24.6, max: 41 }
  ];
  
  // 政党支持率レーダーチャートデータ
  const partyRadarData = [
    { subject: '自民党', march: 26.7, april: 28.4, may: 26.5, fullMark: 35 },
    { subject: '国民民主党', march: 11.4, april: 13.2, may: 11.1, fullMark: 20 },
    { subject: '立憲民主党', march: 7.8, april: 8.9, may: 7.7, fullMark: 15 },
    { subject: '維新', march: 3.3, april: 3.4, may: 3.2, fullMark: 10 },
    { subject: '公明党', march: 2.8, april: 3.0, may: 3.1, fullMark: 10 },
    { subject: 'れいわ', march: 3.7, april: 3.3, may: 3.6, fullMark: 10 },
    { subject: '共産党', march: 2.2, april: 2.3, may: 2.2, fullMark: 10 }
  ];
  
  // 月別政党支持率の構成割合データ
  const partyShareByMonth = [
    { name: '2025年3月', '自民党': 26.7, '国民民主党': 11.4, '立憲民主党': 7.8, 'その他政党': 12.0, '無党派': 34.8 },
    { name: '2025年4月', '自民党': 28.4, '国民民主党': 13.2, '立憲民主党': 8.9, 'その他政党': 12.0, '無党派': 32.7 },
    { name: '2025年5月', '自民党': 26.5, '国民民主党': 11.1, '立憲民主党': 7.7, 'その他政党': 12.1, '無党派': 34.6 }
  ];
  
  // メディア別評価の偏り分析データ
  const mediaBiasData = [
    { name: 'NHK', mainParties: 41.2, otherParties: 11.4, nonPartisan: 38.2 },
    { name: '産経/FNN', mainParties: 41.9, otherParties: 11.6, nonPartisan: 39.4 },
    { name: 'JNN', mainParties: 39.3, otherParties: 14.2, nonPartisan: 36.7 },
    { name: 'ANN', mainParties: 55.3, otherParties: 14.2, nonPartisan: 24.6 },
    { name: '日経/TX', mainParties: 55.0, otherParties: 13.0, nonPartisan: 25.0 },
    { name: '読売', mainParties: 42.0, otherParties: 9.0, nonPartisan: 41.0 },
    { name: '朝日', mainParties: 42.0, otherParties: 11.0, nonPartisan: 37.0 }
  ];
  
  // カスタムツールチップ
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-md">
          <p className="font-semibold">{label}</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }}>
              {item.name}: {item.value.toFixed(1)}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // ====== 内閣支持率分析コンポーネント ======
  
  // 月ごとのトレンドチャート
  const renderCabinetMonthlyTrend = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">月別の支持率・不支持率の推移</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={monthlyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avgApproval" name="支持率(%)" stroke="#2563eb" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="avgDisapproval" name="不支持率(%)" stroke="#dc2626" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="gap" name="ギャップ(%)" stroke="#4b5563" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">月別のメディア間のばらつき（分散）</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyVariance}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="approvalVariance" name="支持率の分散" fill="#3b82f6" />
            <Bar dataKey="disapprovalVariance" name="不支持率の分散" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // メディア別平均チャート
  const renderCabinetMediaAverage = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">メディア別の平均支持率・不支持率 (支持率の高い順)</h3>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={mediaAverages}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="media" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgApproval" name="平均支持率(%)" fill="#2563eb" />
          <Bar dataKey="avgDisapproval" name="平均不支持率(%)" fill="#dc2626" />
        </BarChart>
      </ResponsiveContainer>
      
      <h3 className="text-lg font-semibold mt-8 mb-4">メディア別の支持率と不支持率のギャップ</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={mediaAverages}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="media" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="gap" name="ギャップ(不支持率-支持率)" fill="#4b5563">
            {mediaAverages.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.gap > 30 ? "#b91c1c" : entry.gap > 20 ? "#f59e0b" : "#10b981"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // メディア別の支持率変化チャート
  const renderCabinetMediaChange = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">メディア別の3月→5月の支持率変化</h3>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={mediaChanges}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[-6, 6]} />
          <YAxis type="category" dataKey="media" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="approvalChange" name="支持率変化(%)" fill="#2563eb">
            {mediaChanges.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.approvalChange >= 0 ? "#2563eb" : "#ef4444"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <h3 className="text-lg font-semibold mt-8 mb-4">メディア別の3月→5月の不支持率変化</h3>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={mediaChanges}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[-6, 8]} />
          <YAxis type="category" dataKey="media" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="disapprovalChange" name="不支持率変化(%)" fill="#dc2626">
            {mediaChanges.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.disapprovalChange <= 0 ? "#2563eb" : "#ef4444"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // メディア別の詳細トレンドチャート
  const renderCabinetDetailedTrend = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">メディア別の支持率推移（3月〜5月）</h3>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            type="category" 
            allowDuplicatedCategory={false} 
            data={rawData.filter(d => d.media === mediaList[0])}
          />
          <YAxis domain={[20, 40]} />
          <Tooltip />
          <Legend />
          {mediaList.map((media, index) => (
            <Line 
              key={media}
              dataKey="approval" 
              data={rawData.filter(d => d.media === media)} 
              name={`${media} (支持率)`}
              stroke={`hsl(${index * 36}, 70%, 50%)`} 
              strokeWidth={2}
              connectNulls 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      <h3 className="text-lg font-semibold mt-8 mb-4">メディア別の不支持率推移（3月〜5月）</h3>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            type="category" 
            allowDuplicatedCategory={false} 
            data={rawData.filter(d => d.media === mediaList[0])}
          />
          <YAxis domain={[40, 70]} />
          <Tooltip />
          <Legend />
          {mediaList.map((media, index) => (
            <Line 
              key={media}
              dataKey="disapproval" 
              data={rawData.filter(d => d.media === media)} 
              name={`${media} (不支持率)`}
              stroke={`hsl(${index * 36}, 70%, 50%)`} 
              strokeWidth={2}
              connectNulls 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  // 散布図で支持率と不支持率の相関関係を可視化
  const renderCabinetScatter = () => {
    const scatterData = mediaAverages.map(media => ({
      ...media,
      z: 10,
    }));

    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">支持率と不支持率の関係（メディア別）</h3>
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="avgApproval" name="支持率" domain={[20, 40]} label={{ value: '支持率(%)', position: 'bottom', offset: 0 }} />
            <YAxis type="number" dataKey="avgDisapproval" name="不支持率" domain={[40, 70]} label={{ value: '不支持率(%)', angle: -90, position: 'left' }} />
            <ZAxis range={[100, 200]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name, props) => [value.toFixed(1), name]} />
            <Legend />
            <Scatter name="メディア" data={scatterData} fill="#8884d8">
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(${index * 36}, 70%, 50%)`} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        
        <div className="mt-4 text-sm">
          <h4 className="font-semibold">メディア名：</h4>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            {mediaAverages.map((media, index) => (
              <li key={index} className="flex items-center">
                <span className="w-4 h-4 inline-block mr-2" style={{ backgroundColor: `hsl(${index * 36}, 70%, 50%)` }}></span>
                {media.media}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // 全体の分析サマリー
  const renderCabinetSummary = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">石破内閣支持率の全体分析</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold mb-2">全体平均（3月〜5月）</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-blue-600 font-bold text-2xl">{30.15.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">平均支持率</div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-red-600 font-bold text-2xl">{56.06.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">平均不支持率</div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="text-gray-600 font-bold text-2xl">{25.91.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">平均ギャップ</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="font-semibold mb-2">最高／最低値</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium mb-2">支持率</h5>
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded shadow-sm flex-1">
                <div className="text-green-600 font-bold text-xl">35.0%</div>
                <div className="text-xs text-gray-500">最高値</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm flex-1">
                <div className="text-red-600 font-bold text-xl">22.0%</div>
                <div className="text-xs text-gray-500">最低値</div>
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium mb-2">不支持率</h5>
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded shadow-sm flex-1">
                <div className="text-red-600 font-bold text-xl">66.1%</div>
                <div className="text-xs text-gray-500">最高値</div>
              </div>
              <div className="bg-white p-3 rounded shadow-sm flex-1">
                <div className="text-green-600 font-bold text-xl">44.1%</div>
                <div className="text-xs text-gray-500">最低値</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">3月から5月の変化</h4>
        <p className="mb-4">全メディア平均での変化</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className={`font-bold text-xl ${(monthlyData[2].avgApproval - monthlyData[0].avgApproval) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(monthlyData[2].avgApproval - monthlyData[0].avgApproval).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">支持率変化</div>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <div className={`font-bold text-xl ${(monthlyData[2].avgDisapproval - monthlyData[0].avgDisapproval) <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(monthlyData[2].avgDisapproval - monthlyData[0].avgDisapproval).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">不支持率変化</div>
          </div>
        </div>
      </div>
    </div>
  );
  
  // ===== 政党支持率分析コンポーネント =====
  
  // 概要タブの内容
  const renderPartyOverview = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">2025年3月～5月の政党支持率概況</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">政党別支持率（全メディア平均）</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={monthlyTrendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="自民党" stroke="#58A9F2" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="国民民主党" stroke="#BA68C8" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="立憲民主党" stroke="#F06292" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="維新" stroke="#FFB74D" strokeWidth={1.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="公明党" stroke="#4DB6AC" strokeWidth={1.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="れいわ" stroke="#FF8A65" strokeWidth={1.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="共産党" stroke="#E57373" strokeWidth={1.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="無党派" stroke="#90A4AE" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-2">政党支持率の構成（2025年5月）</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={partyShareMay}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {partyShareMay.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, '支持率']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">政党カテゴリ別構成割合の推移</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={partyGroups}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 60]} />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="march" name="2025年3月" fill="#8884d8" />
              <Bar dataKey="april" name="2025年4月" fill="#4CAF50" />
              <Bar dataKey="may" name="2025年5月" fill="#FF5722" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">主要政党の支持率レーダーチャート（月別比較）</h4>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={partyRadarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
            <Radar name="2025年3月" dataKey="march" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
            <Radar name="2025年4月" dataKey="april" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.2} />
            <Radar name="2025年5月" dataKey="may" stroke="#FF5722" fill="#FF5722" fillOpacity={0.2} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-8">
        <h4 className="font-medium text-blue-800 mb-2">全体トレンド分析</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>3月から4月にかけて<strong>主要3政党（自民・国民民主・立憲民主）の支持率が上昇</strong>し、無党派層が減少したが、5月には3月とほぼ同水準に戻った</li>
          <li>4月は全体的に支持率が流動的だったが、5月には安定化の傾向が見られる</li>
          <li>無党派層は依然として<strong>最大の「支持層」</strong>を形成（約35%）</li>
          <li>政党別では自民党（約27%）、国民民主党（約11%）、立憲民主党（約8%）の順で支持率が高い</li>
        </ul>
      </div>
    </div>
  );
  
  // 政党分析タブの内容
  const renderPartyAnalysis = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">各政党の支持率分析</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">主要政党の支持率推移（3月～5月）</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={monthlyTrendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 40]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="自民党" stroke="#58A9F2" strokeWidth={3} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="国民民主党" stroke="#BA68C8" strokeWidth={3} dot={{ r: 6 }} />
            <Line type="monotone" dataKey="立憲民主党" stroke="#F06292" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">野党・その他政党の支持率推移（3月～5月）</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={monthlyTrendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 10]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="維新" stroke="#FFB74D" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="公明党" stroke="#4DB6AC" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="れいわ" stroke="#FF8A65" strokeWidth={2} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="共産党" stroke="#E57373" strokeWidth={2} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">3月から5月の支持率変化（ポイント）</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={partyChangeData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[-1, 1]} />
            <YAxis type="category" dataKey="party" width={100} />
            <Tooltip formatter={(value) => [`${value.toFixed(1)}ポイント`, '変化']} />
            <Legend />
            <Bar dataKey="change" name="支持率変化" radius={[0, 4, 4, 0]}>
              {partyChangeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.change >= 0 ? '#4CAF50' : '#F44336'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-2">政党支持率の特徴</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>自民党は4月に支持率が上昇（26.7%→28.4%）したが、5月には3月レベルに戻った（26.5%）</li>
          <li>国民民主党は4月に大きく支持率を伸ばし（11.4%→13.2%）、その後5月には減少（11.1%）</li>
          <li>公明党は3ヶ月間で唯一支持率が連続して上昇している政党（2.8%→3.0%→3.1%）</li>
          <li>政党間の支持率に<strong>大きな変動はなく</strong>、全体として安定的な状況</li>
        </ul>
      </div>
    </div>
  );
  
  // メディア分析タブの内容
  const renderPartyMediaAnalysis = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">メディア別の政党支持率分析</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">報道機関別の自民党支持率推移</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              type="category" 
              allowDuplicatedCategory={false}
              data={[{name: '2025年3月'}, {name: '2025年4月'}, {name: '2025年5月'}]}
            />
            <YAxis domain={[15, 40]} />
            <Tooltip />
            <Legend />
            {mediaLiberal.map((s, index) => (
              <Line 
                dataKey="value" 
                data={[
                  {name: '2025年3月', value: s.march},
                  {name: '2025年4月', value: s.april},
                  {name: '2025年5月', value: s.may}
                ]} 
                name={s.media} 
                key={s.media}
                stroke={`hsl(${index * 45}, 70%, 50%)`} 
                connectNulls
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-2">5月の自民党支持率（メディア別）</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mediaLiberal.sort((a, b) => b.may - a.may)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 40]} />
              <YAxis type="category" dataKey="media" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="may" name="5月支持率" fill="#2196F3">
                {mediaLiberal.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">3月から5月の自民党支持率変化</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mediaLiberal.sort((a, b) => b.trend - a.trend)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[-5, 10]} />
              <YAxis type="category" dataKey="media" width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="trend" name="変化" radius={[0, 4, 4, 0]}>
                {mediaLiberal.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.trend >= 0 ? '#4CAF50' : '#F44336'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">メディア別のカテゴリ支持率構成（5月）</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={mediaBiasData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="mainParties" name="主要3政党" stackId="a" fill="#2196F3" />
            <Bar dataKey="otherParties" name="その他政党" stackId="a" fill="#FF9800" />
            <Bar dataKey="nonPartisan" name="無党派層" stackId="a" fill="#9E9E9E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-2">メディア報道の特徴</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>ANNとテレビ朝日系が最も高い自民党支持率を報道（33.8%）</li>
          <li>産経/FNNが最も低い自民党支持率を報道（22.9%）</li>
          <li>3月から5月にかけて、ANNの自民党支持率報道が最も上昇（+6.6ポイント）</li>
          <li>無党派層の報道にメディア間で<strong>大きな差異</strong>あり（範囲：24.6%～41.0%）</li>
          <li>NHK、産経/FNN、読売、朝日は無党派層の比率を高めに報道する傾向</li>
          <li>ANN、日経/TXは主要政党の支持率を高めに報道する傾向</li>
        </ul>
      </div>
    </div>
  );
  
  // 無党派分析タブの内容
  const renderPartyNonPartisanAnalysis = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">無党派層の分析</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">月別の無党派層支持率推移</h4>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={nonPartisanTrend}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 50]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="average" name="平均支持率" barSize={60} fill="#8884d8" />
            <Line type="monotone" dataKey="min" name="最小値" stroke="#ff7300" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="max" name="最大値" stroke="#82ca9d" dot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">無党派と政党支持者の割合推移</h4>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={partyShareByMonth}
            stackOffset="expand"
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={tick => `${Math.round(tick * 100)}%`} />
            <Tooltip formatter={(value) => [`${Math.round(value)}%`, '']} />
            <Legend />
            <Area type="monotone" dataKey="自民党" stackId="1" stroke="#58A9F2" fill="#58A9F2" />
            <Area type="monotone" dataKey="国民民主党" stackId="1" stroke="#BA68C8" fill="#BA68C8" />
            <Area type="monotone" dataKey="立憲民主党" stackId="1" stroke="#F06292" fill="#F06292" />
            <Area type="monotone" dataKey="その他政党" stackId="1" stroke="#FFB74D" fill="#FFB74D" />
            <Area type="monotone" dataKey="無党派" stackId="1" stroke="#90A4AE" fill="#90A4AE" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-medium mb-3">無党派層の動向</h4>
          <div className="text-sm space-y-2">
            <p>3月: <strong>34.8%</strong> (報道機関による範囲: 25%～41%)</p>
            <p>4月: <strong>32.7%</strong> (報道機関による範囲: 21.7%～39%)</p>
            <p>5月: <strong>34.6%</strong> (報道機関による範囲: 24.6%～41%)</p>
            <p className="mt-4">4月に減少し、5月には3月水準に回復</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-3">無党派層の特徴</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>全体の<strong>約3分の1</strong>を占める最大のグループ</li>
            <li>メディアによる報道のばらつきが最も大きい（範囲幅: 16.4ポイント）</li>
            <li>4月に一時的に減少し、主要政党に流れたが、5月には再び増加</li>
            <li>読売新聞が最も高い無党派層割合を報道（41%）</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
  // まとめタブの内容
  const renderPartySummary = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">政党支持率の全体分析まとめ</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">主要な発見</h4>
        
        <div className="space-y-4">
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-blue-500">
            <h5 className="font-medium text-blue-800">1. 政党支持構造の安定性</h5>
            <p className="mt-1 text-sm">3月から5月にかけて大きな支持率変動はなく、全体として安定した政党支持構造が維持されている。一時的な変動はあったものの、5月には3月とほぼ同水準に戻った。</p>
          </div>
          
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-purple-500">
            <h5 className="font-medium text-purple-800">2. 無党派層の優位性</h5>
            <p className="mt-1 text-sm">無党派層（平均約34%）が最大の「支持層」を形成しており、いずれの政党支持率よりも高い水準を維持している。</p>
          </div>
          
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-green-500">
            <h5 className="font-medium text-green-800">3. メディア報道のばらつき</h5>
            <p className="mt-1 text-sm">政党支持率の報道には媒体間で大きな差異が存在する。特に自民党（範囲幅: 10.9ポイント）と無党派層（範囲幅: 16.4ポイント）において顕著。</p>
          </div>
          
          <div className="p-3 bg-white rounded shadow-sm border-l-4 border-yellow-500">
            <h5 className="font-medium text-yellow-800">4. 4月の一時的変動</h5>
            <p className="mt-1 text-sm">4月に主要政党（特に自民党と国民民主党）の支持率が上昇し、無党派層が減少する現象が見られたが、5月には元の水準に戻る傾向が確認された。</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="font-medium mb-3">自民党</h4>
          <div className="text-4xl font-bold text-blue-600 mb-2">26.5%</div>
          <p className="text-sm text-gray-600">変化: 3月比 -0.2ポイント</p>
          <p className="text-sm text-gray-600">ばらつき: 最大10.9ポイント差</p>
          <p className="mt-3 text-sm">4月に支持率が上昇した後、5月には再び減少。メディアによる報道の差が大きい。</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="font-medium mb-3">立憲・国民民主</h4>
          <div className="text-4xl font-bold text-purple-600 mb-2">18.8%</div>
          <p className="text-sm text-gray-600">変化: 3月比 -0.5ポイント</p>
          <p className="text-sm text-gray-600">比率: 全体の約19%</p>
          <p className="mt-3 text-sm">国民民主党が立憲民主党を上回る支持率を獲得。野党第一党の地位を確立。</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="font-medium mb-3">無党派層</h4>
          <div className="text-4xl font-bold text-gray-600 mb-2">34.6%</div>
          <p className="text-sm text-gray-600">変化: 3月比 -0.2ポイント</p>
          <p className="text-sm text-gray-600">ばらつき: 最大16.4ポイント差</p>
          <p className="mt-3 text-sm">依然として最大のグループ。メディアによる報道の差が最も顕著。</p>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-3">全体考察</h4>
        <div className="space-y-3 text-sm">
          <p>2025年3月から5月の政党支持率データからは、<strong>石破内閣発足後の政治状況が比較的安定している</strong>ことが見て取れる。</p>
          <p>4月に見られた支持率の変動は、何らかの政治的イベントや政策発表の影響を受けた可能性があるが、5月には再び安定化している。</p>
          <p>約35%を占める無党派層の動向が今後の選挙や政局に大きな影響を与える可能性が高い。</p>
          <p>報道機関によって政党支持率の測定に大きな差異があることから、<strong>単一の調査結果だけでなく、複数の調査結果の平均値や傾向を見ることが重要</strong>である。</p>
        </div>
      </div>
    </div>
  );

  // 比較分析タブの内容 (内閣支持率と政党支持率の関連性分析)
  const renderComparisonAnalysis = () => (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">内閣支持率と政党支持率の関連分析</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">内閣支持率と自民党支持率の比較</h4>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              type="category" 
              allowDuplicatedCategory={false}
              data={[{name: '2025年3月'}, {name: '2025年4月'}, {name: '2025年5月'}]}
            />
            <YAxis domain={[0, 40]} />
            <Tooltip />
            <Legend />
            <Line 
              name="内閣支持率" 
              data={monthlyData.map(item => ({name: item.month, value: item.avgApproval}))} 
              dataKey="value" 
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={{ r: 6 }}
            />
            <Line 
              name="自民党支持率" 
              data={monthlyTrendData.map(item => ({name: item.month, value: item['自民党']}))} 
              dataKey="value" 
              stroke="#58A9F2" 
              strokeWidth={3} 
              dot={{ r: 6 }} 
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">※内閣支持率と自民党支持率はほぼ連動して変化している</p>
      </div>
      
      <div className="mb-8">
        <h4 className="font-medium mb-2">内閣支持率・不支持率と主要政党支持率の推移比較</h4>
        <ResponsiveContainer width="100%" height={450}>
          <ComposedChart
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              type="category" 
              allowDuplicatedCategory={false}
              data={[{name: '2025年3月'}, {name: '2025年4月'}, {name: '2025年5月'}]}
            />
            <YAxis yAxisId="left" domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 40]} />
            <Tooltip />
            <Legend />
            <Bar 
              yAxisId="left" 
              name="内閣支持率" 
              data={monthlyData.map(item => ({name: item.month, value: item.avgApproval}))} 
              dataKey="value" 
              fill="#2563eb" 
              barSize={20} 
            />
            <Bar 
              yAxisId="left" 
              name="内閣不支持率" 
              data={monthlyData.map(item => ({name: item.month, value: item.avgDisapproval}))} 
              dataKey="value" 
              fill="#dc2626" 
              barSize={20} 
            />
            <Line 
              yAxisId="right" 
              name="自民党支持率" 
              data={monthlyTrendData.map(item => ({name: item.month, value: item['自民党']}))} 
              dataKey="value" 
              stroke="#58A9F2" 
              strokeWidth={2} 
              dot={{ r: 5 }} 
            />
            <Line 
              yAxisId="right" 
              name="国民民主党支持率" 
              data={monthlyTrendData.map(item => ({name: item.month, value: item['国民民主党']}))} 
              dataKey="value" 
              stroke="#BA68C8" 
              strokeWidth={2} 
              dot={{ r: 5 }} 
            />
            <Line 
              yAxisId="right" 
              name="立憲民主党支持率" 
              data={monthlyTrendData.map(item => ({name: item.month, value: item['立憲民主党']}))} 
              dataKey="value" 
              stroke="#F06292" 
              strokeWidth={2} 
              dot={{ r: 5 }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="font-medium mb-2">内閣支持率と政党支持率の相関（5月）</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: '内閣支持率', value: monthlyData[2].avgApproval },
                { name: '自民党支持率', value: monthlyTrendData[2]['自民党'] },
                { name: '内閣不支持率', value: monthlyData[2].avgDisapproval },
                { name: '無党派層', value: monthlyTrendData[2]['無党派'] },
                { name: '野党合計支持率', value: monthlyTrendData[2]['国民民主党'] + monthlyTrendData[2]['立憲民主党'] + monthlyTrendData[2]['維新'] + monthlyTrendData[2]['れいわ'] + monthlyTrendData[2]['共産党'] },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 60]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="支持率/不支持率(%)">
                {[
                  <Cell key="cell-0" fill="#2563eb" />,
                  <Cell key="cell-1" fill="#58A9F2" />,
                  <Cell key="cell-2" fill="#dc2626" />,
                  <Cell key="cell-3" fill="#90A4AE" />,
                  <Cell key="cell-4" fill="#F06292" />,
                ]}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">メディア別の内閣・自民党支持率比較（5月）</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { media: 'NHK', cabinet: 33.4, ldp: 26.4 },
                { media: '日経', cabinet: 33.0, ldp: 31.0 },
                { media: '産経', cabinet: 33.3, ldp: 22.9 },
                { media: 'JNN', cabinet: 33.3, ldp: 23.5 },
                { media: '朝日', cabinet: 33.0, ldp: 23.0 },
                { media: '読売', cabinet: 31.0, ldp: 25.0 },
                { media: 'ANN', cabinet: 27.6, ldp: 33.8 },
                { media: '共同', cabinet: 27.4, ldp: 24.5 },
                { media: '時事', cabinet: 23.1, ldp: 22.0 },
                { media: '毎日', cabinet: 22.0, ldp: 23.0 },
              ].sort((a, b) => b.cabinet - a.cabinet)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 40]} />
              <YAxis type="category" dataKey="media" width={60} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cabinet" name="内閣支持率" fill="#2563eb" />
              <Bar dataKey="ldp" name="自民党支持率" fill="#58A9F2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
        <h4 className="font-medium text-blue-800 mb-2">内閣支持率と政党支持率の関係性</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>内閣支持率（29.7%）は自民党支持率（26.5%）を<strong>わずかに上回る</strong>状況</li>
          <li>両者はほぼ連動して変化しているが、4月に内閣支持率が下がる一方で自民党支持率は上昇</li>
          <li>内閣不支持率（56.1%）は野党支持率合計（27.7%）を大きく上回り、無党派層（34.6%）の多くが内閣に不支持の姿勢</li>
          <li>メディア別では、ANNが内閣支持率と比較して<strong>自民党支持率を高めに</strong>報道する一方、NHKや産経は逆の傾向</li>
          <li>4月に見られた主要政党支持率の上昇は、無党派層からの一時的な流入と考えられる</li>
        </ul>
      </div>
    </div>
  );

  // 内閣支持率分析のタブコンテンツ表示
  const renderCabinetContent = () => (
    <div>
      <div className="mb-6">
        <div className="flex flex-wrap border-b">
          <button 
            className={`px-4 py-2 ${cabinetTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setCabinetTab('summary')}
          >
            全体サマリー
          </button>
          <button 
            className={`px-4 py-2 ${cabinetTab === 'monthly' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setCabinetTab('monthly')}
          >
            月別推移
          </button>
          <button 
            className={`px-4 py-2 ${cabinetTab === 'media' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setCabinetTab('media')}
          >
            メディア別平均
          </button>
          <button 
            className={`px-4 py-2 ${cabinetTab === 'change' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setCabinetTab('change')}
          >
            変化分析
          </button>
          <button 
            className={`px-4 py-2 ${cabinetTab === 'detailed' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setCabinetTab('detailed')}
          >
            詳細トレンド
          </button>
          <button 
            className={`px-4 py-2 ${cabinetTab === 'scatter' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setCabinetTab('scatter')}
          >
            相関分析
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg">
        {cabinetTab === 'summary' && renderCabinetSummary()}
        {cabinetTab === 'monthly' && renderCabinetMonthlyTrend()}
        {cabinetTab === 'media' && renderCabinetMediaAverage()}
        {cabinetTab === 'change' && renderCabinetMediaChange()}
        {cabinetTab === 'detailed' && renderCabinetDetailedTrend()}
        {cabinetTab === 'scatter' && renderCabinetScatter()}
      </div>
    </div>
  );

  // 政党支持率分析のタブコンテンツ表示
  const renderPartyContent = () => (
    <div>
      <div className="mb-6">
        <div className="flex flex-wrap border-b">
          <button 
            className={`px-4 py-2 ${partyTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setPartyTab('overview')}
          >
            概況
          </button>
          <button 
            className={`px-4 py-2 ${partyTab === 'party' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setPartyTab('party')}
          >
            政党別分析
          </button>
          <button 
            className={`px-4 py-2 ${partyTab === 'media' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setPartyTab('media')}
          >
            メディア分析
          </button>
          <button 
            className={`px-4 py-2 ${partyTab === 'nonpartisan' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setPartyTab('nonpartisan')}
          >
            無党派層分析
          </button>
          <button 
            className={`px-4 py-2 ${partyTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setPartyTab('summary')}
          >
            まとめ
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg">
        {partyTab === 'overview' && renderPartyOverview()}
        {partyTab === 'party' && renderPartyAnalysis()}
        {partyTab === 'media' && renderPartyMediaAnalysis()}
        {partyTab === 'nonpartisan' && renderPartyNonPartisanAnalysis()}
        {partyTab === 'summary' && renderPartySummary()}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">石破内閣 支持率・政党支持率分析（2025年3月〜5月）</h2>
      
      {/* メインタブ */}
      <div className="mb-8">
        <div className="flex border-b-2 border-gray-200">
          <button 
            className={`px-6 py-3 text-lg ${mainTab === 'cabinet' ? 'text-blue-700 border-b-2 border-blue-700 font-semibold -mb-0.5' : 'text-gray-600'}`}
            onClick={() => setMainTab('cabinet')}
          >
            内閣支持率分析
          </button>
          <button 
            className={`px-6 py-3 text-lg ${mainTab === 'party' ? 'text-blue-700 border-b-2 border-blue-700 font-semibold -mb-0.5' : 'text-gray-600'}`}
            onClick={() => setMainTab('party')}
          >
            政党支持率分析
          </button>
          <button 
            className={`px-6 py-3 text-lg ${mainTab === 'comparison' ? 'text-blue-700 border-b-2 border-blue-700 font-semibold -mb-0.5' : 'text-gray-600'}`}
            onClick={() => setMainTab('comparison')}
          >
            関連性分析
          </button>
        </div>
      </div>
      
      {/* 選択されたメインタブに応じたコンテンツ表示 */}
      {mainTab === 'cabinet' && renderCabinetContent()}
      {mainTab === 'party' && renderPartyContent()}
      {mainTab === 'comparison' && renderComparisonAnalysis()}
    </div>
  );
};

export default CombinedAnalysis;