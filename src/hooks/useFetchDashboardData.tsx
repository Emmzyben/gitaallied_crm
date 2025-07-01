import { useMemo } from 'react';
import { useFetchCallLogs } from './useFetchCallLogs';

interface PerformanceData {
  name: string;
  calls: number;
  resolutionRate: number;
}

interface RecentCall {
  id: string;
  customer: { name: string };
  agent: string | undefined;
  time: string | undefined;
  duration: string | undefined;
  status: string | undefined;
}

export function useFetchDashboardData() {
 

  // ✅ Pass userId to only fetch that user’s call logs
  const { callLogs, loading, error } = useFetchCallLogs();

  const {
    totalCalls,
    avgWaitTime,
    resolutionRate,
    missedCalls,
    satisfactionScore,
    slaCompliance,
    recentCalls,
    performanceData,
  } = useMemo(() => {
    if (!callLogs || callLogs.length === 0) {
      return {
        totalCalls: 0,
        avgWaitTime: '0s',
        resolutionRate: 0,
        missedCalls: 0,
        satisfactionScore: 0,
        slaCompliance: 0,
        recentCalls: [] as RecentCall[],
        performanceData: [] as PerformanceData[],
      };
    }

    const parseDuration = (durationStr: string | undefined): number => {
      if (!durationStr) return 0;
      let totalSeconds = 0;
      const minMatch = durationStr.match(/(\d+)m/);
      const secMatch = durationStr.match(/(\d+)s/);
      if (minMatch) totalSeconds += parseInt(minMatch[1], 10) * 60;
      if (secMatch) totalSeconds += parseInt(secMatch[1], 10);
      return totalSeconds;
    };

    const totalCalls = callLogs.length;

    const totalDurationSeconds = callLogs.reduce(
      (acc, log) => acc + parseDuration(log.duration),
      0
    );
    const avgDurationSeconds = totalCalls > 0 ? totalDurationSeconds / totalCalls : 0;
    const avgWaitTime = `${Math.floor(avgDurationSeconds / 60)}m ${Math.floor(avgDurationSeconds % 60)}s`;

    const resolvedCalls = callLogs.filter(
      (log) => log.status === 'completed' || log.status === 'resolved'
    ).length;
    const resolutionRate = totalCalls > 0 ? Math.round((resolvedCalls / totalCalls) * 100) : 0;

    const missedCalls = callLogs.filter((log) => log.status === 'missed').length;

    const ratings = callLogs.map((log) => log.rating).filter((r) => typeof r === 'number') as number[];
    const satisfactionScore = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    const slaCalls = callLogs.filter((log) => parseDuration(log.duration) <= 300).length;
    const slaCompliance = totalCalls > 0 ? Math.round((slaCalls / totalCalls) * 100) : 0;

    const recentCallsRaw = [...callLogs].sort((a, b) => (b.id > a.id ? 1 : -1)).slice(0, 5);
    const recentCalls: RecentCall[] = recentCallsRaw.map((log) => ({
      id: log.id,
      customer: { 
        name: typeof log.customer === 'string'
          ? log.customer
          : (log.customer && typeof log.customer === 'object' && 'name' in log.customer && typeof (log.customer as { name?: unknown }).name === 'string'
            ? (log.customer as { name: string }).name
            : 'Unknown')
      },
      agent: log.agent,
      time: log.time,
      duration: log.duration,
      status: log.status,
    }));

    const agentMap: Record<string, { calls: number; resolved: number }> = {};
    callLogs.forEach((log) => {
      const agent = log.agent || 'Unknown';
      if (!agentMap[agent]) {
        agentMap[agent] = { calls: 0, resolved: 0 };
      }
      agentMap[agent].calls += 1;
      if (log.status === 'completed' || log.status === 'resolved') {
        agentMap[agent].resolved += 1;
      }
    });
    const performanceData: PerformanceData[] = Object.entries(agentMap).map(([agent, data]) => ({
      name: agent,
      calls: data.calls,
      resolutionRate: data.calls > 0 ? Math.round((data.resolved / data.calls) * 100) : 0,
    }));

    return {
      totalCalls,
      avgWaitTime,
      resolutionRate,
      missedCalls,
      satisfactionScore: Math.round(satisfactionScore * 10) / 10,
      slaCompliance,
      recentCalls,
      performanceData,
    };
  }, [callLogs]);

  return {
    totalCalls,
    avgWaitTime,
    resolutionRate,
    missedCalls,
    satisfactionScore,
    slaCompliance,
    recentCalls,
    performanceData,
    loading,
    error,
  };
}
