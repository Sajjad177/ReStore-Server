import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search functionality based on specified fields
  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  // General filtering functionality, keeping "status" in the filter
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "page", "limit", "sort", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // Sorting functionality
  sort() {
    const { sortBy, sortOrder } = this.query;
    const sortOption: { [key: string]: 1 | -1 } = {};

    if (sortBy && typeof sortBy === "string" && typeof sortOrder === "string") {
      sortOption[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    this.modelQuery = this.modelQuery.sort(sortOption);
    return this;
  }

  // Filter by price range
  filterByPrice(maxProductPrice: number) {
    const minPrice = Number(this?.query?.minPrice);
    const maxPrice = Number(this?.query?.maxPrice);
    this.modelQuery = this.modelQuery.find({
      price: { $gte: minPrice || 0, $lte: maxPrice || maxProductPrice },
    });

    return this;
  }
}

export default QueryBuilder;
