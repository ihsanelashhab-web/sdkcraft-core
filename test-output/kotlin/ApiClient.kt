// Auto-generated SDK for Test API v1.0.0
// Do not edit manually

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

class TestAPIClient(
  private val baseUrl: String = "https://api.test.com",
  private val apiKey: String? = null,
  private val bearerToken: String? = null,
  private val timeout: Int = 30000
) {

  private suspend fun request(method: String, path: String, body: String? = null): String =
    withContext(Dispatchers.IO) {
      val url = URL(baseUrl + path)
      val conn = url.openConnection() as HttpURLConnection
      conn.requestMethod = method
      conn.connectTimeout = timeout
      conn.readTimeout = timeout
      conn.setRequestProperty("Content-Type", "application/json")
      apiKey?.let { conn.setRequestProperty("X-API-Key", it) }
      bearerToken?.let { conn.setRequestProperty("Authorization", "Bearer $it") }
      if (body != null) {
        conn.doOutput = true
        conn.outputStream.write(body.toByteArray())
      }
      val code = conn.responseCode
      if (code !in 200..299) throw Exception("API Error $code: ${conn.responseMessage}")
      conn.inputStream.bufferedReader().readText()
    }

  /** List users */
  suspend fun getUsers(): String {
    val json = request("GET", "/users")
    return json as String
  }

}