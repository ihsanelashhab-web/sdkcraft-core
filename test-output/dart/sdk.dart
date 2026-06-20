// Auto-generated SDK for Test API v1.0.0
// Do not edit manually

import 'dart:convert';
import 'package:http/http.dart' as http;

const String baseUrl = 'https://api.test.com';

Future<dynamic> _request(String method, String path, {Map<String, dynamic>? body, Map<String, String>? params}) async {
  Uri uri = Uri.parse(baseUrl + path);
  if (params != null) uri = uri.replace(queryParameters: params);
  http.Response response;
  final headers = {'Content-Type': 'application/json'};
  if (method == 'GET') {
    response = await http.get(uri, headers: headers);
  } else if (method == 'POST') {
    response = await http.post(uri, headers: headers, body: jsonEncode(body));
  } else if (method == 'PUT') {
    response = await http.put(uri, headers: headers, body: jsonEncode(body));
  } else {
    response = await http.delete(uri, headers: headers);
  }
  return jsonDecode(response.body);
}

/// List users
Future<dynamic> getUsers() async {
  return _request('GET', '/users');
}
