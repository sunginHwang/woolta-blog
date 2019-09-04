export type NextPageCustom<P = {}, IP = P> = {
  (props: P): JSX.Element | null
  defaultProps?: Partial<P>
  displayName?: string
  getInitialProps?(ctx: any): Promise<IP>
}