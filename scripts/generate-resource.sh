#!/bin/bash

# Check if exactly two arguments are provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <resource_name>"
  exit 1
fi

# Assign the arguments to variables
resource_name="$1"


pnpm turbo gen create-type --args "$resource_name"

pnpm turbo gen add-route --args "$resource_name"

pnpm turbo gen add-resource-table --args "$resource_name"