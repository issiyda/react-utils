export const objectToQueryString = (obj: Record<string, string>) => {
    const queryString = Object.keys(obj)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&')
    return `?${queryString}`
  }
