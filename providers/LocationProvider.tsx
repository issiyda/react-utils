import { ReactNode, createContext, useState } from 'react'

export const LocationContext = createContext<{
  loading: boolean
  location: GeolocationPosition | null
  error: string | null
  searchLocation: () => void
}>({})
export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [location, setLocation] = useState<GeolocationPosition | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSuccess = (position: GeolocationPosition) => {
    setLocation(position)
    setLoading(false)
  }

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message)
    setLoading(false)
  }

  const searchLocation = () => {
    setLoading(true)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported.')
      return
    }

    const res = navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError
    )
  }

  return (
    <LocationContext.Provider
      value={{
        loading,
        location,
        error,
        searchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
