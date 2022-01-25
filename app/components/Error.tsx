export type ErrorProps = {
  error: Error
}

export const Error = ({ error }: ErrorProps) => (
  <div className="border-b-2 border-gray-400 pb-2">
    <h3 className="font-bold text-red-600">Error</h3>
    <p className="text-sm text-red-400">{error.message}</p>
  </div>
)
