#include <nan.h>

void RunCallback(const Nan::FunctionCallbackInfo<v8::Value>& info) {

  assert(info[0]->IsArray());
  v8::Handle<v8::Array> array = v8::Handle<v8::Array>::Cast(info[0]);
  unsigned int length = array->Length();
  double sum{};

  for (unsigned int i = 0; i < length; i++) {
    sum += array->Get(i)->NumberValue();
  }

  v8::Local<v8::Function> cb = info[1].As<v8::Function>();
  v8::Local<v8::Value> argv[1] = { Nan::New(sum / length) };
  Nan::MakeCallback(Nan::GetCurrentContext()->Global(), cb, 1, argv);
}

void Init(v8::Local<v8::Object> exports, v8::Local<v8::Object> module) {
  Nan::SetMethod(module, "exports", RunCallback);
}

NODE_MODULE(avg, Init)