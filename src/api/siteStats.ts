export type SiteStats = {
  projectsDelivered: number;
  happyClients: number;
};

export const getSiteStats = async (): Promise<SiteStats> => {
  // simulate API delay
  await new Promise(res => setTimeout(res, 1200));

  return {
    projectsDelivered: 200,
    happyClients: 50,
  };
};
