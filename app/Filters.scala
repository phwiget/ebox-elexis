import javax.inject._

import play.api._
import play.api.http.{DefaultHttpFilters, HttpFilters}
import play.api.mvc._
import play.filters.cors.CORSFilter
import play.filters.headers.SecurityHeadersFilter


@Singleton
class Filters @Inject() (
  corsFilter: CORSFilter,
  securityHeadersFilter: SecurityHeadersFilter
) extends DefaultHttpFilters(corsFilter,securityHeadersFilter)
