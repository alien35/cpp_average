{
  "targets": [
    {
      "target_name": "avg",
      "sources": [ "average.cpp" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}