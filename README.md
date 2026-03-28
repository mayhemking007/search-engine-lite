# 🔍 Search Engine (Crawler + Indexer + Ranking)

A mini search engine built from scratch that demonstrates how real-world search systems work — including web crawling, indexing, ranking, and query optimization with caching.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Queue & Workers:** Redis, BullMQ
- **Caching:** Redis
- **Frontend:** React.js
- **Architecture:** Monolithic backend with background workers

---

## 🧠 Features

### 🔗 Web Crawler
- Built a scalable crawler using **BullMQ workers**
- Extracts links from web pages and processes them asynchronously
- Handles deduplication and prevents infinite crawling using:
  - max page limits
  - depth control
  - visited URL tracking

---

### 📚 Indexing Engine
- Designed an **inverted index** for fast lookups
- Processes documents to:
  - clean and normalize text
  - tokenize content
  - compute **term frequency (TF)**
- Stores term → document mappings for efficient querying

---

### ⚡ Search & Ranking
- Implements **term frequency-based ranking**
- Ranks documents based on relevance to query
- Supports:
  - multi-keyword queries
  - result sorting by score
  - pagination

---

### 🚀 Redis Caching
- Integrated Redis caching for search results
- Cache key: `query + page`
- Reduces latency for repeated queries

> ⚡ Improved response time by ~60% for repeated queries

---

### 🖥️ Frontend (React)
- Minimal UI for:
  - search input
  - results display
  - pagination
- Connects to backend via REST APIs

---

## 🏗️ System Architecture
```
Frontend (React)
↓
API Server (Express)
↓
PostgreSQL (Documents + Index)
Redis (Cache + Queue)

Background Workers (BullMQ)
├── Crawler
└── Indexer
```

---

## 🔄 Data Flow

1. **Seeding**
   - Initial URLs are added to the queue

2. **Crawling**
   - Worker fetches HTML → extracts links → saves document

3. **Indexing**
   - Text is cleaned → tokenized → term frequency calculated → stored in inverted index

4. **Search Query**
   - Query → tokenize → lookup index → rank documents → return results

5. **Caching**
   - Results cached in Redis for faster repeated queries

---

## 🔍 API Endpoints
### Search
```
GET /search?q=<query>&page=<page>
```

### 📊 Example Response
```
{
  "results": [
    {
      "title": "Node.js Guide",
      "url": "https://example.com/node",
      "score": 7
    }
  ],
  "total": 25,
  "page": 1
}
```
---
# 🎯 Key Learnings
- Built a queue-based ingestion pipeline using BullMQ
- Implemented inverted indexing and ranking logic
- Designed fault-tolerant crawler with limits and deduplication
- Used Redis for caching and performance optimization
- Understood real-world search engine architecture