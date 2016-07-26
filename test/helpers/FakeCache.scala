package helpers

import play.api.cache.CacheApi

import scala.concurrent.duration.Duration

class FakeCache extends CacheApi{

  var cache:Map[String,Any] = Map.empty

  override def set(key: String, value: Any, expiration: Duration): Unit = cache = cache.+((key, value))

  override def get[T](key: String)(implicit evidence$2: ClassManifest[T]): Option[T] = cache.get(key).map(_.asInstanceOf[T])

  override def getOrElse[A](key: String, expiration: Duration)(orElse: => A)(implicit evidence$1: ClassManifest[A]): A = get(key).getOrElse{
    set(key,orElse)
    orElse
  }

  override def remove(key: String): Unit = cache = cache.-(key)
}
